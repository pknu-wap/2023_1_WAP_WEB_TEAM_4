package com.project.glog.dto;

import java.util.ArrayList;
import java.util.List;

public class ContentPreviewsResponse {
    private ContentDTOS craeted;
    private ContentDTOS likes;
    private ContentDTOS views;
    private ContentDTOS randoms;

    public ContentPreviewsResponse(ContentDTOS craeted, ContentDTOS likes, ContentDTOS views, ContentDTOS randoms) {
        this.craeted = craeted;
        this.likes = likes;
        this.views = views;
        this.randoms = randoms;
    }

    public ContentDTOS getCraeted() {
        return craeted;
    }

    public ContentDTOS getLikes() {
        return likes;
    }

    public ContentDTOS getViews() {
        return views;
    }

    public ContentDTOS getRandoms() {
        return randoms;
    }
}
