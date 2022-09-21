package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;

public interface UserRepository {

    int create(String uid, String email) throws AuthException;

    User findByUid(String uid);

    Integer getCountByEmail(String email);

    Integer getCountByUid(String uid);
}
