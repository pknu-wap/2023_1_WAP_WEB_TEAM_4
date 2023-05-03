package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.repository.BlogRepository;

import java.util.Optional;

public class BlogService {
    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository){
        this.blogRepository=blogRepository;
    }

    public void save(Blog blog){
        blogRepository.save(blog);
    }

    public Optional<Blog> getOne(Blog blog){
        return blogRepository.find(blog);
    }

    public Optional<Blog> getBlogIdByUserId(Long uid){
        return blogRepository.getBlogIdByUserId(uid);
    }
}
