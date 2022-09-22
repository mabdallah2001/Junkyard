package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;

public interface CommentRepository {
    Integer create(String content, String uid, Integer garageID) throws AuthException;

    Comment findById(Integer garageId);

}
