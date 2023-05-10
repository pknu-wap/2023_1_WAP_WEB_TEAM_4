package com.project.glog.service;

import com.project.glog.domain.Member;
import com.project.glog.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

public class MemberServiceTest {

    MemberService memberService;
    MemberRepository memberRepository;
    BlogService blogService;

    @BeforeEach
    public void beforeEach(){
        memberService = new MemberService(memberRepository, blogService);
    }

    @AfterEach
    public void afterEach(){
        memberRepository.deleteAll();
    }

    @Test
    public void 회원_검색() throws Exception {
        //Given
        Member member1 = new Member();
        member1.setNickname("member1");
        memberRepository.save(member1);

        Member member2 = new Member();
        member2.setNickname("member2");
        memberRepository.save(member2);

        //When
        List<Member> result = memberService.searchMembersByNickname("member");

        //Then
        Assertions.assertThat(result.size()).isEqualTo(2);
    }

    @Test
    public void 회원_이름_검색() throws Exception {
        //Given
        Member member1 = new Member();
        member1.setNickname("member1");
        member1.setLogin_id("qwe");
        member1.setLogin_pw("asd");
        memberRepository.save(member1);

        //When
        Member result = memberRepository.findByLogin_id("qwe").get();

        //Then
        Assertions.assertThat(result.getId()).isEqualTo("qwe");
    }
}
