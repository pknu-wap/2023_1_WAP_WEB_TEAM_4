package com.project.glog.repository;

import com.project.glog.domain.Blog;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class MemoryBlogRepository implements BlogRepository{
    public static Map<Long, Blog> store = new HashMap<>();
    public static Long sequence=0L;
    @Override
    public void save(Blog blog) {
        if(blog.getId()==null){
            blog.setId(++sequence);
        }
        store.put(blog.getId(), blog);
    }

    @Override
    public Optional<Blog> find(Blog blog) {
        Long bid = blog.getId();

        return Optional.ofNullable(store.get(bid));
    }

    @Override
    public Optional<Blog> getBlogIdByUserId(Long uid) {
        return store.values().stream()
                .filter(blog -> blog.getUser().getId().equals(uid))
                .findAny();
    }
}
