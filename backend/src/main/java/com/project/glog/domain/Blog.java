package com.project.glog.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Blog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Member member;
    private String blog_name;
    private String blogUrl;
    private String introduction;

    public Blog(){}

    public Blog(String blog_name, String blogUrl, String introduction) {
        this.blog_name = blog_name;
        this.blogUrl = blogUrl;
        this.introduction = introduction;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public String getBlog_name() {
        return blog_name;
    }

    public void setBlog_name(String blog_name) {
        this.blog_name = blog_name;
    }

    public String getBlog_url() {
        return blogUrl;
    }

    public void setBlog_url(String blog_url) {
        this.blogUrl = blog_url;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }
}
