package com.project.glog.repository;

import com.project.glog.domain.Content;
import com.project.glog.domain.Hashtag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface HashtagRepository {
    void save(Hashtag hastag);
    void update(Hashtag hashtag);
    void delete(Hashtag hastag);
    List<Hashtag> findHastagByContent(Long cid);
    List<Content> findContentByHashtag(String hashtag);

}
