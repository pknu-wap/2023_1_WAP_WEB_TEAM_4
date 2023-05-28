package com.project.glog.dto;

import java.util.List;
import java.util.Map;

public class ContentReadResponse {
    //컨텐츠 대한 정보
    ContentDTO contentDTO;

    //사이드바
    List<CategorySidebar> sidebar;

    //블로그
    MemberDTO memberDTO;

    public ContentReadResponse(ContentDTO contentDTO, List<CategorySidebar> sidebar, MemberDTO memberDTO) {
        this.contentDTO = contentDTO;
        this.sidebar = sidebar;
        this.memberDTO = memberDTO;
    }

    public ContentDTO getContentDTO() {
        return contentDTO;
    }

    public List<CategorySidebar> getSidebar() {
        return sidebar;
    }

    public MemberDTO getMemberDTO() {
        return memberDTO;
    }
}




