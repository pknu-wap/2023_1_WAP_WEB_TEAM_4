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
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public Optional<Content> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Content> findContentsByHashtag(String hashtag) {
        return null;
    }

    @Override
    public List<Content> previewsByCreated() {

        return null;
    }

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
        return null;
    }

    @Override
    public List<Content> previewsByRandom() {
        return null;
    }
}
