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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<Long> create(@RequestPart MultipartFile multipartFile, @RequestPart ContentCreateRequest contentCreateRequest) throws IOException {
        //1. 세션을 확인한다.
        Long uid = contentCreateRequest.getLoginedMemberId();
        if(uid==0){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Content content = contentService.create(multipartFile, contentCreateRequest, uid);
        return new ResponseEntity<>(content.getId(), HttpStatus.OK);
    }

    @PostMapping("/content/update")
    @ResponseBody
    public ResponseEntity<Long> update(@RequestPart MultipartFile multipartFile, @RequestPart ContentUpdateRequest contentUpdateRequest) throws IOException {
        //1. 세션을 확인한다.
        Long uid = contentUpdateRequest.getLoginedMemberId();
        if(uid==0){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Content content = contentService.update(multipartFile, contentUpdateRequest, uid);
        return new ResponseEntity<>(content.getId(), HttpStatus.OK);
    }

    @PostMapping("/content/delete")
    @ResponseBody
    public ResponseEntity<String> delete(@RequestParam("loginedMemberId") Long uid, @RequestParam("contentId") Long cid){

        Content content = contentService.findById(cid);
        if(uid==0){
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
    public ResponseEntity<ContentReadResponse> readContent(@RequestParam("cid") Long cid){
        ContentReadResponse contentReadResponse = contentService.readContent(cid);

        return new ResponseEntity<>(contentReadResponse, HttpStatus.OK);
    }

    @GetMapping("/main")
    @ResponseBody
    public ResponseEntity<ContentPreviewsResponse> main(Long index){
        ContentPreviewsResponse contentsPreviews = contentService.getPreviews(index);
        return new ResponseEntity<>(contentsPreviews,HttpStatus.OK);
    }

    /*
    @GetMapping("/main/more")
    @ResponseBody
    public ResponseEntity<ContentDTOS> mainMore(HttpSession session, @RequestParam("kind") String kind, @RequestParam("index") Long index){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            System.out.println("Not Logined");
        }
        ContentDTOS contents = contentService.getMorePreviews(kind, index);
        return new ResponseEntity<>(contents,HttpStatus.OK);
    }
    */

    @GetMapping("/content/find/string")
    @ResponseBody
    public ResponseEntity<ContentDTOS> searchContentsByString(@RequestParam("string") String string){
        //string 내용을 포함한 게시글의 리스트를 생성한다.
        ContentDTOS contents = contentService.getContentsByString(string);

        return new ResponseEntity<>(contents, HttpStatus.OK);
    }

    @GetMapping("/content/find/hashtag")
    @ResponseBody
    public ResponseEntity<ContentDTOS> searchContentsByHashtag(@RequestParam("hashtag") String hashtag){
        //string 내용을 포함한 게시글의 리스트를 생성한다.
        ContentDTOS contents = contentService.getContentsByHashtag(hashtag);

        return new ResponseEntity<>(contents, HttpStatus.OK);
    }

    @PostMapping("/content/pluslikes")
    @ResponseBody
    public ResponseEntity<String> plusLikes(@RequestParam("loginedMemberId") Long uid, @RequestParam("contentId") Long cid){
        //1. 세션을 확인한다.
        if(uid==0){
            return new ResponseEntity<>("not logined", HttpStatus.UNAUTHORIZED);
        }

        //2. 해당 글의 좋아요를 1 증가 시킨다.
        contentService.plusLikes(cid);

        return new ResponseEntity<>("success plus likes", HttpStatus.OK);
    }

    @GetMapping("/home")
    @ResponseBody
    public ResponseEntity<List<CategorySidebar>> goToHome(@RequestParam Long memberId){
        Long uid = memberId;

        List<CategorySidebar> categorySidebars = contentService.getCategorySidebars(blogService.findByMemberId(memberId).getId());
        return new ResponseEntity<>(categorySidebars, HttpStatus.OK);
    }


}

