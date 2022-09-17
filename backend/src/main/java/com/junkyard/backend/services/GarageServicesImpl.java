package com.junkyard.backend.services;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.repositories.GarageRepository;
import com.junkyard.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class GarageServicesImpl implements GarageService{

    @Autowired
    GarageRepository garageRepository;

    @Override
    public Garage registerGarage(String name, String location, String operatingHour, String details) throws AuthException {
        Integer userId = garageRepository.create(name, location, operatingHour, details);
        return garageRepository.findById(userId);
    }
}
