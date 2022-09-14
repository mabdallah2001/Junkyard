package com.junkyard.backend.services;

import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;

public interface UserService {

    User registerUser(String uid, String email) throws AuthException;
}
