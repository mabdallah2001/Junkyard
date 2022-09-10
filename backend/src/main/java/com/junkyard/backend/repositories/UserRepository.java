package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;

public interface UserRepository {
    Integer create(String name, String email, String password, String phoneNumber) throws AuthException;

    User findByEmailAndPassword(String email, String password) throws AuthException;

    Integer getCountByEmail(String email);

    User findById(Integer userId);
}
