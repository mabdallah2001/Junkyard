package com.junkyard.backend.services;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;

import java.util.List;
import java.util.Map;


public interface GarageService {

    // Register garage details
    Garage registerGarage(String name, String imageURL, String address1,String address2,String city, String country, Integer postcode, String description, String uid) throws AuthException;

    // GET A GARAGE
    Garage getGarage(int id) throws NotFoundException;

    // GET ALL GARAGES
    List<Map<String, Object>> getGarages() throws NotFoundException;

    // UPDATE A GARAGE
    Garage updateGarage(int id, String name, String imageURL, String address1,String address2,String city, String country, int postcode, String description, String uid) throws InternalServerErrorException, NotFoundException;

    // DELETE A GARAGE
    void deleteGarage(int id) throws InternalServerErrorException, NotFoundException;

    // Get Total Number of Garages for a User
    int getCountByUserID(int user_id) throws NotFoundException;

    // GET ALL GARAGES
    List<Map<String, Object>> getGaragesByUID(String uid) throws NotFoundException;
}
