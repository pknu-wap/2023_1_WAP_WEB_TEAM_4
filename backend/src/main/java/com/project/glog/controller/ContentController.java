package com.project.glog.controller;


import com.project.glog.domain.Content;
import com.project.glog.domain.Hashtag;
import com.project.glog.service.ContentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ContentController {
    private final ContentService contentService;

    @Autowired
    public ContentController(ContentService contentService){
        this.contentService = contentService;
    }

    @PostMapping("/content/create")
    @ResponseBody
    public ContentForm create(HttpSession session, @RequestBody ContentForm contentform){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");
            return null;
        }

        Content content = contentform.getContent();
        content.setUser_id(uid);

        List<Hashtag> hashtags = contentform.getHashtags();

        //2. 글을 저장한다.
        contentService.create(content);


        return contentform;
    }

    @PostMapping("/content/delete")
    @ResponseBody
    public String delete(HttpSession session, @RequestParam("cid") Long cid){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            return null;
        }

        //2. 글을 삭제한다.
        contentService.delete(cid);

        return "deleted";
    }

    @PostMapping("/content")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> readContent(HttpSession session, @RequestParam("cid") Long cid){
        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");
        }

        Map<String, Object> response = new HashMap<>();

        //글을 찾아준다.
        Content content;
        content = contentService.getOne(cid);

        response.put("content", content);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/main")
    @ResponseBody
    public Map<String, List<Content>> main(HttpSession session){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");
        }

        //2. 미리보기용 리스트에 각각 글을 넣는다.
        List<Content>  contentsByCreated = contentService.searchContentsByCreated();
        List<Content>  contentsByLikes = contentService.searchContentsByLikes();
        List<Content>  contentsByViews = contentService.searchContentsByViews();
        List<Content>  contentsByRandom = contentService.searchContentsByRandom();

        Map<String, List<Content>> contents = new HashMap<>();

        contents.put("created", contentsByCreated);
        contents.put("likes", contentsByLikes);
        contents.put("views", contentsByViews);
        contents.put("random", contentsByRandom);


        return contents;
    }

    @PostMapping("/content/find")
    @ResponseBody
    public ResponseEntity<List<Content>> searchContentsByString(HttpSession session, @RequestParam("string") String string){
        //string 내용을 포함한 게시글의 리스트를 생성한다.
        List<Content> contents = contentService.searchContentsByString(string);

        return new ResponseEntity<>(contents, HttpStatus.OK);
    }

    @PostMapping("/content/pluslikes")
    @ResponseBody
    public String plusLikes(HttpSession session, @RequestParam Long cid){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            return "Not Logined";
        }

        //2. 해당 글의 좋아요를 1 증가 시킨다.
        Content content = contentService.getOne(cid);
        content.setLikes(content.getLikes()+1);

        return "success plus Likes";
    }


}

