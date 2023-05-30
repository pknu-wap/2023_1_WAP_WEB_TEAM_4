package com.project.glog.dto;

import com.project.glog.domain.Member;

public class ChangeAccountRequest {
    private String pw;
    private String nickname;

    public ChangeAccountRequest(){}
    public ChangeAccountRequest(Member member) {
        this.pw = member.getLoginpw();
        this.nickname = member.getNickname();
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
