package com.junkyard.backend.domain;


public class Comment {
    private Integer id;
    private String contents;
    private String uid;
    private Integer garageID;

    public Comment(Integer id, String contents, String uid, Integer garageID){
        this.id=id;
        this.garageID=garageID;
        this.contents=contents;
        this.uid=uid;
    }

    public Integer getCommentID() {
        return id;
    }

    public String getContents() {
        return contents;
    }

    public String getUid() {
        return uid;
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

    public void setUid(String uid) {
        this.uid = uid;
    }

    public void setGarageID(Integer garageID) {
        this.garageID = garageID;
    }


}
