package com.junkyard.backend.resources;


import com.junkyard.backend.domain.Comment;
import com.junkyard.backend.domain.Item;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;
import com.junkyard.backend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
public class CommentResource {

    @Autowired
    CommentService commentService;

    @PostMapping("/")
    public ResponseEntity<Map<String, String>> registerComment(@RequestBody Map<String, Object> userMap) {
        String content = (String) userMap.get("content");
        Integer garageID = (Integer) userMap.get("garage_id");
        String uid = (String) userMap.get("uid");
        Comment comment = commentService.registerComment(content, uid,garageID );

        Map<String, String> map = new HashMap<>();
        map.put("data", comment.getContents()); // TODO: better api response handling
        return new ResponseEntity<>(map, HttpStatus.OK);
    }


    @GetMapping("/garage/{id}")
    public ResponseEntity<List<Map<String, Object>>> getCommentByGarage(@PathVariable int id) throws NotFoundException {
        List<Map<String, Object>> comments = commentService.getCommentByGarage(id);
        if (comments != null) {
            return ResponseEntity.ok(comments);
        } else {
            throw new NotFoundException("No record found.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable int id) throws NotFoundException {
        Comment comment = commentService.getComment(id);
        if (comment != null) {
            return ResponseEntity.ok(comment);
        } else {
            throw new NotFoundException("No record found.");
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Map<String, Object>>> getItems() throws NotFoundException {
        List<Map<String, Object>> items = commentService.getComments();
        if (items != null) {
            return ResponseEntity.ok(items);
        } else {
            throw new NotFoundException("No record found.");
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable int id, @RequestBody Map<String, Object> commentMap)
            throws InternalServerErrorException {
        String content = (String) commentMap.get("content");
        int garageId = (Integer) commentMap.get("garage_id");
        String uid = (String) commentMap.get("uid");

        Comment comment = commentService.updateComment(id, content,uid,garageId);

        if (comment != null) {
            return ResponseEntity.ok(comment);
        } else {
            throw new InternalServerErrorException("Something went wrong.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComment(@PathVariable int id) throws NotFoundException {
        commentService.deleteComment(id);
        HashMap<String, String> response = new HashMap<>();
        response.put("data", "success");
        return ResponseEntity.ok(response);
    }


}
