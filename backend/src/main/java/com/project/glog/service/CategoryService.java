package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import com.project.glog.repository.CategoryRepository;

import java.util.List;

public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository){this.categoryRepository=categoryRepository;}

    public void save(Category category){
        categoryRepository.save(category);
    }

    public void delete(Category category){
        categoryRepository.delete(category);
    }

    public List<Category> findAllByBlogId(Blog blog){
        return categoryRepository.findAllByBlogId(blog.getId());
    }

}
