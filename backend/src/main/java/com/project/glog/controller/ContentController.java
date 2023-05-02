package com.project.glog.controller;


import com.project.glog.domain.Content;
import com.project.glog.domain.Hashtag;
import com.project.glog.domain.User;
import com.project.glog.service.ContentService;
import com.project.glog.service.HashtagService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ContentController {
    private final ContentService contentService;
    private final HashtagService hashtagService;

    @Autowired
    public ContentController(ContentService contentService, HashtagService hashtagService){
        this.contentService = contentService;
        this.hashtagService = hashtagService;
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

        //3. 해쉬태그를 저장한다.
        hashtagService.save(contentform.getHashtags(), content.getId());

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

        //3. 해쉬태그를 삭제한다.
        hashtagService.delete(cid);

        return "deleted";
    }

    @PostMapping("/content")
    @ResponseBody
    public Content readContent(HttpSession session, @RequestParam("cid") Long cid){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            System.out.println("Not Logined");;
        }

        //2. 글을 찾아준다.
        Content content;
        content = contentService.getOne(cid);

        return content;
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
    public List<Content> searchContentsByHastag(HttpSession session, @RequestParam("hashtag") String hashtag){
        //1. 글을 찾아준다.
        List<Long> cids = hashtagService.searchContentsByHashtag(hashtag);

        return contentService.searchContentsById(cids);
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

    @PostMapping("/test")
    @ResponseBody
    public ResponseEntity<User> test(){
        return ResponseEntity.ok(new User());
    }
}

