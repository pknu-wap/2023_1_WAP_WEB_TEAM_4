package com.project.glog.dto;

import com.project.glog.domain.Member;

public class MemberDTO {
    String nickname;
    String profile_image;
    String blogUrl;

    public MemberDTO(String nickname, String profile_image, String blogUrl) {
        this.nickname = nickname;
        this.profile_image = profile_image;
        this.blogUrl = blogUrl;
    }

    public MemberDTO(Member member) {
        this.nickname = member.getNickname();
        this.profile_image = member.getProfile_image();
        this.blogUrl = member.getBlog().getBlog_url();
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
