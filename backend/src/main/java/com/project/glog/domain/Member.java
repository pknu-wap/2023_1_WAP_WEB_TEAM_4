package com.project.glog.domain;

import jakarta.persistence.*;

//DTO, VO
@Entity
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "member", cascade=CascadeType.ALL)
    private Blog blog;
    private String loginid;
    private String loginpw;
    private String nickname;
    private String profileImage;

    public Member(){}
    public Member(String loginid, String loginpw, String nickname, String profileImage) {
        this.loginid = loginid;
        this.loginpw = loginpw;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public String getLoginid() {
        return loginid;
    }

    public void setLoginid(String loginid) {
        this.loginid = loginid;
    }

    public String getLoginpw() {
        return loginpw;
    }

    public void setLoginpw(String loginpw) {
        this.loginpw = loginpw;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
