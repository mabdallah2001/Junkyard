package com.junkyard.backend.resources;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.repositories.GarageRepository;
import com.junkyard.backend.services.GarageService;
import com.junkyard.backend.services.GarageService;
import com.junkyard.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
//controller/api
@RestController
@RequestMapping("/api/garage")
public class GarageResource {

    @Autowired
    GarageService garageService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerGarage(@RequestBody Map<String, Object> commentMap) {
        String name = (String) commentMap.get("name");
        String imageURL = (String) commentMap.get("imageURL");
        Integer userID = (Integer) commentMap.get("userID");
        String address1 =(String) commentMap.get("address1");
        String address2 = (String) commentMap.get("address2");
        String city = (String) commentMap.get("city");
        String country = (String) commentMap.get("country");
        Integer postcode =(Integer) commentMap.get("postcode");
        System.out.println(postcode.getClass().getSimpleName());
        String description = (String) commentMap.get("description");
        Garage garage = garageService.registerGarage(name, imageURL, address1,address2, city,country,postcode,description,userID);

        Map<String, String> map = new HashMap<>();
        map.put("data", garage.getName()); // TODO: better api response handling
        return new ResponseEntity<>(map, HttpStatus.OK);
    }


}
