package com.junkyard.backend.resources;

import com.junkyard.backend.domain.Item;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;
import com.junkyard.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserResource {

    @Autowired
    UserService userService;

    @GetMapping("/")
    public ResponseEntity<User> getUser(@RequestBody Map<String, Object> userMap) throws NotFoundException {
        String uid = (String) userMap.get("uid");
        User user = userService.getUser(uid);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            throw new NotFoundException("No record found.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody Map<String, Object> userMap) {
        String uid = (String) userMap.get("uid");
        String email = (String) userMap.get("email");
        int type = (Integer) userMap.get("type");

        User user = userService.registerUser(uid, email, type);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            throw new NotFoundException("No record found.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody Map<String, Object> userMap)
            throws InternalServerErrorException {
        String uid = (String) userMap.get("uid");
        String email = (String) userMap.get("email");
        int type = (Integer) userMap.get("type");

        User user = userService.updateUser(uid, email, type);
        System.out.println("*****");
        System.out.println(user.getEmail());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            throw new NotFoundException("No record found.");
        }
    }
}
