package com.project.glog.controller;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Member;
import com.project.glog.service.MemberService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin(origins = "*")
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController (MemberService memberService){
        this.memberService = memberService;
    }

    @PostMapping("/member/register")
    @ResponseBody
    public ResponseEntity<String> register(@RequestBody Member member){
        Long result = memberService.save(member);
        if(result==-1L){
            return new ResponseEntity<>("present nickname", HttpStatus.CONFLICT);
        }
        else if(result==-2L){
            return new ResponseEntity<>("present login_id", HttpStatus.CONFLICT);
        }
        else{
            return new ResponseEntity<>("scucess register", HttpStatus.OK);
        }
    }


    @PostMapping("/member/login")
    @ResponseBody
    public ResponseEntity<String> login(HttpSession session, @RequestBody Member member){
        Long uid = memberService.login(member);
        if(uid==null){
            return new ResponseEntity<>("failed login", HttpStatus.NOT_FOUND);
        }
        session.setAttribute("memberId", uid);
        return new ResponseEntity<>("scucess login", HttpStatus.OK);
    }

    @GetMapping("/member/search")
    @ResponseBody
    public ResponseEntity<List<Member>> searchMembers(@RequestParam("nickname") String nickname){
        List<Member> list;
        list = memberService.searchMembersByNickname(nickname);

        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @PostMapping("/member/checkpw")
    @ResponseBody
    public ResponseEntity<String> checkPw(@RequestParam("pw") String pw, HttpSession session){
        Long uid = (Long) session.getAttribute("memberId");

        if(uid==null){
            return new ResponseEntity<>("not logined", HttpStatus.UNAUTHORIZED);
        }
        else if(!memberService.searchMemberById(uid).getLogin_pw().equals(pw))
            return new ResponseEntity<>("not match", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>("scucess check pw", HttpStatus.OK);

    }

    @PostMapping("member/changepw")
    @ResponseBody
    public ResponseEntity<String> changePw(@RequestParam("changepw") String changepw, HttpSession session){
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            return new ResponseEntity<>("not logined", HttpStatus.UNAUTHORIZED);
        }

        Member member = memberService.searchMemberById(uid);
        member.setLogin_pw(changepw);
        memberService.save(member);
        return new ResponseEntity<>("succes change pw", HttpStatus.OK);
    }

    @PostMapping("/member/mypage")
    @ResponseBody
    public ResponseEntity<Map<String,Object>> mypage(HttpSession session){
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Map<String,Object> response = new HashMap<>();
        Member member = memberService.searchMemberById(uid);
        response.put("member", member);
        response.put("blog",member.getBlog());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/member/logout")
    @ResponseBody
    public ResponseEntity<String> logout(HttpSession session) {
        Long uid = (Long) session.getAttribute("memberId");
        if (uid != null) {
            session.invalidate();
            return new ResponseEntity<>("succes logout", HttpStatus.OK);

        }
        return new ResponseEntity<>("not logined", HttpStatus.UNAUTHORIZED);
    }
}
