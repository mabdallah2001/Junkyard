package com.junkyard.backend.resources;


import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.services.CommentService;
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
@RequestMapping("/api/comment")
public class CommentResource {

    @Autowired
    CommentService commentService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerComment(@RequestBody Map<String, Object> userMap) {
        String content = (String) userMap.get("content");
        Integer garageID = (Integer) userMap.get("garageID");
        String uid = (String) userMap.get("uid");
        Comment comment = commentService.registerComment(content, uid,garageID );

        Map<String, String> map = new HashMap<>();
        map.put("data", comment.getContents()); // TODO: better api response handling
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
