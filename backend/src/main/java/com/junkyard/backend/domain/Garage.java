package com.junkyard.backend.domain;

public class Garage {
    private Integer id;
    private String name;
    private String imageURL;
    private String address1;
    private String address2;
    private String city;
    private String country;
    private int postcode;
    private String description;
    private int userID;

    public Garage(int id, String name, String imageURL, String address1, String address2, String city, String country, int postcode, String description, int userID) {
        this.id = id;
        this.name = name;
        this.imageURL = imageURL;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.country = country;
        this.postcode = postcode;
        this.description = description;
        this.userID = userID;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setPostcode(int postcode) {
        this.postcode = postcode;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }



    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getImageURL() {
        return imageURL;
    }

    public String getAddress1() {
        return address1;
    }

    public String getAddress2() {
        return address2;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public int getPostcode() {
        return postcode;
    }

    public String getDescription() {
        return description;
    }

    public int getUserID() {
        return userID;
    }
}
