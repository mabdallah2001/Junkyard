package com.junkyard.backend.resources;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;
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

    @PostMapping("/")
    public ResponseEntity<Map<String, String>> registerGarage(@RequestBody Map<String, Object> garageMap) {
        String name = (String) garageMap.get("name");
        String imageURL = (String) garageMap.get("imageURL");
        String uid = (String) garageMap.get("uid");
        String address1 =(String) garageMap.get("address1");
        String address2 = (String) garageMap.get("address2");
        String city = (String) garageMap.get("city");
        String country = (String) garageMap.get("country");
        Integer postcode =(Integer) garageMap.get("postcode");
        System.out.println(postcode.getClass().getSimpleName());
        String description = (String) garageMap.get("description");
        Garage garage = garageService.registerGarage(name, imageURL, address1,address2, city,country,postcode,description,uid);
        Map<String, String> map = new HashMap<>();
        map.put("data", garage.getName()); // TODO: better api response handling
        return new ResponseEntity<>(map, HttpStatus.OK);
    }



    @GetMapping("/")
    public ResponseEntity<List<Map<String, Object>>> getGarages() throws NotFoundException {
        List<Map<String, Object>> garages = garageService.getGarages();

        if (garages != null) {
            return ResponseEntity.ok(garages);
          } else {
            throw new NotFoundException("No record found.");
          }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Map<String, Object>>> getGaragesByUID(@RequestParam String uid) throws NotFoundException {
        List<Map<String, Object>> garages = garageService.getGaragesByUID(uid);

        if (garages != null) {
            return ResponseEntity.ok(garages);
          } else {
            throw new NotFoundException("No record found.");
          }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Garage> getGarage(@PathVariable int id) throws NotFoundException {
    Garage garage = garageService.getGarage(id);

    if (garage != null) {
      return ResponseEntity.ok(garage);
    } else {
      throw new NotFoundException("No record found.");
    }
  }


  @PutMapping("/{id}")
  public ResponseEntity<Garage> updateGarage(@PathVariable int id, @RequestBody Map<String, Object> garageMap)
      throws InternalServerErrorException {
    String name = (String) garageMap.get("name");
    String imageURL = (String) garageMap.get("imageURL");
    String uid = (String) garageMap.get("uid");
    String address1 =(String) garageMap.get("address1");
    String address2 = (String) garageMap.get("address2");
    String city = (String) garageMap.get("city");
    String country = (String) garageMap.get("country");
    Integer postcode =(Integer) garageMap.get("postcode");
    String description = (String) garageMap.get("description");


    Garage garage = garageService.updateGarage(id, name, imageURL, address1,address2, city,country,postcode,description,uid);

    if (garage != null) {
      return ResponseEntity.ok(garage);
    } else {
      throw new InternalServerErrorException("Something went wrong.");
    }
  }



  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteGarage(@PathVariable int id) throws NotFoundException {
    garageService.deleteGarage(id);

    HashMap<String, String> response = new HashMap<>();
    response.put("data", "success");
    return ResponseEntity.ok(response);
  }


}
