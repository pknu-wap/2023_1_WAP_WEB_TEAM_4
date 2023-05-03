package com.project.glog.controller;


import com.project.glog.domain.Content;
import com.project.glog.domain.User;
import com.project.glog.service.ContentService;
import com.project.glog.service.UserService;
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
    private final UserService userService;

    @Autowired
    public ContentController(ContentService contentService, UserService userService){
        this.contentService = contentService;
        this.userService = userService;
    }

    @PostMapping("/content/create")
    @ResponseBody
    public Content create(HttpSession session, @RequestBody Content content){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");
            return null;
        }

        content.setUser_id(uid);
        //2. 글을 저장한다.
        contentService.create(content);


        return content;
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
    public ResponseEntity<Object> main(HttpSession session){
        //응답 데이터
        Map<String, Object> response = new HashMap<>();

        //세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");
            response.put("user", null);
        }
        else{
            User user = userService.searchUserById(uid);
            response.put("user", user);
        }

        //미리보기용 리스트에 각각 글을 넣는다.
        List<Content>  allContentsByCreated = contentService.searchContentsByCreated();
        List<Content>  allContentsByLikes = contentService.searchContentsByLikes();
        List<Content>  allContentsByViews = contentService.searchContentsByViews();
        List<Content>  allContentsByRandom = contentService.searchContentsByRandom();

        //처음 부터 8개만 뽑아서 다시 리스트에 넣는다.
        List<Content> contentsByCreated = new ArrayList<>(allContentsByCreated.subList(0,8));
        List<Content> contentsByLikes = new ArrayList<>(allContentsByLikes.subList(0,8));
        List<Content> contentsByViews = new ArrayList<>(allContentsByViews.subList(0,8));
        List<Content> contentsByRandom = new ArrayList<>(allContentsByRandom.subList(0,8));

        Map<String, List<Content>> contents = new HashMap<>();
        contents.put("created", contentsByCreated);
        contents.put("likes", contentsByLikes);
        contents.put("views", contentsByViews);
        contents.put("random", contentsByRandom);

        //데이터를 response에 담는다.

        response.put("contents", contents);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/main/more")
    @ResponseBody
    public ResponseEntity<List<Content>> mainMore(HttpSession session, @RequestParam("kind") String kind, @RequestParam("index") int index){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");
        }

        //종류에 맞게 시작위치부터 +8까지의 컨텐츠를 담아서 응답으로 보낸다.
        List<Content> contents = new ArrayList<>();
        if(kind.equals("created")){
            List<Content>  allContentsByCreated = contentService.searchContentsByCreated();
            contents = new ArrayList<>(allContentsByCreated.subList(index,index+8));
        }
        else if(kind.equals("likes")){
            List<Content>  allContentsByLikes = contentService.searchContentsByLikes();
            contents = new ArrayList<>(allContentsByLikes.subList(index,index+8));
        }
        else if(kind.equals("views")){
            List<Content>  allContentsByViews = contentService.searchContentsByViews();
            contents = new ArrayList<>(allContentsByViews.subList(index,index+8));
        }
        else if(kind.equals("random")){
            List<Content>  allContentsByRandom = contentService.searchContentsByRandom();
            contents = new ArrayList<>(allContentsByRandom.subList(index,index+8));
        }

        return new ResponseEntity<>(contents,HttpStatus.OK);
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

