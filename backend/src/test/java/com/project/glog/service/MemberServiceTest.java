package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Member;
import com.project.glog.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class MemberServiceTest {
    @Autowired
    MemberRepository memberRepository;

    @Test
    public void 회원_이름_검색() throws Exception {
        //Given
        Member member1 = new Member();
        member1.setNickname("member1");
        member1.setLoginid("qwe");
        member1.setLoginpw("asd");

        memberRepository.save(member1);

        //When
        Member result = memberRepository.findByLoginid("qwe").get();

        //Then
        Assertions.assertThat(result.getLoginid()).isEqualTo("qwe");
    }
}
