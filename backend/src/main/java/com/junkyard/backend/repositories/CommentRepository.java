package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.NotFoundException;

import java.util.List;
import java.util.Map;

public interface CommentRepository {
    Integer create(String content, String uid, Integer garageID) throws AuthException;

    Comment findById(Integer garageId);

    Integer updateComment(int id, String content, String uid, Integer garageID) throws AuthException;

    void deleteComment(int id) throws NotFoundException;

    Comment getCommentByGarage(int garageID) throws NotFoundException;

    List<Map<String, Object>> getComments() throws NotFoundException;

}
