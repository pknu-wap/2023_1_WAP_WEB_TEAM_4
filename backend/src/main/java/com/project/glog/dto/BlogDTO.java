package com.project.glog.dto;

import com.project.glog.domain.Blog;
import org.springframework.beans.factory.annotation.Value;

public class BlogDTO {
    private Long blogId;
    private String blogName;
    private Integer skin;
    private Long memberId;
    private String nickname;
    private String profileImage;
    private String introduction;

    public BlogDTO(){}

    public BlogDTO(Long blogId, String blogName, Integer skin, Long memberId, String nickname, String profileImage, String introduction) {
        this.blogId = blogId;
        this.blogName = blogName;
        this.skin = skin;
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.introduction = introduction;
    }

    public BlogDTO(Blog blog){
        this.blogId = blog.getId();
        this.blogName = blog.getBlogName();
        this.skin = blog.getSkin();
        this.memberId = blog.getMember().getId();
        this.nickname = blog.getMember().getNickname();
        this.introduction = blog.getIntroduction();
        this.profileImage = blog.getMember().getProfileImage();
    }

    public Long getBlogId() {
        return blogId;
    }

    public String getBlogName() {
        return blogName;
    }

    public Integer getSkin() {
        return skin;
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getIntroduction() {
        return introduction;
    }
}
