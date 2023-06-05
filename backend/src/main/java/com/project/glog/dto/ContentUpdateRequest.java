package com.project.glog.dto;

public class ContentUpdateRequest {
    private Long contentId;
    private String title;
    private String text;
    private Integer isPrivate;
    private Long categoryId;
    private String hashtags;

    public Long getContentId() {
        return contentId;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public Integer getIsPrivate() {
        return isPrivate;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getHashtags() {
        return hashtags;
    }
}
