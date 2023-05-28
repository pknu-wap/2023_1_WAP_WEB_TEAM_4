package com.project.glog.dto;

import com.project.glog.domain.Category;

public class CategoryDTO {
    private Long categoryId;
    private String name;

    public CategoryDTO(Category category) {
        this.categoryId = category.getId();
        this.name = category.getName();
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getName() {
        return name;
    }
}
