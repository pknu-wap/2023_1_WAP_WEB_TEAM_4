package com.project.glog.controller;

import com.project.glog.domain.User;
import com.project.glog.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController (UserService userService){
        this.userService = userService;
    }


    @GetMapping("/user/register")
    public String createForm(){
        return "/user/register";
    }

    @PostMapping("/user/register")
    @ResponseBody
    public User create(@RequestBody User user){

        userService.join(user);

        return userService.searchUserById(user.getId());
    }

    @GetMapping("/user/login")
    @ResponseBody
    public String signinForm(HttpSession session){
        Long uid = (Long) session.getAttribute("userId");
        if(uid!=null){
            return "you already singed";
        }
        return "go login";
    }

    @PostMapping("/user/login")
    @ResponseBody
    public User signin(@RequestBody User user, HttpSession session){
        Long uid = userService.login(user.getLogin_id(), user.getLogin_pw());

        session.setAttribute("userId", uid);

        return userService.searchUserById(uid);
    }

    @GetMapping("/user/search")
    @ResponseBody
    public List<User> searchUsers(@RequestParam("nickname") String nickname){
        List<User> list;
        list = userService.searchUsersByNickname(nickname);

        return list;
    }

    @GetMapping("/user/checkpw")
    @ResponseBody
    public String go_checkPw(HttpSession session){
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            return "go home";
        }
        return "go checkpw";
    }

    @PostMapping("/user/checkpw")
    @ResponseBody
    public String checkPw(@RequestBody User user, HttpSession session){
        Long uid = (Long) session.getAttribute("userId");

        if(!userService.searchUserById(uid).getLogin_pw().equals(user.getLogin_pw()))
            return "retry";
        return "take permission and go changepw";

    }

    @GetMapping("/user/changepw")
    @ResponseBody
    public String changePw(){
        //주소 값만 잘 숨기면 되는데..
        //허락된 경로로만 접근할 수 있게 검사하는 코드..
        return "go changepw";
    }

    @PostMapping("user/changepw")
    @ResponseBody
    public User changePw(@RequestBody String change_pw, HttpSession session){
        Long uid = (Long) session.getAttribute("userId");

        User user = userService.searchUserById(uid);
        user.setLogin_pw(change_pw);
        userService.changeUserPw(user);
        return userService.searchUserById(uid);
    }

}
