package com.project.glog;

import com.project.glog.repository.MemoryUserRepository;
import com.project.glog.repository.UserRepository;
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

}
