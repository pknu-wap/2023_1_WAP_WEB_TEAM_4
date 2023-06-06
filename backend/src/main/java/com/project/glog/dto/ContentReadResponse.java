package com.project.glog.dto;

import java.util.List;
import java.util.Map;

public class ContentReadResponse {
    //컨텐츠 대한 정보
    ContentDTO contentDTO;

    //사이드바
    List<CategorySidebar> sidebar;


    public ContentReadResponse(ContentDTO contentDTO, List<CategorySidebar> sidebar) {
        this.contentDTO = contentDTO;
        this.sidebar = sidebar;
    }

    public ContentDTO getContentDTO() {
        return contentDTO;
    }

    public List<CategorySidebar> getSidebar() {
        return sidebar;
    }

}




