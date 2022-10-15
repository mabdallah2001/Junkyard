package com.junkyard.backend.resources;

import com.junkyard.backend.domain.User;
import com.junkyard.backend.services.UserService;
import com.junkyard.backend.services.UserServiceImpl;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserResource.class)
class UserResourceTest {

    @MockBean
    private UserService userService;
    User mockUser = new User("useruidhere", "s@a.com", 1);

    @Autowired
    private MockMvc mvc;

    @Test
    void getUser() throws Exception {

        Mockito.when(userService.getUser("useruidhere")).thenReturn(mockUser);

        RequestBuilder request = MockMvcRequestBuilders.get("/api/users");
        MvcResult result = mvc.perform(request).andReturn();

        mvc.perform(get("/api/users?uid=useruidhere")).andExpect(status().isOk()).andReturn();
    }

    @Test
    void registerUser() {
    }

    @Test
    void updateUser() {
    }
}