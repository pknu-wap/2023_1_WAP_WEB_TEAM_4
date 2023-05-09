package com.project.glog.service;

import com.project.glog.controller.CreateContentForm;
import com.project.glog.domain.Blog;
import com.project.glog.domain.Content;
import com.project.glog.domain.Member;
import com.project.glog.repository.CategoryRepository;
import com.project.glog.repository.ContentRepository;

import java.util.ArrayList;
import java.util.Collections;
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
        return contentRepository.findAllByText(string);
    }
    public List<Content> searchContentsById(List<Long> cids){
        List<Content> contents = new ArrayList<>();
        for(Long cid : cids){
            contents.add(contentRepository.findById(cid).get());
        }
        return contents;
    }

    public List<Content> findAllByCreated() {
        return contentRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Content> findAllByLikes() {
        return contentRepository.findAllByOrderByLikesDesc();
    }

    public List<Content> findAllByViews() {
        return contentRepository.findAllByOrderByViewsDesc();
    }

    public List<Content> findAllByRandom() {
        List<Content> contents = contentRepository.findAll();
        Collections.shuffle(contents);
        return contents;
    }

    public List<Content> getAllContentsByBlog(Blog blog){
        return contentRepository.findAllByBlogId(blog.getId());
    }
}
