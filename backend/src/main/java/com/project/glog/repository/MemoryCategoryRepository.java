package com.project.glog.repository;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import com.project.glog.domain.Content;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemoryCategoryRepository implements CategoryRepository{
    private static Map<Long, Category> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public void save(Category category) {
        if(category.getId()==null){
            category.setId(++sequence);
            category.setCount(0);
        }
        store.put(category.getId(), category);
    }

    @Override
    public void delete(Category category) {
        store.remove(category.getId());
    }

    @Override
    public List<Category> getBlogCategorys(Blog blog) {
        List<Category> categoryList = new ArrayList<>();
        for (Map.Entry<Long, Category> entry : store.entrySet()) {
            if (entry.getValue().getBlog_id().equals(blog.getId())) {
                categoryList.add(entry.getValue());
            }
        }
        return categoryList;
    }
}
