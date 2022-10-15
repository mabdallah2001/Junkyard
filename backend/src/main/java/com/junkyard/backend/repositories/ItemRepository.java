package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Item;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface ItemRepository {

    // CREATE AN ITEM
    int createItem(
            String name,
            int quantity,
            String imageURL,
            String description,
            BigDecimal price,
            int garageId,
            String uid
    ) throws InternalServerErrorException, AuthException;

    // GET AN ITEM
    Item getItem(int id) throws NotFoundException;

    // GET ALL ITEMS
    List<Map<String, Object>> getItems() throws NotFoundException;

    List<Map<String, Object>> queryItems(String query) throws NotFoundException;

    // UPDATE AN ITEM
    int updateItem(int id, String name, int quantity, String imageUrl, String description, BigDecimal price, int garageId, String uid)
            throws InternalServerErrorException, AuthException;

    // DELETE AN ITEM
    void deleteItem(int id) throws InternalServerErrorException, AuthException;

    Integer countItemsByGarageId(int garage_id) throws NotFoundException;
}
