package com.junkyard.backend.repositories;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.domain.User;
import com.junkyard.backend.exceptions.AuthException;

public interface GarageRepository {
    Integer create(String name, String location, String operatingHour, String details) throws AuthException;

    Garage findById(Integer garageId);

}
