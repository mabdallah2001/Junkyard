package com.junkyard.backend.services;

import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;

public interface CommentService {
    Comment registerComment(String content, Integer userID, Integer garageID) throws AuthException;

}
