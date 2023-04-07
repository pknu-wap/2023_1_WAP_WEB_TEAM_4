package com.project.glog.domain;

//DTO, VO
public class User {

    private Long id;
    private String login_id;
    private String login_pw;
    private String nickname;
    private String url;
    private String profile_image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin_id() {
        return login_id;
    }

    public void setLogin_id(String login_id) {
        this.login_id = login_id;
    }

    public String getLogin_pw() {
        return login_pw;
    }

    public void setLogin_pw(String login_pw) {
        this.login_pw = login_pw;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }


    public String getProfile_image() {
        return profile_image;
    }

    public void setProfile_image(String profile_image) {
        this.profile_image = profile_image;
    }
}
