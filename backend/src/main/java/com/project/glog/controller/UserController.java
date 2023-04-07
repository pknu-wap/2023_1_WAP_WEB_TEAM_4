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
import org.springframework.web.bind.annotation.ResponseBody;

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
    public String create(UserForm form){
        User user = new User();
        user.setNickname(form.getNickname());
        user.setLogin_id(form.getLogin_id());
        user.setLogin_pw(form.getLogin_pw());

        userService.join(user);

        return "redirect:/user/login";
    }

    @GetMapping("/user/login")
    public String signinForm(HttpSession session){
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

}
