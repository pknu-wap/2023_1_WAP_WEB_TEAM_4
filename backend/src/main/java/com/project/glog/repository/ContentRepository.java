package com.project.glog.repository;

import com.project.glog.domain.Content;

import java.util.List;
import java.util.Optional;

public interface ContentRepository {

    Content save(Content content);
    Content update(Content content);
    void delete(Long id);
    Optional<Content> findById(Long id);
    List<Content> searchContentsByString(String string);
    List<Content> previewsByCreated();
    List<Content> previewsByLikes();
    List<Content> previewsByViews();
    List<Content> previewsByRandom();

}
