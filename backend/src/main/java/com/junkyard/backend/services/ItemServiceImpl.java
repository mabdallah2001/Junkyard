package com.junkyard.backend.services;

import com.junkyard.backend.domain.Item;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;
import com.junkyard.backend.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Override
    public Item createItem(String name, int quantity, String imageURL, String description, BigDecimal price, int garageId, String uid)
            throws InternalServerErrorException, AuthException {
        Integer itemId = itemRepository.createItem(name, quantity, imageURL, description, price, garageId, uid);
        return itemRepository.getItem(itemId);
    }

    @Override
    public Item getItem(int id) throws NotFoundException {
        return itemRepository.getItem(id);
    }

    @Override
    public List<Map<String, Object>> getItems() throws NotFoundException {
        return itemRepository.getItems();
    }

    @Override
    public List<Map<String, Object>> queryItems(String query) throws NotFoundException {
        return itemRepository.queryItems(query);
    }

    @Override
    public Item updateItem(int id, String name, int quantity, String imageUrl, String description, BigDecimal price, int garageId, String uid)
            throws InternalServerErrorException, AuthException {
        Integer itemId = itemRepository.updateItem(id, name, quantity, imageUrl, description, price, garageId, uid);
        return itemRepository.getItem(itemId);
    }

    @Override
    public void deleteItem(int id) throws InternalServerErrorException, AuthException {
        itemRepository.deleteItem(id);
    }

    @Override
    public Integer getCountByGarageId(int garage_id) throws NotFoundException {
        return null;
    }
}
