package com.project.glog.repository;

import com.project.glog.domain.Category;
import com.project.glog.domain.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content,Long> {

}
