package com.junkyard.backend.resources;

import com.junkyard.backend.domain.Item;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;
import com.junkyard.backend.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class ItemResource {

    @Autowired
    ItemService itemService;

    @PostMapping("/")
    public ResponseEntity<Item> createItem(@RequestBody Map<String, Object> itemMap) throws InternalServerErrorException {
        String name = (String) itemMap.get("name");
        int quantity = (Integer) itemMap.get("quantity");
        String imageURL = (String) itemMap.get("image_url");
        String description = (String) itemMap.get("description");
        int garageId = (Integer) itemMap.get("garage_id");
        String uid = (String) itemMap.get("uid");

        Double priceInDouble = (Double) itemMap.get("price");
        BigDecimal price = BigDecimal.valueOf(priceInDouble);


        Item item = itemService.createItem(name, quantity, imageURL, description, price, garageId, uid);
        return ResponseEntity.ok(item);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable int id) throws NotFoundException {
        Item item = itemService.getItem(id);

        if (item != null) {
            return ResponseEntity.ok(item);
        } else {
            throw new NotFoundException("No record found.");
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Map<String, Object>>> getItems() throws NotFoundException {
        List<Map<String, Object>> items = itemService.getItems();

        if (items != null) {
            return ResponseEntity.ok(items);
        } else {
            throw new NotFoundException("No record found.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable int id, @RequestBody Map<String, Object> itemMap) throws InternalServerErrorException {
        String name = (String) itemMap.get("name");
        int quantity = (Integer) itemMap.get("quantity");
        String imageURL = (String) itemMap.get("image_url");
        String description = (String) itemMap.get("description");
        int garageId = (Integer) itemMap.get("garage_id");
        String uid = (String) itemMap.get("uid");

        Double priceInDouble = (Double) itemMap.get("price");
        BigDecimal price = BigDecimal.valueOf(priceInDouble);

        Item item = itemService.updateItem(id, name, quantity, imageURL, description, price, garageId, uid);

        if (item != null) {
            return ResponseEntity.ok(item);
        } else {
            throw new InternalServerErrorException("Something went wrong.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteItem(@PathVariable int id) throws NotFoundException {
        itemService.deleteItem(id);

        HashMap<String, String> response = new HashMap<>();
        response.put("data", "success");
        return ResponseEntity.ok(response);
    }
}