package com.junkyard.backend.services;

import java.sql.ResultSet;
import java.util.ArrayList;

import com.junkyard.backend.domain.Garage;

public class GarageService {


    public String addGarage(Garage garage, int UserID){
        int count;

        try{
            Statement stmt = c.createStatement();
            ResultSet rs = stmt.executeQuery( "SELECT COUNT(*) AS count FROM GARAGES;" );
            while ( rs.next() ) {
                count = rs.getInt("count");
            }

            garage.setId(count+1);
            String sql = "INSERT INTO GARAGES (ID,NAME,IMAGE_URL,ADDRESS1,ADDRESS2,CITY,COUNTRY,POSTCODE,DESCRIPTION, USERID) " + "VALUES ("+garage.getId()+"),('" +garage.getName()+"'),('" +garage.getImageURL()+"'),('" +garage.getAddress1()+"'),('" +garage.getAddress2()+"'),('" +garage.getCity()+"'),('" +garage.getCountry()+"'),(" +garage.getPostcode()+"),('" +garage.getDescription()+"'),("+ UserID +");";
            stmt.executeUpdate(sql);
        }
        catch (Exception e){
            return e.getMessage();
        }
        return "Garage successfully added";

    }

    public ArrayList<Garage> getYourGarages(int UserID){
	    
        ArrayList<Garage> garList = new ArrayList<Garage>();

        Garage gar = new Garage();
        Statement stmt = c.createStatement();
        ResultSet rs = stmt.executeQuery( "SELECT * FROM GARAGES where USERID = " + UserID + ";" );
        while ( rs.next() ) {


            gar.setId(rs.getInt("ID"));
            gar.setName(rs.getString("NAME"));
            gar.setImageURL(rs.getString("IMAGE_URL"));
            gar.setAddress1(rs.getString("ADDRESS1"));
            gar.setAddress2(rs.getString("ADDRESS2"));
            gar.setCity(rs.getString("CITY"));
            gar.setCountry(rs.getString("COUNTRY"));
            gar.setPostcode(rs.getInt("POSTCODE"));
            gar.setDescription(rs.getString("DESCRIPTION"));
            gar.setUserID(rs.getString("USERID"));


            garList.add(gar);
            
        }

        return garList;

    }

    public ArrayList<Garage> getAllGarages(){
	    
        ArrayList<Garage> garList = new ArrayList<Garage>();

        Garage gar = new Garage();
        Statement stmt = c.createStatement();
        ResultSet rs = stmt.executeQuery( "SELECT * FROM GARAGES;" );
        while ( rs.next() ) {


            gar.setId(rs.getInt("ID"));
            gar.setName(rs.getString("NAME"));
            gar.setImageURL(rs.getString("IMAGE_URL"));
            gar.setAddress1(rs.getString("ADDRESS1"));
            gar.setAddress2(rs.getString("ADDRESS2"));
            gar.setCity(rs.getString("CITY"));
            gar.setCountry(rs.getString("COUNTRY"));
            gar.setPostcode(rs.getInt("POSTCODE"));
            gar.setDescription(rs.getString("DESCRIPTION"));
            gar.(rs.getString("USERID"));


            garList.add(gar);
            
        }

        return garList;

    }


}
