package com.project.glog.repository;

import com.project.glog.domain.Blog;

import java.util.Optional;

public interface BlogRepository {
    public void save(Blog blog);
    public Optional<Blog> find(Blog blog);

}
