package com.project.glog.repository;

import com.project.glog.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByNickname (String nickname);
    Optional<Member> findByLogin_id (String login_id);

    List<Member> findAllByNickname (String nickname);


}
