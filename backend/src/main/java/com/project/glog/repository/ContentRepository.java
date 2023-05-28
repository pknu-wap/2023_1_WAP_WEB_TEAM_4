package com.project.glog.repository;

import com.project.glog.domain.Category;
import com.project.glog.domain.Content;
import com.project.glog.dto.ContentTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.jmx.export.annotation.ManagedOperationParameter;

import java.util.List;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content,Long> {
    @Query("SELECT c FROM Content c WHERE c.text like '%:stirng%'")
    List<Content> findAllByText(@Param("string") String string);

    @Query("SELECT c FROM Content c JOIN c.blog b WHERE b.id=:blogId")
    List<Content> findAllByBlogId(@Param("blogId") Long bid);

    List<Content> findAllByOrderByCreatedAtDesc();

    List<Content> findAllByOrderByLikesDesc();

    List<Content> findAllByOrderByViewsDesc();

    @Query("SELECT con FROM Content con JOIN con.category cat WHERE cat.id=:catId ")
    List<Content> findAllByCategoryId(@Param("catId") Long id);
}
