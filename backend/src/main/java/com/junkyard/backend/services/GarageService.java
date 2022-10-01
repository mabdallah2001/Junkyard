package com.junkyard.backend.services;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;

public interface GarageService {

    Garage registerGarage(String name, String imageURL, String address1,String address2,String city, String country, Integer postcode, String description, String uid) throws AuthException;

}
