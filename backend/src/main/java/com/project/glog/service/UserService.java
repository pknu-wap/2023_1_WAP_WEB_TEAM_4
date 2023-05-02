package com.project.glog.service;

import com.project.glog.domain.User;
import com.project.glog.repository.MemoryUserRepository;
import com.project.glog.repository.UserRepository;

import java.util.List;
import java.util.Optional;

public class
UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public Long join(User user){

        try {
            validateDuplicateUser(user);
        }
        catch(Exception e){
            if(e.getMessage().equals("이미 존재하는 회원입니다.")){
                return -1L;
            }
            else if(e.getMessage().equals("이미 존재하는 아이디 입니다.")){
                return -2L;
            }
        }
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

    public Long login(String login_id, String login_pw){
        Optional<User> userOptional = userRepository.findByLogin_id(login_id);
        if(userOptional.isPresent()){
            User user = userOptional.get();
            if(user.getLogin_pw().equals(login_pw)){
                return user.getId();
            }
        }

        return null;
    }
    public User searchUserById(Long id){
        User user = userRepository.findById(id).get();
        return user;
    }

    public List<User> searchUsersByNickname(String nickname){
        return userRepository.findUsersByNickname(nickname);
    }

    public Long changeUserPw(User user){
        userRepository.update(user);
        return user.getId();
    }


}
