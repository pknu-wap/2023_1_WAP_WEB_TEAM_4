package com.project.glog.service;

import com.project.glog.controller.CreateContentForm;
import com.project.glog.domain.Blog;
import com.project.glog.domain.Content;
import com.project.glog.domain.Member;
import com.project.glog.repository.CategoryRepository;
import com.project.glog.repository.ContentRepository;

import java.util.ArrayList;
import java.util.List;

public class ContentService {
    private final ContentRepository contentRepository;
    private final CategoryService categoryService;

    public ContentService(ContentRepository contentRepository,
                          CategoryService categoryService){
        this.contentRepository = contentRepository;
        this.categoryService = categoryService;
    }

    public Content save(CreateContentForm form){
        form.getContent().setBlog(form.getBlog());
        form.getContent().setCategory(form.getCategory());
        Content content = contentRepository.save(form.getContent());

        categoryService.save(form.getCategory());

        return form.getContent();
    }

    public void delete(Content content){
        contentRepository.delete(content);
    }

    public Content findById(Long cid){
        return contentRepository.findById(cid).get();
    }

    public List<Content> searchContentsByString(String string){
        return contentRepository.searchContentsByString(string);
    }
    public List<Content> searchContentsById(List<Long> cids){
        List<Content> contents = new ArrayList<>();
        for(Long cid : cids){
            contents.add(contentRepository.findById(cid).get());
        }
        return contents;
    }

    public List<Content> searchContentsByCreated() {
        return contentRepository.previewsByCreated();
    }

    public List<Content> searchContentsByLikes() {
        return contentRepository.previewsByLikes();
    }

    public List<Content> searchContentsByViews() {
        return contentRepository.previewsByViews();
    }

    public List<Content> searchContentsByRandom() {
        return contentRepository.previewsByRandom();
    }

    public List<Content> getAllContentsByBlog(Blog blog){
        return contentRepository.getAllContentsByBlogId(blog.getId());
    }
}
