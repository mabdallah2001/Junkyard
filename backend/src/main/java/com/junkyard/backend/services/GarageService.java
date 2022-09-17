package com.junkyard.backend.services;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;

public interface GarageService {

    Garage registerGarage(String name, String location, String operatingHour, String details) throws AuthException;
}
