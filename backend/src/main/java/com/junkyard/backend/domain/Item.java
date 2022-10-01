package com.junkyard.backend.domain;

import java.math.BigDecimal;

public class Item {
    private Integer id;
    private String name;
    private int quantity;
    private BigDecimal imageURL;
    private String description;
    private double price;
    private String uid;

    public Item(Integer id, String name, int quantity, BigDecimal imageURL, String description, double price, String uid) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
        this.uid = uid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getImageURL() {
        return imageURL;
    }

    public void setImageURL(BigDecimal imageURL) {
        this.imageURL = imageURL;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
