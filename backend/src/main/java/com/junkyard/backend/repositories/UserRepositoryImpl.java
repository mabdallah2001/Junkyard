package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.User;
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
public class UserRepositoryImpl implements UserRepository {

    private static final String SQL_CREATE = "INSERT INTO USERS(ID, NAME, EMAIL, PASSWORD, PHONE_NUMBER) VALUES(NEXTVAL('users_seq'), ?, ?, ?, ?)";
    private static final String SQL_COUNT_BY_EMAIL = "SELECT COUNT(*) FROM USERS WHERE EMAIL = ?";
    private static final String SQL_FIND_BY_ID = "SELECT ID, NAME, EMAIL, PASSWORD, PHONE_NUMBER FROM USERS WHERE ID = ?";

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Integer create(String name, String email, String password, String phoneNumber) throws AuthException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, name);
                ps.setString(2, email);
                ps.setString(3, password);
                ps.setString(4, phoneNumber);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("ID");
        } catch (Exception e) {
            throw new AuthException("Invalid details. Failed to create account");
        }
    }

    @Override
    public User findByEmailAndPassword(String email, String password) throws AuthException {
        return null;
    }

    @Override
    public Integer getCountByEmail(String email) {
        return jdbcTemplate.queryForObject(SQL_COUNT_BY_EMAIL, new Object[]{email}, Integer.class);
    }

    @Override
    public User findById(Integer userId) {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_ID, new Object[]{userId}, userRowMapper);
    }

    private RowMapper<User> userRowMapper = ((rs, rowNum) -> {
        return new User(rs.getInt("ID"),
                rs.getString("NAME"),
                rs.getString("EMAIL"),
                rs.getString("PASSWORD"),
                rs.getString("PHONE_NUMBER")
        );
    });
}
