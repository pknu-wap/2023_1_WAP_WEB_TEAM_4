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
    private String profile_image;


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

    public void setLoginid(String login_id) {
        this.loginid = login_id;
    }

    public String getLoginpw() {
        return loginpw;
    }

    public void setLoginpw(String login_pw) {
        this.loginpw = login_pw;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfile_image() {
        return profile_image;
    }

    public void setProfile_image(String profile_image) {
        this.profile_image = profile_image;
    }
}
