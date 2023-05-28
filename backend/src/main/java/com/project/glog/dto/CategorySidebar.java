package com.project.glog.dto;

import com.project.glog.domain.Category;
import com.project.glog.domain.Content;

import java.util.ArrayList;
import java.util.List;

public class CategorySidebar {
    private Long category_id;
    private String category_name;
    List<ContentTitle> titles;

    public CategorySidebar(Category category, List<Content> contents) {
        this.category_id = category.getId();
        this.category_name = category.getName();

        this.titles = new ArrayList<>();
        for(Content content : contents){
            this.titles.add(new ContentTitle(content.getId(), content.getTitle()));
        }
    }

    public Long getCategory_id() {
        return category_id;
    }

    public String getCategory_name() {
        return category_name;
    }

    public List<ContentTitle> getTitles() {
        return titles;
    }
}
