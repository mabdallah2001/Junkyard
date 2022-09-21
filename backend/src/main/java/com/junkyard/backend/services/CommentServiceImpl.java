package com.junkyard.backend.services;

import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;
    @Override
    public Comment registerComment(String content, Integer userID, Integer garageID) throws AuthException {
        Integer commentID = commentRepository.create(content, userID, garageID);
        return commentRepository.findById(commentID);
    }
}
