package com.junkyard.backend.services;

import com.junkyard.backend.domain.Item;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User registerUser(String uid, String email, int type) throws AuthException {
        Integer emailCount = userRepository.getCountByEmail(email);
        Integer uidCount = userRepository.getCountByUid(uid);
        if (emailCount > 0 || uidCount > 0)
            throw new AuthException("Email or uid already in use");

        userRepository.create(uid, email, type);
        return userRepository.findByUid(uid);
    }

    @Override
    public User updateUser(String uid, String email, int type) throws AuthException {
        userRepository.updateUser(uid, email, type);
        return userRepository.findByUid(uid);
    }

    @Override
    public User getUser(String uid) throws AuthException {
        return userRepository.getUser(uid);
    }
}
