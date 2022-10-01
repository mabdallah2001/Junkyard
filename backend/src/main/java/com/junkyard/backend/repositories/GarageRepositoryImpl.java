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

    private static final String SQL_CREATE = "INSERT INTO GARAGES(ID, NAME, IMAGE_URL, ADDRESS1, ADDRESS2, CITY, COUNTRY, POSTCODE, DESCRIPTION,UID ) VALUES(NEXTVAL('users_seq'), ?, ?, ?, ?,?,?,?,?,?)";
    private static final String SQL_FIND_BY_ID = "SELECT * FROM GARAGES WHERE ID = ?";

    @Override
    public Integer create(String name, String imageURL, String address1,String address2,String city, String country, Integer postcode, String description, String uid) throws AuthException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, name);
                ps.setString(2,imageURL);
                ps.setString(3,address1);
                ps.setString(4,address2);
                ps.setString(5,city);
                ps.setString(6,country);
                ps.setInt(7,postcode);
                ps.setString(8,description);
                ps.setString(9,uid);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("ID");
        } catch (Exception e) {
            System.out.println(e.getMessage());
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
                rs.getString("IMAGE_URL"),
                rs.getString("ADDRESS1"),
                rs.getString("ADDRESS2"),
                rs.getString("CITY"),
                rs.getString("COUNTRY"),
                rs.getInt("POSTCODE"),
                rs.getString("DESCRIPTION"),
                rs.getString("UID")
        );
    });

}
