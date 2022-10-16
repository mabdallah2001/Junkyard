package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
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
public class GarageRepositoryImpl implements GarageRepository{

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String SQL_CREATE = "INSERT INTO GARAGES(ID, NAME, IMAGE_URL, ADDRESS1, ADDRESS2, CITY, COUNTRY, POSTCODE, DESCRIPTION,UID ) VALUES(NEXTVAL('users_seq'), ?, ?, ?, ?,?,?,?,?,?)";
    private static final String SQL_FIND_BY_ID = "SELECT * FROM GARAGES WHERE ID = ?";
    private static final String SQL_FIND_ALL = "SELECT * FROM GARAGES ORDER BY id DESC";
    private static final String SQL_UPDATE_BY_ID = "UPDATE GARAGES SET name = ?, image_url = ?, " +
    "address1 = ?, address2 = ?, city = ?, country = ?, postcode = ?, description = ?, uid = ? WHERE id = ?";
    private static final String SQL_DELETE_BY_ID = "DELETE FROM GARAGES WHERE id = ?";
    private static final String SQL_FIND_BY_UID = "SELECT * FROM GARAGES WHERE UID = ?";

    



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

    // @Override
    // public Garage getGarage(int id) throws NotFoundException {
    //     return jdbcTemplate.queryForObject(SQL_FIND_BY_ID, new Object[] {id}, garageRowMapper);

    // }

    @Override
    public List<Map<String, Object>> getGarages() throws NotFoundException {
        return jdbcTemplate.queryForList(SQL_FIND_ALL);

    }

    @Override
    public int updateGarage(int id, String name, String imageURL, String address1, String address2, String city,
            String country, int postcode, String description, String uid)
            throws InternalServerErrorException, NotFoundException {
        


                try {
                    KeyHolder keyHolder = new GeneratedKeyHolder();
                    jdbcTemplate.update(connection -> {
                        PreparedStatement ps = connection.prepareStatement(SQL_UPDATE_BY_ID, Statement.RETURN_GENERATED_KEYS);
                        ps.setString(1, name);
                        ps.setString(2, imageURL);
                        ps.setString(3, address1);
                        ps.setString(4, address2);
                        ps.setString(5, city);
                        ps.setString(6, country);
                        ps.setInt(7, postcode);
                        ps.setString(8, description);
                        ps.setString(9, uid);
                        ps.setInt(10, id);
                        return ps;
                    }, keyHolder);
                    return (Integer) keyHolder.getKeys().get("ID");
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new InternalServerErrorException("Something went wrong.");
                }
    }

    @Override
    public void deleteGarage(int id) throws InternalServerErrorException, NotFoundException {
        jdbcTemplate.update(SQL_DELETE_BY_ID, new Object[] {id});
        
        
    }

    @Override
    public int getCountByUserID(int user_id) throws NotFoundException {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public List<Map<String, Object>> getGaragesByUID(String uid) throws NotFoundException {
        return jdbcTemplate.queryForList(SQL_FIND_BY_UID,new Object[]{uid}, garageRowMapper);
        
    }

    

}
