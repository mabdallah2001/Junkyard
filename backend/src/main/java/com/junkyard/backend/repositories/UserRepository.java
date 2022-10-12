package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;

import java.math.BigDecimal;

public interface UserRepository {

    int create(String uid, String email, int type) throws AuthException;

    User getUser(String uid) throws NotFoundException;

    String updateUser(String uid, String email, int type) throws AuthException;
    User findByUid(String uid);

    Integer getCountByEmail(String email);

    Integer getCountByUid(String uid);
}
