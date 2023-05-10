package com.project.glog.repository;

import com.project.glog.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByNickname (String nickname);
    Optional<Member> findByLoginid (String loginid);

    List<Member> findAllByNickname (String nickname);


}
