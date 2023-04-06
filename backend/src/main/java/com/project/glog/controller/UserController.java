package com.project.glog.controller;

import com.project.glog.domain.User;
import com.project.glog.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
    public String create(UserForm form){
        User user = new User();
        user.setNickname(form.getNickname());
        user.setLogin_id(form.getLogin_id());
        user.setLogin_pw(form.getLogin_pw());

        userService.join(user);

        return "redirect:/user/login";
    }

    @GetMapping("/user/login")
    public String signinform(HttpSession session){
        Long uid = (Long) session.getAttribute("userId");
        if(uid!=null){
            return "redirect:/";
        }
        return "/user/login";
    }

    @PostMapping("/user/login")
    public String signin(Model model, UserForm form, HttpSession session){
        Long uid = userService.login(form.getLogin_id(), form.getLogin_pw());
        if(uid==null){
            return "redirect:/user/login";
        }

        model.addAttribute("userid",uid);
        session.setAttribute("userId", uid);
        return "/user/successlogin";
    }
}
