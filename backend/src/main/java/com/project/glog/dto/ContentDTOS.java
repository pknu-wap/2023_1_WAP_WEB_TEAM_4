package com.project.glog.dto;

import com.project.glog.domain.Content;

import java.util.ArrayList;
import java.util.List;

public class ContentDTOS {
    private List<ContentDTO> contentDTOS = new ArrayList<>();

    public ContentDTOS(){
    }
    public ContentDTOS(List<Content> contents) {
        for(Content content : contents){
            contentDTOS.add(new ContentDTO(content));
        }
    }

    public List<ContentDTO> getContentDTOS() {
        return contentDTOS;
    }
}
