package com.project.glog;

import com.project.glog.repository.*;
import com.project.glog.service.BlogService;
import com.project.glog.service.CategoryService;
import com.project.glog.service.ContentService;
import com.project.glog.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    @Bean
    public UserService userService(){
        return new UserService(userRepository(),blogService());
    }

    @Bean
    public UserRepository userRepository() {
        return new MemoryUserRepository();
    }

    @Bean
    public ContentService contentService(){return new ContentService(contentRepository());
    }

    @Bean
    public ContentRepository contentRepository(){return new MemoryContentRepository();}

    @Bean
    public CategoryService categoryService(){return new CategoryService(categoryRepository());}

    @Bean
    public CategoryRepository categoryRepository(){return new MemoryCategoryRepository();}

    @Bean
    public BlogService blogService(){return new BlogService(blogRepository());}

    @Bean
    public BlogRepository blogRepository(){return new MemoryBlogRepository();}

}
