package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;


@Repository
public class CommentRepositoryImpl implements CommentRepository{

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String SQL_CREATE = "INSERT INTO COMMENTS(ID, CONTENT, GARAGEID, UID) VALUES(NEXTVAL('users_seq'), ?, ?, ?)";
    private static final String SQL_FIND_BY_ID = "SELECT * FROM COMMENTS WHERE ID = ?";


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
    public Comment findById(Integer commentId) {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_ID, new Object[]{commentId}, commentRowMapper);
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
