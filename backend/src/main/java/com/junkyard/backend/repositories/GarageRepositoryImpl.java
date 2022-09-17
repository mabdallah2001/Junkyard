package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Garage;
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
public class GarageRepositoryImpl implements GarageRepository{

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String SQL_CREATE = "INSERT INTO GARAGE(ID, NAME, LOCATION, OPERATING_HOUR, DETAILS) VALUES(NEXTVAL('users_seq'), ?, ?, ?, ?)";
    private static final String SQL_FIND_BY_ID = "SELECT ID, NAME, LOCATION, OPERATING_HOUR, DETAILS FROM GARAGE WHERE ID = ?";

    @Override
    public Integer create(String name, String location, String operatingHour, String details) throws AuthException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, name);
                ps.setString(2, location);
                ps.setString(3, operatingHour);
                ps.setString(4, details);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("ID");
        } catch (Exception e) {
            throw new AuthException("Invalid details. Failed to create account");

        }
    }

    @Override
    public Garage findById(Integer garageId) {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_ID, new Object[]{garageId}, garageRowMapper);
    }

    private RowMapper<Garage> garageRowMapper = ((rs, rowNum) -> {
        return new Garage(rs.getInt("ID"),
                rs.getString("NAME"),
                rs.getString("LOCATION"),
                rs.getString("OPERATING_HOUR"),
                rs.getString("DETAILS")
        );
    });

}
