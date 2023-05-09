package com.project.glog.repository;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
