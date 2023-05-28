package com.project.glog.dto;

public class ContentTitle{
    private Long contentId;
    private String title;

    public ContentTitle(Long contentId, String title) {
        this.contentId = contentId;
        this.title = title;
    }

    public Long getContentId() {
        return contentId;
    }

    public String getTitle() {
        return title;
    }
}
