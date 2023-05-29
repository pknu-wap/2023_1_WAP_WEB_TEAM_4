package com.project.glog.controller;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Member;
import com.project.glog.dto.LoginRequest;
import com.project.glog.dto.MemberDTO;
import com.project.glog.dto.RegisterRequest;
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
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController (MemberService memberService){
        this.memberService = memberService;
    }

    @PostMapping("/member/register")
    @ResponseBody
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest){
        Member member = new Member();
        member.setLoginid(registerRequest.getLoginid());
        member.setLoginpw(registerRequest.getLoginpw());
        member.setNickname(registerRequest.getNickname());

        Long result = memberService.save(registerRequest);
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
    public ResponseEntity<String> login(HttpSession session, @RequestBody LoginRequest loginRequest){

        Long uid = memberService.login(loginRequest);
        if(uid==null){
            return new ResponseEntity<>("failed login", HttpStatus.NOT_FOUND);
        }
        session.setAttribute("memberId", uid);
        return new ResponseEntity<>("scucess login", HttpStatus.OK);
    }

    @GetMapping("/member/search")
    @ResponseBody
    public ResponseEntity<List<MemberDTO>> searchMembers(@RequestParam("nickname") String nickname){
        List<MemberDTO> members;
        members = memberService.searchMembersByNickname(nickname);

        return new ResponseEntity<>(members,HttpStatus.OK);
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

    /*현재 사용하지 않는 기능
    @PostMapping("/member/checkpw")
    @ResponseBody
    public ResponseEntity<String> checkPw(@RequestParam("pw") String pw, HttpSession session){
        Long uid = (Long) session.getAttribute("memberId");

        if(uid==null){
            return new ResponseEntity<>("not logined", HttpStatus.UNAUTHORIZED);
        }
        else if(!memberService.searchMemberById(uid).getLoginpw().equals(pw))
            return new ResponseEntity<>("not match", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>("scucess check pw", HttpStatus.OK);

    }

    @PostMapping("member/changepw")
    @ResponseBody
    public ResponseEntity<String> changePw(@RequestParam("changePw") String changePw, HttpSession session){
        Long uid = (Long) session.getAttribute("memberId");
        if(uid==null){
            return new ResponseEntity<>("not logined", HttpStatus.UNAUTHORIZED);
        }

        memberService.changePw(memberService.searchMemberById(uid), changePw);
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
    */
}
