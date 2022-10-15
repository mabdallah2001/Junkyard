package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Item;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private static final String SQL_CREATE = "INSERT INTO USERS (UID, EMAIL, TYPE) VALUES(?, ?, ?)";
    private static final String SQL_COUNT_BY_EMAIL = "SELECT COUNT(*) FROM USERS WHERE EMAIL = ?";
    private static final String SQL_COUNT_BY_UID = "SELECT COUNT(*) FROM USERS WHERE UID = ?";
    private static final String SQL_FIND_BY_UID = "SELECT * FROM USERS WHERE UID = ?";

    private static final String SQL_UPDATE_BY_UID = "UPDATE users SET email = ?, type = ? WHERE uid = ?";

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int create(String uid, String email, int type) throws AuthException {
        try {
            return jdbcTemplate.update(SQL_CREATE, new Object[] {uid, email, type});
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new AuthException("Invalid details. Failed to create account");
        }
    }

    @Override
    public User getUser(String uid) throws NotFoundException {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_UID, new Object[] {uid}, userRowMapper);
    }

    @Override
    public String updateUser(String uid, String email, int type) throws AuthException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_UPDATE_BY_UID, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, email);
                ps.setInt(2, type);
                ps.setString(3, uid);
                return ps;
            }, keyHolder);
            return (String) keyHolder.getKeys().get("UID");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            throw new InternalServerErrorException("Something went wrong.");
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
                rs.getString("EMAIL"),
                rs.getInt("TYPE")
        );
    });
}
