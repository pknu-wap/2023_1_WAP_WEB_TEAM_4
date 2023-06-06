package com.project.glog.dto;

public class ChangeBlogSettingRequest {
    private Long loginedMemberId;
    private String blogName;
    private String introduction;

    public Long getLoginedMemberId() {
        return loginedMemberId;
    }

    public String getBlogName() {
        return blogName;
    }

    public String getIntroduction() {
        return introduction;
    }
}
