package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Member;
import com.project.glog.repository.MemberRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public class
MemberService {

    private final MemberRepository memberRepository;
    private final BlogService blogService;

    public MemberService(MemberRepository memberRepository, BlogService blogService){

        this.memberRepository = memberRepository;
        this.blogService = blogService;
    }
    public Long save(Member member){

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
        Blog blog = new Blog();

        member.setBlog(blog);
        blog.setMember(member);

        memberRepository.save(member);
        blogService.save(blog);

        return member.getId();
    }

    private void validateDuplicateMember(Member member) {

        memberRepository.findByNickname(member.getNickname())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });

        memberRepository.findByLogin_id(member.getLogin_id())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 아이디 입니다.");
                });
    }

    public Long login(Member member){
        Optional<Member> resultOptional = memberRepository.findByLogin_id(member.getLogin_id());
        if(resultOptional.isPresent()){
            Member result = resultOptional.get();
            if(result.getLogin_pw().equals(member.getLogin_pw())){
                return result.getId();
            }
        }

        return null;
    }
    public Member searchMemberById(Long id){
        Member member = memberRepository.findById(id).get();
        return member;
    }

    public List<Member> searchMembersByNickname(String nickname){
        return memberRepository.findAllByNickname(nickname);
    }

}
