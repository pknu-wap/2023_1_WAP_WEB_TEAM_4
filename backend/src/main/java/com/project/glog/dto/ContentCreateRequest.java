package com.project.glog.dto;

import com.project.glog.domain.Content;

public class ContentCreateRequest {
    private String title;
    private String text;
    private String image;
    private Integer isPrivate;
    private Long categoryId;
    private String hashtags;

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public String getImage() {
        return image;
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
