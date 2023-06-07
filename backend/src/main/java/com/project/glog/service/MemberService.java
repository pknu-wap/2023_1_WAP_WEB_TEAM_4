package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Member;
import com.project.glog.dto.*;
import com.project.glog.repository.MemberRepository;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

public class
MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository){

        this.memberRepository = memberRepository;
    }
    public Long save(RegisterRequest registerRequest){
        Member member = new Member(
                registerRequest.getLoginid(),
                registerRequest.getLoginpw(),
                registerRequest.getNickname(),
                ""
        );

        try {
            validateDuplicateMember(member);
        }
        catch(Exception e){
            if(e.getMessage().equals("이미 존재하는 회원입니다.")){
                return -1L;
            }
            else if(e.getMessage().equals("이미 존재하는 아이디 입니다.")){
                return -2L;
            }
        }

        //블로그를 새로 판다.
        Blog blog = new Blog(
                member.getNickname(),
                member.getNickname(),
                "",
                1);

        //블로그가 멤버를 참조하도록함
        member.setBlog(blog);
        blog.setMember(member);

        //따로 블로그를 저장하는 로직을 만들지 않아도 알아서 DB에 저장하고
        //멤버를 참조함
        memberRepository.save(member);

        return member.getId();
    }

    public Long update(Member member){
        try {
            validateDuplicateMember(member);
        }
        catch(Exception e){
            if(e.getMessage().equals("이미 존재하는 회원입니다.")){
                return -1L;
            }
            else if(e.getMessage().equals("이미 존재하는 아이디 입니다.")){
                return -2L;
            }
        }
        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {

        Optional<Member> validateNickname = memberRepository.findByNickname(member.getNickname());
        if(validateNickname.isPresent()){
            if(member.getId()==null || member.getId()!=validateNickname.get().getId()){
                throw new IllegalStateException("이미 존재하는 회원입니다.");
            }
        }

        Optional<Member> validateLoginId = memberRepository.findByLoginid(member.getLoginid());
        if(validateLoginId.isPresent()){
            if(member.getId()==null || member.getId()!=validateLoginId.get().getId()){
                throw new IllegalStateException("이미 존재하는 아이디입니다.");
            }
        }
    }

    public Long login(LoginRequest loginRequest){
        Optional<Member> resultOptional = memberRepository.findByLoginid(loginRequest.getLoginId());
        if(resultOptional.isPresent()){
            Member result = resultOptional.get();
            if(result.getLoginpw().equals(loginRequest.getLoginPw())){
                return result.getId();
            }
        }

        return null;
    }
    public Member searchMemberById(Long id){
        Optional<Member> memberOptional = memberRepository.findById(id);
        try {
            Member member = memberOptional.get();
            return member;
        }
        catch(Exception e){
            return null;
        }
    }

    public List<MemberDTO> searchMembersByNickname(String nickname){
        List<Member> members = memberRepository.findAllByNickname(nickname);
        List<MemberDTO> memberDTOS = new ArrayList<>();
        for(Member member : members) {
            memberDTOS.add(new MemberDTO(member));
        }
        return memberDTOS;
    }
    public void changePw(Member member, String changePw){
        member.setLoginpw(changePw);
        memberRepository.save(member);
    }


}
