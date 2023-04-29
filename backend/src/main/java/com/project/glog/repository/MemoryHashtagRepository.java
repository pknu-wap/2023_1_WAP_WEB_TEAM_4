package com.project.glog.repository;

import com.project.glog.domain.Content;
import com.project.glog.domain.Hashtag;
import com.project.glog.domain.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemoryHashtagRepository implements HashtagRepository{
    private static Map<Long, Hashtag> store = new HashMap<>();
    private static long sequence = 0L;
    @Override
    public void save(Hashtag hashtag) {
        hashtag.setId(++sequence);
        store.put(hashtag.getId(), hashtag);
    }

    @Override
    public void delete(Long cid) {
        store.entrySet().removeIf(
                entry -> entry.getValue().getCid().equals(cid));
    }

    @Override
    public List<Hashtag> findHastagByContent(Long cid) {
        return null;
    }

    @Override
    public List<Long> findContentsByHashtag(String hashtag) {
        List<Long> cids = new ArrayList<>();
        for(Map.Entry<Long, Hashtag> entry : store.entrySet()){
            if(entry.getValue().getHastag().contains(hashtag) ){
                cids.add(entry.getValue().getCid());
            }
        }
        return cids;
    }
}
