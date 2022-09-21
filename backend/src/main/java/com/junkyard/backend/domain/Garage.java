package com.junkyard.backend.domain;

import java.util.Objects;

public class Garage {
    private int id;
    private String name;
    private String imageURL;
    private String address1;
    private String address2;
    private String city;
    private String country;
    private int postcode;
    private String description;
    private int userID;

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }


    public Garage() {
    }


    public Garage(int id, String name, String imageURL, String address1, String address2, String city, String country, int postcode, String description) {
        this.id = id;
        this.name = name;
        this.imageURL = imageURL;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.country = country;
        this.postcode = postcode;
        this.description = description;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageURL() {
        return this.imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getAddress1() {
        return this.address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return this.address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getPostcode() {
        return this.postcode;
    }

    public void setPostcode(int postcode) {
        this.postcode = postcode;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Garage id(int id) {
        setId(id);
        return this;
    }

    public Garage name(String name) {
        setName(name);
        return this;
    }

    public Garage imageURL(String imageURL) {
        setImageURL(imageURL);
        return this;
    }

    public Garage address1(String address1) {
        setAddress1(address1);
        return this;
    }

    public Garage address2(String address2) {
        setAddress2(address2);
        return this;
    }

    public Garage city(String city) {
        setCity(city);
        return this;
    }

    public Garage country(String country) {
        setCountry(country);
        return this;
    }

    public Garage postcode(int postcode) {
        setPostcode(postcode);
        return this;
    }

    public Garage description(String description) {
        setDescription(description);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Garage)) {
            return false;
        }
        Garage garage = (Garage) o;
        return id == garage.id && Objects.equals(name, garage.name) && Objects.equals(imageURL, garage.imageURL) && Objects.equals(address1, garage.address1) && Objects.equals(address2, garage.address2) && Objects.equals(city, garage.city) && Objects.equals(country, garage.country) && postcode == garage.postcode && Objects.equals(description, garage.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, imageURL, address1, address2, city, country, postcode, description);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", imageURL='" + getImageURL() + "'" +
            ", address1='" + getAddress1() + "'" +
            ", address2='" + getAddress2() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            ", postcode='" + getPostcode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }


}