package com.project.glog.controller;


import com.project.glog.domain.Category;
import com.project.glog.domain.Content;
import com.project.glog.domain.Member;
import com.project.glog.dto.*;
import com.project.glog.service.BlogService;
import com.project.glog.service.CategoryService;
import com.project.glog.service.ContentService;
import com.project.glog.service.MemberService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ContentController {
    private final ContentService contentService;
    private final MemberService memberService;
    private final CategoryService categoryService;
    private final BlogService blogService;

    @Autowired
    public ContentController(ContentService contentService,
                             MemberService memberService,
                             CategoryService categoryService,
                             BlogService blogService){
        this.contentService = contentService;
        this.memberService = memberService;
        this.categoryService = categoryService;
        this.blogService = blogService;
    }

    @PostMapping("/content/create")
    @ResponseBody
    public ResponseEntity<Long> create(HttpSession session, @RequestBody ContentCreateRequest contentCreateRequest){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Content content = contentService.create(contentCreateRequest, uid);
        return new ResponseEntity<>(content.getId(), HttpStatus.OK);
    }

    @PostMapping("/content/delete")
    @ResponseBody
    public ResponseEntity<String> delete(HttpSession session, @RequestBody Long cid){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");

        Content content = contentService.findById(cid);
        if(uid==null){
            return new ResponseEntity<>("not logined",HttpStatus.UNAUTHORIZED);
        }
        else if(uid!= content.getMember().getId()){
            return new ResponseEntity<>("not creator",HttpStatus.UNAUTHORIZED);
        }

        //2. 글을 삭제한다.
        contentService.delete(content);

        return new ResponseEntity<>("success delete",HttpStatus.OK);
    }

    @GetMapping("/content/read")
    @ResponseBody
    public ResponseEntity<ContentReadResponse> readContent(HttpSession session, @RequestParam("cid") Long cid){
        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            System.out.println("Not Logined");
        }

        ContentReadResponse contentReadResponse = contentService.readContent(uid, cid);

        return new ResponseEntity<>(contentReadResponse, HttpStatus.OK);
    }

    @GetMapping("/main")
    @ResponseBody
    public ResponseEntity<Object> main(HttpSession session){
        //응답 데이터
        Map<String, Object> response = new HashMap<>();

        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            System.out.println("Not Logined");
            response.put("member", null);
        }
        else{
            MemberDTO memberDTO = new MemberDTO(memberService.searchMemberById(uid));
            response.put("member", memberDTO);
        }

        ContentPreviewsResponse contentsPreviews = contentService.getFirstPreviews();
        response.put("contents", contentsPreviews);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/main/more")
    @ResponseBody
    public ResponseEntity<List<Content>> mainMore(HttpSession session, @RequestParam("kind") String kind, @RequestParam("index") int index){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            System.out.println("Not Logined");
        }

        return new ResponseEntity<>(null,HttpStatus.OK);
    }

    @GetMapping("/content/find")
    @ResponseBody
    public ResponseEntity<List<Content>> searchContentsByString(HttpSession session, @RequestParam("string") String string){
        //string 내용을 포함한 게시글의 리스트를 생성한다.
        List<Content> contents = contentService.searchContentsByString(string);

        return new ResponseEntity<>(contents, HttpStatus.OK);
    }

    @PostMapping("/content/pluslikes")
    @ResponseBody
    public ResponseEntity<String> plusLikes(HttpSession session, @RequestParam Long cid){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            return new ResponseEntity<>("not logined", HttpStatus.OK);
        }

        //2. 해당 글의 좋아요를 1 증가 시킨다.
        Content content = contentService.findById(cid);
        content.setLikes(content.getLikes()+1);

        return new ResponseEntity<>("success plus likes", HttpStatus.OK);
    }


}

