package com.junkyard.backend.domain;


public class Comment {
    private Integer id;
    private String contents;
    private Integer userID;
    private Integer garageID;

    public Comment(Integer id, String contents, Integer userID, Integer garageID){
        this.id=id;
        this.garageID=garageID;
        this.contents=contents;
        this.userID=userID;
    }

    public Integer getCommentID() {
        return id;
    }

    public String getContents() {
        return contents;
    }

    public Integer getUserID() {
        return userID;
    }

    public Integer getGarageID() {
        return garageID;
    }

    public void setCommentID(Integer commentID) {
        this.id = commentID;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public void setGarageID(Integer garageID) {
        this.garageID = garageID;
    }


}
