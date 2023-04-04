package com.project.glog.repository;

import com.project.glog.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {

    User save(User user);
    User update(User user);
    Optional<User> findById(Long id);
    Optional<User> findByNickname(String nickname);
    Optional<User> findByLogin_id(String login_id);
    List<User> findUsersByNickname(String nickname);

}
