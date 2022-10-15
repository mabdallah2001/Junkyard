package com.junkyard.backend.resources;

import com.junkyard.backend.domain.Item;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.services.ItemService;
import com.junkyard.backend.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ItemResource.class)
class ItemResourceTest {

    @MockBean
    private ItemService itemService;
    private UserService userService;
    Item mockItem = new Item(1, "item name", 2, "img url", "desc", BigDecimal.valueOf(200.0), 1, "useruidhere");
    List<Map<String, Object>> mockItems = new ArrayList<Map<String, Object>>();

    @Autowired
    private MockMvc mvc;

    @Test
    void createItem() {
    }

    @Test
    void queryItems() {
        Mockito.when(itemService.getItem(1)).thenReturn(mockItem);

        RequestBuilder request = MockMvcRequestBuilders.get("/api/items?query=dsfd");
        try {
            MvcResult result = mvc.perform(request).andReturn();
            mvc.perform(get("/api/items?query=dsfd")).andExpect(status().isOk()).andReturn();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void getItem() {
        Mockito.when(itemService.getItem(1)).thenReturn(mockItem);

        RequestBuilder request = MockMvcRequestBuilders.get("/api/items/1");
        try {
            MvcResult result = mvc.perform(request).andReturn();
            mvc.perform(get("/api/items/1")).andExpect(status().isOk()).andReturn();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void getItems() {
        Mockito.when(itemService.getItem(1)).thenReturn(mockItem);

        RequestBuilder request = MockMvcRequestBuilders.get("/api/items/");
        try {
            MvcResult result = mvc.perform(request).andReturn();
            mvc.perform(get("/api/items/")).andExpect(status().isOk()).andReturn();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void updateItem() {
    }

    @Test
    void deleteItem() {
        Mockito.when(itemService.getItem(1)).thenReturn(mockItem);

        RequestBuilder request = delete("/api/items/1");
        try {
            MvcResult result = mvc.perform(request).andReturn();
            mvc.perform(delete("/api/items/1")).andExpect(status().isOk()).andReturn();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}