package com.project.glog.controller;


import com.project.glog.domain.Content;
import com.project.glog.domain.User;
import com.project.glog.service.ContentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
    public Content create(HttpSession session, @RequestBody Content content){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            return null;
        }

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
    public Content readContent(HttpSession session, @RequestParam("cid") Long cid){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            return null;
        }

        //2. 글을 찾아준다.
        Content content;
        content = contentService.read(cid);

        return content;
    }

    @PostMapping("/main")
    @ResponseBody
    public Map<String, List<Content>> main(HttpSession session, @RequestParam("cid") Long cid){
        //1. 세션을 확인한다.
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            return null;
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
}

