package com.project.glog.controller;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import com.project.glog.domain.Content;

public class CreateContentForm {
    private Category category;
    private Content content;
    private Blog blog;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }
}
