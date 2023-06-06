package com.project.glog.controller;

import com.project.glog.dto.BlogDTO;
import com.project.glog.dto.CategorySidebar;
import com.project.glog.dto.ChangeAccountRequest;
import com.project.glog.dto.ChangeBlogSettingRequest;
import com.project.glog.service.BlogService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class BlogController {
    private final BlogService blogService;

    @Autowired BlogController(BlogService blogService){
        this.blogService=blogService;
    }

    @GetMapping("/mypage")
    public ResponseEntity<BlogDTO> goToMypage(@RequestParam("loginedMemberId") Long uid){
        if(uid==0){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        BlogDTO blog = blogService.getMypage(uid);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }
    @PostMapping("/mypage/change/account")
    public ResponseEntity<BlogDTO> changeNickname(@RequestBody ChangeAccountRequest changeAccountRequest) {
        Long uid = changeAccountRequest.getLoginedMemberId();
        if (uid == 0) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        BlogDTO blog = blogService.changeAccount(uid, changeAccountRequest);
        if(blog==null){
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @PostMapping("/mypage/change/blog/setting")
    public ResponseEntity<BlogDTO> changeBlogSetting(@RequestBody ChangeBlogSettingRequest changeBlogSettingRequest) {
        Long uid = changeBlogSettingRequest.getLoginedMemberId();
        if (uid == 0) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        BlogDTO blog = blogService.changeBlogSetting(uid, changeBlogSettingRequest);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @PostMapping("/mypage/change/blog/skin")
    public ResponseEntity<BlogDTO> changeBlogSkin(@RequestParam("loginedMemberId") Long uid, @RequestParam("skin") Integer blogSkin) {
        if (uid == 0) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        BlogDTO blog = blogService.changeBlogSkin(uid, blogSkin);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @PostMapping("/mypage/change/profile")
    public ResponseEntity<BlogDTO> changeBlogSkin(@RequestPart("loginedMemberId") Long uid, @RequestPart("image") MultipartFile multipartFile) throws IOException {
        if (uid == 0) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        BlogDTO blog = blogService.changeProfileImage(uid, multipartFile);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }
}
