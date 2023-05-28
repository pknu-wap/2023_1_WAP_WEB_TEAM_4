package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Member;
import com.project.glog.dto.LoginRequest;
import com.project.glog.dto.RegisterRequest;
import com.project.glog.repository.MemberRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

public class
MemberService {

    private final MemberRepository memberRepository;
    private final BlogService blogService;

    public MemberService(MemberRepository memberRepository, BlogService blogService){

        this.memberRepository = memberRepository;
        this.blogService = blogService;
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
                ""
                );

        //블로그가 멤버를 참조하도록함
        member.setBlog(blog);
        blog.setMember(member);

        //따로 블로그를 저장하는 로직을 만들지 않아도 알아서 DB에 저장하고
        //멤버를 참조함
        memberRepository.save(member);

        return member.getId();
    }

    private void validateDuplicateMember(Member member) {

        memberRepository.findByNickname(member.getNickname())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });

        memberRepository.findByLoginid(member.getLoginid())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 아이디 입니다.");
                });
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

    public List<Member> searchMembersByNickname(String nickname){
        return memberRepository.findAllByNickname(nickname);
    }

    public void changePw(Member member, String changePw){
        member.setLoginpw(changePw);
        memberRepository.save(member);
    }

}
