package com.project.glog.service;

import com.project.glog.domain.Content;
import com.project.glog.domain.Hashtag;
import com.project.glog.repository.HashtagRepository;

import java.util.List;

public class HashtagService {
    private final HashtagRepository hashtagRepository;

    public HashtagService(HashtagRepository hashtagRepository) {
        this.hashtagRepository = hashtagRepository;
    }

    public void save(List<Hashtag> hashtags, Long cid){
        //전부 순회하며 hastagRepository.save(hashtag)
        for(Hashtag hashtag : hashtags){
            hashtag.setCid(cid);
            hashtagRepository.save(hashtag);
        }

    }

    public void delete(Long cid){
        hashtagRepository.delete(cid);
    }

    public List<Long> searchContentsByHashtag (String hashtag){
        return hashtagRepository.findContentsByHashtag(hashtag);
    }
}
