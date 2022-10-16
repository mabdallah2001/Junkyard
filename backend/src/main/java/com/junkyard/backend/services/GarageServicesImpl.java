package com.junkyard.backend.services;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.repositories.GarageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class GarageServicesImpl implements GarageService{

    @Autowired
    GarageRepository garageRepository;

    @Override
    public Garage registerGarage(String name, String imageURL, String address1, String address2, String city, String country, Integer postcode, String description, String uid) throws AuthException {
        Integer garageId = garageRepository.create(name, imageURL, address1,address2, city,country,postcode,description, uid);
        return garageRepository.findById(garageId);
    }

}
