package com.project.glog.repository.dump;

import com.project.glog.domain.User;
import com.project.glog.repository.UserRepository;

import java.util.*;

//DAO
public class MemoryUserRepository implements UserRepository {

    private static Map<Long, User> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public User save(User user) {
        user.setId(++sequence);
        store.put(user.getId(), user);
        return user;
    }

    @Override
    public User update(User user) {
        store.put(user.getId(), user);
        return user;
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<User> findByNickname(String nickname) {
        return store.values().stream()
                .filter(user -> user.getNickname().equals(nickname))
                .findAny();
    }

    @Override
    public Optional<User> findByLogin_id(String login_id) {
        return store.values().stream()
                .filter(user -> user.getLogin_id().equals(login_id))
                .findAny();
    }

    @Override
    public List<User> findUsersByNickname(String nickname) {
        List<User> users = new ArrayList<>();
        for(Map.Entry<Long, User> entry : store.entrySet()){
            if(entry.getValue().getNickname().contains(nickname) ){
                users.add(store.get(entry.getKey()));
            }
        }
        return users;
    }


    public void clearStore(){
        store.clear();
    }
}
