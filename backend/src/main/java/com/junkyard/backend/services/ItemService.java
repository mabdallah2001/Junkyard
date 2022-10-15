package com.junkyard.backend.services;

import com.junkyard.backend.domain.Item;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface ItemService {

    // CREATE AN ITEM
    Item createItem(
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
    Item updateItem(int id, String name, int quantity, String imageUrl, String description, BigDecimal price, int garageId, String uid) throws InternalServerErrorException, NotFoundException;

    // DELETE AN ITEM
    void deleteItem(int id) throws InternalServerErrorException, NotFoundException;

    Integer getCountByGarageId(int garage_id) throws NotFoundException;
}
