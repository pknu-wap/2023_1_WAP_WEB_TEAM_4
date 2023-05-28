package com.project.glog.dto;

public class MemberDTO {
    String nickname;
    String profile_image;
    String blogUrl;

    public MemberDTO(String nickname, String profile_image, String blogUrl) {
        this.nickname = nickname;
        this.profile_image = profile_image;
        this.blogUrl = blogUrl;
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfile_image() {
        return profile_image;
    }

    public String getBlogUrl() {
        return blogUrl;
    }
}
