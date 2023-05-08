package com.project.glog.repository;

import com.project.glog.domain.Content;
import com.project.glog.domain.User;

import java.util.*;


public class MemoryContentRepository implements ContentRepository{

    private static Map<Long, Content> store = new HashMap<>();
    private static long sequence = 0L;
    @Override
    public Content save(Content content) {
        if(content.getId()==null){
            content.setId(++sequence);
            content.setLikes(0);
            content.setViews(0);
        }
        store.put(content.getId(), content);
        return content;
    }

    @Override
    public Content update(Content content) {
        store.put(content.getId(), content);
        return content;
    }

    @Override
    public void delete(Long id){
        store.remove(id);
    }

    @Override
    public Optional<Content> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }



    @Override
    public List<Content> searchContentsByString(String string) {
        List<Content> contents = new ArrayList<>();
        for (Map.Entry<Long, Content> entry : store.entrySet()) {
            if (entry.getValue().getText().contains(string)) {
                contents.add(entry.getValue());
            }
        }
        return contents;
    }

    @Override
    public List<Content> previewsByCreated() {
        ArrayList<Map.Entry<Long, Content>> map_list = new ArrayList<>(store.entrySet());
        Collections.reverse(map_list);

        List<Content> list = new ArrayList<>();
        for (Map.Entry<Long, Content> value : map_list) {
            list.add(value.getValue());
        }
        return list;
    }//생성일자 기준으로 게시글 목록을 조회하여 날짜 순서대로 정렬된 리스트 반환

    @Override
    public List<Content> previewsByLikes() {

        ArrayList<Map.Entry<Long, Content>> map_list = new ArrayList<>(store.entrySet());

        Collections.sort(map_list, new Comparator<Map.Entry<Long, Content>>() {
            @Override
            public int compare(Map.Entry<Long, Content> o1, Map.Entry<Long, Content> o2) {
                // 값(Value)을 기준으로 비교
                return o2.getValue().getLikes().compareTo(o1.getValue().getLikes());
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
        ArrayList<Map.Entry<Long, Content>> map_list = new ArrayList<>(store.entrySet());


        Collections.shuffle(map_list);

        List<Content> list = new ArrayList<>();
        for (Map.Entry<Long, Content> value : map_list) {
            list.add(value.getValue());
        }

        return list;
    }

    @Override
    public List<Content> getAllContentsByUser(User user) {
        Long uid = user.getId();
        List<Content> contents = new ArrayList<>();
        for(Map.Entry<Long, Content> entry : store.entrySet()){
            if(entry.getValue().getUser().getId().equals(uid) ){
                contents.add(entry.getValue());
            }
        }
        return contents;
    }
}
