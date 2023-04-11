package com.project.glog.repository;

import com.project.glog.domain.Content;
import com.project.glog.domain.User;

import java.util.*;

public class MemoryContentRepository implements ContentRepository{

    private static Map<Long, Content> store = new HashMap<>();
    private static long sequence = 0L;
    @Override
    public Content save(Content content) {
        content.setId(++sequence);
        store.put(content.getId(), content);
        return content;
    }

    @Override
    public Content update(Content content) {
        store.put(content.getId(), content);
        return content;
    }

    @Override
    public void delete(Long id) {
        Content content = entityManager.find(Content.class, Id);
        if(content != null){
            entityManager.remove(content);
        }

    }

    @Override
    public Optional<Content> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Content> findContentsByHashtag(String hashtag) {
        String query = "SELECT p FROM Post p WHERE :hashTag MEMBER OF p.hashTags";
        TypedQuery<Content> typedQuery = entityManager.createQuery(query, Content.class);
        typedQuery.setParameter("hashTag", hashTag);
        return typedQuery.getResultList();
    } //

    @Override
    public List<Content> previewsByCreated() {
        String jpql = "SELECT p FROM Post p ORDER BY p.createdDate DESC";
        TypedQuery<Content> query = entityManager.createQuery(jpql, Post.class);
        return query.getResultList();
    }//생성일자 기준으로 게시글 목록을 조회하여 날짜 순서대로 정렬된 리스트 반환

    @Override
    public List<Content> previewsByLikes() {

        ArrayList<Map.Entry<Long, Content>> map_list = new ArrayList<>(store.entrySet());

        Collections.sort(map_list, new Comparator<Map.Entry<Long, Content>>() {
            @Override
            public int compare(Map.Entry<Long, Content> o1, Map.Entry<Long, Content> o2) {
                // 값(Value)을 기준으로 비교
                return o1.getValue().getLikes().compareTo(o2.getValue().getLikes());
            }
        });

        List<Content> list = new ArrayList<>();
        for (Map.Entry<Long, Content> value : map_list) {
            list.add(value.getValue());
        }

        return list;
    }

    @Override
    public List<Content> previewsByViews() {
        ArrayList<Map.Entry<Long, Content>> map_list = new ArrayList<>(store.entrySet());

        Collections.sort(map_list, new Comparator<Map.Entry<Long, Content>>() {
            @Override
            public int compare(Map.Entry<Long, Content> o1, Map.Entry<Long, Content> o2) {
                // 값(Value)을 기준으로 비교
                return o1.getValue().getViews().compareTo(o2.getValue().getViews());
            }
        });

        List<Content> list = new ArrayList<>();
        for (Map.Entry<Long, Content> value : map_list) {
            list.add(value.getValue());
        }

        return list;
    }

    @Override
    public List<Content> previewsByRandom() {
        return null;
    }
}
