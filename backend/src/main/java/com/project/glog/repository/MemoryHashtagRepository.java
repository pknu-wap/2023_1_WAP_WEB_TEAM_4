package com.project.glog.repository;

import com.project.glog.domain.Content;
import com.project.glog.domain.Hashtag;

import java.util.List;

public class MemoryHashtagRepository implements HashtagRepository{
    @Override
    public void save(Hashtag hastag) {

    }

    @Override
    public void update(Hashtag hashtag) {

    }

    @Override
    public void delete(Hashtag hastag) {

    }

    @Override
    public List<Hashtag> findHastagByContent(Long cid) {
        return null;
    }

    @Override
    public List<Content> findContentByHashtag(String hashtag) {
        return null;
    }
}
