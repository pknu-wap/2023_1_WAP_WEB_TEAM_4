package com.project.glog.controller;

import com.project.glog.domain.Category;
import com.project.glog.dto.CategoryDTO;
import com.project.glog.service.BlogService;
import com.project.glog.service.CategoryService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/category/create")
    @ResponseBody
    public ResponseEntity<String> save(HttpSession session, @RequestBody String name){
        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            System.out.println("not Logined");
            return null;
        }

        categoryService.create(name, uid);

        return new ResponseEntity<>("success save category",HttpStatus.OK);
    }

    @PostMapping("/category/delete")
    @ResponseBody
    public ResponseEntity<String> create(HttpSession session, @RequestParam("categoryId") Long categoryId){
        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            System.out.println("not Logined");
            return null;
        }

        try{
            categoryService.delete(uid, categoryId);
        }
        catch(IllegalAccessException e){
            return new ResponseEntity<>("not creater",HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>("success delete category",HttpStatus.OK);
    }

    @GetMapping ("/category/get")
    @ResponseBody
    public ResponseEntity<List<CategoryDTO>> getCategoriesByBlog(HttpSession session){
        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            System.out.println("Not Logined");
            return null;
        }

        //게시글 작성시에 카테고리 목록을 확인하기 위한 컨트롤러이기 때문에
        //세션을 확인하여 처리하면 되므로 별다른 매개변수가 필요 없다.
        //해당 블로그의 카테고리를 전부 읽어온다.
        List<CategoryDTO> categories = categoryService.getCategoriesByBlogId(blogService.findByMemberId(uid).getId());
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }
}
