package com.project.glog.controller;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import com.project.glog.domain.Content;
import com.project.glog.service.BlogService;
import com.project.glog.service.CategoryService;
import com.project.glog.service.ContentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class CategoryController {

    private final CategoryService categoryService;
    private final BlogService blogService;

    @Autowired
    public CategoryController(CategoryService categoryService,
                              BlogService blogService){

        this.categoryService = categoryService;
        this.blogService = blogService;
    }

    @PostMapping("/category/save")
    @ResponseBody
    public ResponseEntity<String> save(HttpSession session, @RequestBody Category category){
        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");
            return null;
        }

        //카테고리의 블로그 외래키를 저장한다.
        Long bid = blogService.getBlogIdByUserId(uid).get().getId();

        //카테고리를 저장한다.
        categoryService.save(category);

        return new ResponseEntity<>("success create category",HttpStatus.OK);
    }

    @PostMapping("/category/delete")
    @ResponseBody
    public ResponseEntity<String> create(HttpSession session, @RequestBody Category category){
        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");
            return null;
        }

        //카테고리를 삭제한다.
        //만약 글이 하나라도 있다면 예외처리
        categoryService.delete(category);

        return new ResponseEntity<>("success delete category",HttpStatus.OK);
    }

    @GetMapping ("/category/read")
    @ResponseBody
    public ResponseEntity<List<Category>> create(HttpSession session, @RequestBody Blog blog){
        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");
            return null;
        }

        //해당 블로그의 카테고리를 전부 읽어온다.
        List<Category> categoryList = categoryService.getBlogCategorys(blog);

        return new ResponseEntity<>(categoryList,HttpStatus.OK);
    }
}
