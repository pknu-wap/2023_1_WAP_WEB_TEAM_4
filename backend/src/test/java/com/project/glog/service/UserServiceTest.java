package com.project.glog.service;

import com.project.glog.domain.User;
import com.project.glog.repository.MemoryUserRepository;
import com.project.glog.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

public class UserServiceTest {

    UserService userService;
    MemoryUserRepository userRepository;
    BlogService blogService;

    @BeforeEach
    public void beforeEach(){
        userRepository = new MemoryUserRepository();
        userService = new UserService(userRepository, blogService);
    }

    @AfterEach
    public void afterEach(){
        userRepository.clearStore();
    }

    @Test
    public void 회원_검색() throws Exception {
        //Given
        User user1 = new User();
        user1.setNickname("user1");
        userRepository.save(user1);

        User user2 = new User();
        user2.setNickname("user2");
        userRepository.save(user2);

        //When
        List<User> result = userService.searchUsersByNickname("user");

        //Then
        Assertions.assertThat(result.size()).isEqualTo(2);
    }
}
