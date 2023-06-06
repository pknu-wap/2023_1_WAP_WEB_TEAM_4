package com.project.glog.dto;

import com.project.glog.domain.Member;

public class ChangeAccountRequest {

    private Long loginedMemberId;
    private String pw;
    private String nickname;

    public Long getLoginedMemberId() {
        return loginedMemberId;
    }

    public String getPw() {
        return pw;
    }

    public String getNickname() {
        return nickname;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
