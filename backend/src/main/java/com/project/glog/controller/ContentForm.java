package com.project.glog.controller;

import com.project.glog.domain.Content;
import com.project.glog.domain.Hashtag;

import java.util.List;

public class ContentForm {
    private Content content;
    private List<Hashtag> hashtags;

    public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }

    public List<Hashtag> getHashtags() {
        return hashtags;
    }

    public void setHashtags(List<Hashtag> hashtags) {
        this.hashtags = hashtags;
    }
}
