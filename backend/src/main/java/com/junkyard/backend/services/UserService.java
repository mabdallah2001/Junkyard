package com.junkyard.backend.services;

import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;

public interface UserService {
    User validateUser(String email, String password) throws AuthException;

    User registerUser(String name, String email, String password, String phoneNumber) throws AuthException;
}
