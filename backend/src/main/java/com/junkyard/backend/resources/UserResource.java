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
        String uid = (String) userMap.get("uid");
        String email = (String) userMap.get("email");

        User user = userService.registerUser(uid, email);
        Map<String, String> response = new HashMap<>();
        response.put("data", user.getUid()); // TODO: better api response handling
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
