package com.project.glog.controller;

import com.project.glog.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
public class TestController {
    @PostMapping("/test")
    @ResponseBody
    public ResponseEntity<User> test(){
        return ResponseEntity.ok(new User());
    }
}
