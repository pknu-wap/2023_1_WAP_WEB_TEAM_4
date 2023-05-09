package com.project.glog.repository;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    @Query("SELECT b FROM Blog b JOIN b.member m WHERE m.id=:memberId ")
    Optional<Blog> findByMemberId(@Param("memberId") Long uid);
}
