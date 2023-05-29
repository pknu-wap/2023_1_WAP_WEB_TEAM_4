package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import com.project.glog.dto.CategoryDTO;
import com.project.glog.repository.CategoryRepository;

import java.util.ArrayList;
import java.util.List;

public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final BlogService blogService;

    public CategoryService(CategoryRepository categoryRepository,
                           BlogService blogService){
        this.categoryRepository=categoryRepository;
        this.blogService=blogService;
    }

    public void create(String name, Long uid){
        Category category = new Category();
        category.setName(name);

        //Blog를 참조하므로 객체를 불러온다.
        Blog blog = blogService.findByMemberId(uid);
        category.setBlog(blog);

        categoryRepository.save(category);
    }

    public void delete(Long uid, Long categoryId) throws IllegalAccessException {
        Category category = categoryRepository.findById(categoryId).get();
        if(category.getBlog().getMember().getId()==uid){
            categoryRepository.delete(category);
        }
        else{
            throw new IllegalAccessException("not creater");
        }

    }

    public List<Category> findAllByBlogId(Long bid){
        return categoryRepository.findAllByBlogId(bid);
    }

    public Category findById(Long cid){
        return categoryRepository.findById(cid).get();
    }

    public List<CategoryDTO> getCategoriesByBlogId(Long bid){
        List<Category> categories = categoryRepository.findAllByBlogId(bid);

        List<CategoryDTO> results = new ArrayList<>();
        for(Category category : categories){
            results.add(new CategoryDTO(category));
        }

        return results;
    }
}
