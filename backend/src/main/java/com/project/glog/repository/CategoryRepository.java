package com.project.glog.repository;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;

import java.util.List;

public interface CategoryRepository {
    public void save(Category category);
    public void delete(Category category);
    public List<Category> getBlogCategorys(Blog blog);
}
