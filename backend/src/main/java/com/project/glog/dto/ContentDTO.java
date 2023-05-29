package com.project.glog.dto;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import com.project.glog.domain.Content;
import com.project.glog.domain.Member;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

public class ContentDTO {
    private Long contentId;
    private String title;

    private String text;

    private String image;

    private Integer likes;

    private Integer views;
    private Integer isPrivate;
    private String hashtags;

    public ContentDTO(Content content){
        this.contentId = content.getId();
        this.title = content.getTitle();
        this.text = content.getText();
        this.image = content.getImage();
        this.likes = content.getLikes();
        this.views = content.getViews();
        this.isPrivate = content.getIsPrivate();
        this.hashtags = content.getHashtags();
    }

    public Long getContentId() {
        return contentId;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public String getImage() {
        return image;
    }

    public Integer getLikes() {
        return likes;
    }

    public Integer getViews() {
        return views;
    }

    public Integer getIsPrivate() {
        return isPrivate;
    }

    public String getHashtags() {
        return hashtags;
    }
}
