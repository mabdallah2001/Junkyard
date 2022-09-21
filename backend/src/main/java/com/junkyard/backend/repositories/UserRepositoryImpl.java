package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private static final String SQL_CREATE = "INSERT INTO USERS (UID, EMAIL) VALUES(?, ?)";
    private static final String SQL_COUNT_BY_EMAIL = "SELECT COUNT(*) FROM USERS WHERE EMAIL = ?";
    private static final String SQL_COUNT_BY_UID = "SELECT COUNT(*) FROM USERS WHERE UID = ?";
    private static final String SQL_FIND_BY_UID = "SELECT * FROM USERS WHERE UID = ?";

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int create(String uid, String email) throws AuthException {
        try {
            return jdbcTemplate.update(SQL_CREATE, new Object[] {uid, email});
        } catch (Exception e) {
            throw new AuthException("Invalid details. Failed to create account");
        }
    }

    @Override
    public Integer getCountByEmail(String email) {
        return jdbcTemplate.queryForObject(SQL_COUNT_BY_EMAIL, new Object[]{email}, Integer.class);
    }

    @Override
    public Integer getCountByUid(String uid) {
        return jdbcTemplate.queryForObject(SQL_COUNT_BY_UID, new Object[]{uid}, Integer.class);
    }

    @Override
    public User findByUid(String uid) {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_UID, new Object[] {uid}, userRowMapper);
    }

    private RowMapper<User> userRowMapper = ((rs, rowNum) -> {
        return new User(rs.getString("UID"),
                rs.getString("EMAIL")
        );
    });
}
