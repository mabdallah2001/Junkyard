package com.junkyard.backend.services;

import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;

import java.util.List;
import java.util.Map;

public interface CommentService {
    Comment registerComment(String content, String uid, Integer garageID) throws AuthException;

    Comment updateComment(int id, String content, String uid, int garageId)
            throws InternalServerErrorException, AuthException;

    void deleteComment(int id) throws InternalServerErrorException, AuthException;

    Comment getCommentByGarage(int garageID) throws NotFoundException;

    List<Map<String, Object>> getComments() throws NotFoundException;

    Comment getComment(int id) throws NotFoundException;
}
