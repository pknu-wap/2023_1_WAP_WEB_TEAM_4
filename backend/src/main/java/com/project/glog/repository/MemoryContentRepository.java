package com.project.glog.repository;

import com.project.glog.domain.Content;

import java.util.List;
import java.util.Optional;


public class MemoryContentRepository implements ContentRepository{
    @Override
    public Content save(Content content) {
        return null;
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
        return null;
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
