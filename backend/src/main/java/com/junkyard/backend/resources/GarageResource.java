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
    public ResponseEntity<Map<String, String>> registerGarage(@RequestBody Map<String, Object> userMap) {
        String name = (String) userMap.get("name");
        String location = (String) userMap.get("location");
        String operatingHour = (String) userMap.get("operatingHour");
        String details = (String) userMap.get("details");
        Garage garage = garageService.registerGarage(name,location,operatingHour,details);

        Map<String, String> map = new HashMap<>();
        map.put("data", garage.getName()); // TODO: better api response handling
        return new ResponseEntity<>(map, HttpStatus.OK);
    }


}
