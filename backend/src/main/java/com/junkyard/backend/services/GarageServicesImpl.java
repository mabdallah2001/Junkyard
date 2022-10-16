package com.junkyard.backend.services;

import com.junkyard.backend.domain.Garage;
import com.junkyard.backend.exceptions.AuthException;
import com.junkyard.backend.exceptions.InternalServerErrorException;
import com.junkyard.backend.exceptions.NotFoundException;
import com.junkyard.backend.repositories.GarageRepository;

import java.util.List;
import java.util.Map;

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

    @Override
    public Garage getGarage(int id) throws NotFoundException {
        return garageRepository.findById(id);
    }

    @Override
    public List<Map<String, Object>> getGarages() throws NotFoundException {
        return garageRepository.getGarages();
       
    }

    @Override
    public Garage updateGarage(int id, String name, String imageURL, String address1, String address2, String city,
            String country, int postcode, String description, String uid)
            throws InternalServerErrorException, NotFoundException {
        
        Integer garId = garageRepository.updateGarage(id, name, imageURL, address1, address2, city, country, postcode, description, uid);
        return garageRepository.findById(garId);
    }

    @Override
    public void deleteGarage(int id) throws InternalServerErrorException, NotFoundException {
        garageRepository.deleteGarage(id);

        
    }

    @Override
    public int getCountByUserID(int user_id) throws NotFoundException {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public List<Map<String, Object>> getGaragesByUID(String uid) throws NotFoundException {
        
        return garageRepository.getGaragesByUID(uid);
    }

}
