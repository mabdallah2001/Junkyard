package com.junkyard.backend.domain;

public class User {
    private String uid;
    private String email;
    private int type;

    public User(String uid, String email, int type) {
        this.uid = uid;
        this.email = email;
        this.type = type;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
