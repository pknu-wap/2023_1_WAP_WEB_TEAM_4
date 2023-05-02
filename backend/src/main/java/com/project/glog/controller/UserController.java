package com.project.glog.controller;

import com.project.glog.domain.User;
import com.project.glog.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController (UserService userService){
        this.userService = userService;
    }

    @PostMapping("/user/register")
    @ResponseBody
    public ResponseEntity<String> register(@RequestBody UserForm form){
        User user = new User();
        user.setNickname(form.getNickname());
        user.setLogin_id(form.getLogin_id());
        user.setLogin_pw(form.getLogin_pw());

        Long result = userService.join(user);
        if(result==-1L){
            return new ResponseEntity<>("present nickname", HttpStatus.OK);
        }
        else if(result==-2L){
            return new ResponseEntity<>("present login_id", HttpStatus.CONFLICT);
        }
        else{
            return new ResponseEntity<>("scucess register", HttpStatus.OK);
        }
    }


    @PostMapping("/user/login")
    @ResponseBody
    public String login(HttpSession session, @RequestBody UserForm userform){
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
    public String changePw(HttpSession session){
        Long uid = (Long) session.getAttribute("userId");
        if(uid==null){
            return "not Logined";
        }

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
