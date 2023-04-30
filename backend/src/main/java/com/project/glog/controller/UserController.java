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
    public UserForm create(@RequestBody UserForm form){
        User user = new User();
        user.setNickname(form.getNickname());
        user.setLogin_id(form.getLogin_id());
        user.setLogin_pw(form.getLogin_pw());

        userService.join(user);

        return form;
    }


    @PostMapping("/user/login")
    @ResponseBody
    public String signin(HttpSession session, @RequestBody UserForm userform){
        Long uid = userService.login(userform.getLogin_id(), userform.getLogin_pw());
        if(uid==null){
            return "failed login";
        }
        session.setAttribute("userId", uid);
        return "success login";
    }

    @GetMapping("/user/search")
    @ResponseBody
    public List<User> searchUsers(@RequestParam("nickname") String nickname){
        List<User> list;
        list = userService.searchUsersByNickname(nickname);

        return list;
    }

    @GetMapping("user/changepw")
    public String changPwForm(Model model, HttpSession session){
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            return "redirect:/";
        }
        return "/user/changepw";
    }

    @PostMapping("user/changepw")
    @ResponseBody
    public User changePw(@RequestParam("id") Long id, @RequestParam("change_pw") String change_pw){
        User user = userService.searchUserById(id);
        user.setLogin_pw(change_pw);
        userService.changeUserPw(user);
        return userService.searchUserById(id);
    }

    @PostMapping("/user/mypage")
    @ResponseBody
    public User mypage(HttpSession session){
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            return null;
        }

        User user = userService.searchUserById(uid);
        return user;
    }

    @GetMapping("/user/logout")
    @ResponseBody
    public String logout(HttpSession session) {
        Long uid = (Long) session.getAttribute("userId");
        if (uid != null) {
            session.invalidate();
            return "success logout";
        }
        return "Not Logined"; // 로그아웃 후 리다이렉트 할 페이지
    }
}
