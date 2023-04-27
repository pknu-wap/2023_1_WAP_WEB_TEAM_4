package com.project.glog;

import com.project.glog.domain.Content;
import com.project.glog.repository.ContentRepository;
import com.project.glog.repository.MemoryContentRepository;
import com.project.glog.repository.MemoryUserRepository;
import com.project.glog.repository.UserRepository;
import com.project.glog.service.ContentService;
import com.project.glog.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    @Bean
    public UserService userService(){
        return new UserService(userRepository());
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
}
