package com.project.glog;

import com.project.glog.repository.*;
import com.project.glog.service.BlogService;
import com.project.glog.service.CategoryService;
import com.project.glog.service.ContentService;
import com.project.glog.service.MemberService;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final ContentRepository contentRepository;
    private final BlogRepository blogRepository;
    @Autowired
    public SpringConfig(MemberRepository memberRepository,
                        CategoryRepository categoryRepository,
                        ContentRepository contentRepository,
                        BlogRepository blogRepository) {
        this.memberRepository = memberRepository;
        this.categoryRepository = categoryRepository;
        this.contentRepository = contentRepository;
        this.blogRepository = blogRepository;

    }

    @Bean
    public MemberService memberService(){
        return new MemberService(memberRepository,blogService());
    }

    @Bean
    public ContentService contentService(){return new ContentService(contentRepository, categoryService(), memberService(), blogService());
    }

    @Bean
    public CategoryService categoryService(){return new CategoryService(categoryRepository, blogService());}

    @Bean
    public BlogService blogService(){return new BlogService(blogRepository);}

}
