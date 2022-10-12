package com.junkyard.backend.services;

import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.domain.Item;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;
import com.junkyard.backend.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.metadata.CommonsDbcp2DataSourcePoolMetadata;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


@Service
@Transactional
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;
    @Override
    public Comment registerComment(String content, String uid, Integer garageID) throws AuthException {
        Integer commentID = commentRepository.create(content, uid, garageID);
        System.out.println(commentID);
        return commentRepository.findById(commentID);
    }

    @Override
    public Comment updateComment(int id, String content, String uid, int garageId)
            throws InternalServerErrorException, AuthException {
        Integer commentId = commentRepository.updateComment(id,content,uid,garageId);
        return commentRepository.findById(commentId);
    }


    @Override
    public void deleteComment(int id) throws InternalServerErrorException, AuthException {
        commentRepository.deleteComment(id);
    }

    @Override
    public List<Map<String, Object>> getCommentByGarage(int garageID) throws NotFoundException {
        return commentRepository.getCommentByGarage(garageID);
    }

    @Override
    public List<Map<String, Object>> getCommentByUser(String userID) throws NotFoundException {
        return commentRepository.getCommentByUser(userID);
    }


    @Override
    public List<Map<String, Object>> getComments() throws NotFoundException {
        return commentRepository.getComments();
    }

    @Override
    public Comment getComment(int id) throws NotFoundException {
        return commentRepository.findById(id);
    }



}
