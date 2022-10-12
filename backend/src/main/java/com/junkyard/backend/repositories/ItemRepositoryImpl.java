package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Item;
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
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

@Repository
public class ItemRepositoryImpl implements ItemRepository {
    private static final String SQL_CREATE = "INSERT INTO items(id, name, quantity, image_url, description, price, garage_id, uid) " +
            "VALUES(NEXTVAL('items_seq'), ?, ?, ?, ?, ?, ?, ?)";
    private static final String SQL_FIND_BY_ID = "SELECT * FROM items WHERE id = ?";
    private static final String SQL_FIND_ALL = "SELECT * FROM items ORDER BY id DESC";
    private static final String SQL_UPDATE_BY_ID = "UPDATE items SET name = ?,  quantity = ?, image_url = ?, " +
            "description = ?, price = ?, garage_id = ?, uid = ? WHERE id = ?";
    private static final String SQL_DELETE_BY_ID = "DELETE FROM items WHERE id = ?";

    private static final String SQL_COUNT_BY_ID = "SELECT COUNT(*) FROM items WHERE id = ?";

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int createItem(String name, int quantity, String imageUrl, String description, BigDecimal price, int garageId, String uid) throws AuthException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, name);
                ps.setInt(2, quantity);
                ps.setString(3, imageUrl);
                ps.setString(4, description);
                ps.setBigDecimal(5, price);
                ps.setInt(6, garageId);
                ps.setString(7, uid);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("ID");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalServerErrorException("Something went wrong.");
        }
    }

    @Override
    public Item getItem(int id) throws NotFoundException {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_ID, new Object[] {id}, itemRowMapper);
    }

    @Override
    public void deleteItem(int id) throws NotFoundException {
        jdbcTemplate.update(SQL_DELETE_BY_ID, new Object[] {id});
    }

    public List<Map<String, Object>> getItems() throws NotFoundException {
        return jdbcTemplate.queryForList(SQL_FIND_ALL);
    }

    @Override
    public int updateItem(int id, String name, int quantity, String imageUrl, String description, BigDecimal price, int garageId, String uid) throws InternalServerErrorException, AuthException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_UPDATE_BY_ID, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, name);
                ps.setInt(2, quantity);
                ps.setString(3, imageUrl);
                ps.setString(4, description);
                ps.setBigDecimal(5, price);
                ps.setInt(6, garageId);
                ps.setString(7, uid);
                ps.setInt(8, id);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("ID");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalServerErrorException("Something went wrong.");
        }
    }

    @Override
    public Integer countItemsByGarageId(int garage_id) throws NotFoundException {
        return null;
    }

    private RowMapper<Item> itemRowMapper = ((rs, rowNum) -> {
        return new Item(rs.getInt("ID"),
                rs.getString("NAME"),
                rs.getInt("QUANTITY"),
                rs.getString("IMAGE_URL"),
                rs.getString("DESCRIPTION"),
                rs.getBigDecimal("PRICE"),
                rs.getInt("GARAGE_ID"),
                rs.getString("UID")
        );
    });


}


