package com.junkyard.backend.resources;

import com.junkyard.backend.domain.User;
import com.junkyard.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserResource {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody Map<String, Object> userMap) {
        String name = (String) userMap.get("name");
        String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        String phoneNumber = (String) userMap.get("phoneNumber");

        User user = userService.registerUser(name, email, password, phoneNumber);
        Map<String, String> map = new HashMap<>();
        map.put("data", user.getName()); // TODO: better api response handling
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
