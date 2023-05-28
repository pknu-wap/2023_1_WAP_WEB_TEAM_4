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
    public Blog findByMemberId(Long uid){
        Optional<Blog> result = blogRepository.findByMemberId(uid);
        if(!result.isPresent()){
            return null;
        }
        return result.get();
    }

    public Blog findById(Long bid){
        return blogRepository.findById(bid).get();
    }
}
