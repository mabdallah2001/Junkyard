package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;

public interface GarageRepository {
    Integer create(String name, String imageURL, String address1,String address2,String city, String country, Integer postcode, String description, String uid) throws AuthException;

    Garage findById(Integer garageId);

}
