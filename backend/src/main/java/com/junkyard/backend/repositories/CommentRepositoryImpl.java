package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;


@Repository
public class CommentRepositoryImpl implements CommentRepository{

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String SQL_CREATE = "INSERT INTO COMMENTS(ID, CONTENT, GARAGEID, UID) VALUES(NEXTVAL('users_seq'), ?, ?, ?)";
    private static final String SQL_FIND_BY_ID = "SELECT * FROM COMMENTS WHERE ID = ?";
    private static final String SQL_FIND_BY_GARAGE = "SELECT * FROM COMMENTS WHERE GARAGEID = ?";
    private static final String SQL_UPDATE_BY_ID = "UPDATE comments SET CONTENT = ?,  GARAGEID = ?, UID = ? WHERE id = ?";
    private static final String SQL_DELETE_BY_ID = "DELETE FROM comments WHERE id = ?";

    private static final String SQL_FIND_ALL = "SELECT * FROM comments ORDER BY id DESC";

    @Override
    public Integer create(String content, String uid, Integer garageID) throws AuthException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, content);
                ps.setInt(2, garageID);
                ps.setString(3, uid);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("ID");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new AuthException("Invalid details. Failed to create account");
        }
    }


    @Override
    public Comment getCommentByGarage(int garageID) throws NotFoundException {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_GARAGE, new Object[]{garageID}, commentRowMapper);

    }


    @Override
    public List<Map<String, Object>> getComments() throws NotFoundException {
        return jdbcTemplate.queryForList(SQL_FIND_ALL);
    }


    @Override
    public Integer updateComment(int id, String content, String uid, Integer garageID) throws AuthException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_UPDATE_BY_ID, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, content);
                ps.setInt(2, garageID);
                ps.setString(3, uid);
                ps.setInt(4,id);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("ID");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new AuthException("Invalid details. Failed to post comment");

        }
    }

    @Override
    public Comment findById(Integer commentId) {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_ID, new Object[]{commentId}, commentRowMapper);
    }

    @Override
    public void deleteComment(int id) throws NotFoundException {
        jdbcTemplate.update(SQL_DELETE_BY_ID, new Object[] {id});
    }

    private RowMapper<Comment> commentRowMapper = ((rs, rowNum) -> {
        System.out.println(rs.getString("ID"));
        return new Comment(rs.getInt("ID"),
                rs.getString("CONTENT"),
                rs.getString("UID"),
                rs.getInt("GARAGEID")
        );
    });
}
