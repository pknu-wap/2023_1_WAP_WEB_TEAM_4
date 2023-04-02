package com.project.glog.service;

import com.project.glog.domain.User;
import com.project.glog.repository.MemoryUserRepository;
import com.project.glog.repository.UserRepository;

import java.util.List;

public class
UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public Long join(User user){

        validateDuplicateUser(user);
        userRepository.save(user);
        return user.getId();
    }

    private void validateDuplicateUser(User user) {

        userRepository.findByNickname(user.getNickname())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });

        userRepository.findByLogin_id(user.getLogin_id())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 아이디 입니다.");
                });
    }

    public List<User> searchUsersByNickname(String nickname){
        List<User> users= userRepository.findUsersByNickname(nickname);
        return users;
    }

    public Long changeUserPw(User user){
        userRepository.update(user);
        return user.getId();
    }


}
