package com.project.glog.dto;

import com.project.glog.domain.Content;
import org.springframework.web.multipart.MultipartFile;

public class ContentCreateRequest {
    private Long loginedMemberId;
    private String title;
    private String text;
    private Integer isPrivate;
    private Long categoryId;
    private String hashtags;

    public ContentCreateRequest(Long loginedMemberId, String title, String text, Integer isPrivate, Long categoryId, String hashtags) {
        this.loginedMemberId = loginedMemberId;
        this.title = title;
        this.text = text;
        this.isPrivate = isPrivate;
        this.categoryId = categoryId;
        this.hashtags = hashtags;
    }

    public Long getLoginedMemberId() {
        return loginedMemberId;
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
