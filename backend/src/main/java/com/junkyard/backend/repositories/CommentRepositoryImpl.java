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

    private static final String SQL_CREATE = "INSERT INTO COMMENT(ID, CONTENT, GARAGEID, USERID) VALUES(NEXTVAL('users_seq'), ?, ?, ?)";
    private static final String SQL_FIND_BY_ID = "SELECT ID, NAME, LOCATION, OPERATING_HOUR, DETAILS FROM GARAGE WHERE ID = ?";


    @Override
    public Integer create(String content, Integer userID, Integer garageID) throws AuthException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, content);
                ps.setInt(2, userID);
                ps.setInt(3, garageID);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("ID");
        } catch (Exception e) {
            throw new AuthException("Invalid details. Failed to create account");

        }
    }

    @Override
    public Comment findById(Integer commentId) {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_ID, new Object[]{commentId}, commentRowMapper);
    }

    private RowMapper<Comment> commentRowMapper = ((rs, rowNum) -> {
        return new Comment(rs.getInt("ID"),
                rs.getString("CONTENT"),
                rs.getInt("USERID"),
                rs.getInt("GARAGEID")
        );
    });
}
