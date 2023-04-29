package com.project.glog.repository;

import com.project.glog.domain.Content;
import com.project.glog.domain.Hashtag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface HashtagRepository {
    void save(Hashtag hastag);
    void delete(Long cid);
    List<Hashtag> findHastagByContent(Long cid);
    List<Long> findContentsByHashtag(String hashtag);

}
