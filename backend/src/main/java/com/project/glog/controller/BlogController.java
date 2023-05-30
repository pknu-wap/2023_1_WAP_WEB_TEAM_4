package com.project.glog.controller;

import com.project.glog.dto.BlogDTO;
import com.project.glog.dto.ChangeAccountRequest;
import com.project.glog.dto.ChangeBlogSettingRequest;
import com.project.glog.service.BlogService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class BlogController {
    private final BlogService blogService;

    @Autowired BlogController(BlogService blogService){
        this.blogService=blogService;
    }

    @GetMapping("/mypage")
    public ResponseEntity<BlogDTO> goToMypage(HttpSession session){
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        BlogDTO blog = blogService.getMypage(uid);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }
    @PostMapping("/mypage/change/account")
    public ResponseEntity<BlogDTO> changeNickname(HttpSession session, @RequestBody ChangeAccountRequest changeAccountRequest) {
        Long uid = (Long) session.getAttribute("memberId");
        if (uid == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        BlogDTO blog = blogService.changeAccount(uid, changeAccountRequest);
        if(blog==null){
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @PostMapping("/mypage/change/blog/setting")
    public ResponseEntity<BlogDTO> changeBlogSetting(HttpSession session, @RequestBody ChangeBlogSettingRequest changeBlogSettingRequest) {
        Long uid = (Long) session.getAttribute("memberId");
        if (uid == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        BlogDTO blog = blogService.changeBlogSetting(uid, changeBlogSettingRequest);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @PostMapping("/mypage/change/blog/skin")
    public ResponseEntity<BlogDTO> changeBlogSkin(HttpSession session, @RequestBody Integer blogSkin) {
        Long uid = (Long) session.getAttribute("memberId");
        if (uid == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        BlogDTO blog = blogService.changeBlogSkin(uid, blogSkin);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }


}
