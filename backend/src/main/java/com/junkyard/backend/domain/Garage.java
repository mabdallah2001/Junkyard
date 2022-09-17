package com.junkyard.backend.domain;

public class Garage {
    private Integer id;
    private String name;
    private String location;
    private String operatingHour;
    private String details;

    public Garage(Integer id, String name, String location, String operatingHour, String details){
        this.id=id;
        this.name=name;
        this.location =location;
        this.operatingHour=operatingHour;
        this.details=details;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setOperatingHour(String operatingHour) {
        this.operatingHour = operatingHour;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public String getOperatingHour() {
        return operatingHour;
    }

    public String getDetails() {
        return details;
    }


}
