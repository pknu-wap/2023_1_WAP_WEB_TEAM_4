package com.project.glog.service;

import com.project.glog.domain.Content;
import com.project.glog.repository.ContentRepository;
import com.project.glog.repository.UserRepository;

import java.util.List;

public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository){this.contentRepository = contentRepository;}

    public Content create(Content content){
        contentRepository.save(content);
        return content;
    }

    public void delete(Long cid){
        contentRepository.delete(cid);
    }

    public Content read(Long cid){
        return contentRepository.findById(cid).get();
    }


    public List<Content> searchContentsByCreated() {
        return contentRepository.previewsByCreated();
    }

    public List<Content> searchContentsByLikes() {
        return contentRepository.previewsByLikes();
    }

    public List<Content> searchContentsByViews() {
        return contentRepository.previewsByViews();
    }

    public List<Content> searchContentsByRandom() {
        return contentRepository.previewsByRandom();
    }
}