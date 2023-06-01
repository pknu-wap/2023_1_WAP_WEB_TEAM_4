package com.project.glog.dto;

import com.project.glog.domain.Member;

public class MemberDTO {
    Long memberId;
    String nickname;
    String profileImage;
    String blogUrl;

    public MemberDTO(Member member) {
        this.memberId = member.getId();
        this.nickname = member.getNickname();
        this.profileImage = member.getProfileImage();
        this.blogUrl = member.getBlog().getBlogUrl();
    }

    public String getNickname() {
        return nickname;
    }

    public String getBlogUrl() {
        return blogUrl;
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getProfileImage() {
        return profileImage;
    }
}
