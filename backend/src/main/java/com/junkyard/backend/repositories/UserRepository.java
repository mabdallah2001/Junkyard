package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;

public interface UserRepository {
//    Integer create(String name, String email, String password, String phoneNumber) throws AuthException;

    int create(String uid, String email) throws AuthException;

    User findByUid(String uid);

    Integer getCountByEmail(String email);

    Integer getCountByUid(String uid);
}
