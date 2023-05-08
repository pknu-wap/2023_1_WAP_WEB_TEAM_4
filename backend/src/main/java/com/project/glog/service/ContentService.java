package com.project.glog.service;

import com.project.glog.controller.CreateContentForm;
import com.project.glog.domain.Content;
import com.project.glog.domain.User;
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

    public Content create(CreateContentForm form){
        contentRepository.save(form.getContent());

        form.getContent().setCategory(form.getCategory());
        categoryService.save(form.getCategory());

        return form.getContent();
    }

    public void delete(Long cid){
        contentRepository.delete(cid);
    }

    public Content getOne(Long cid){
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

    public List<Content> getAllContentsByUser(User user){
        return contentRepository.getAllContentsByUser(user);
    }
}
