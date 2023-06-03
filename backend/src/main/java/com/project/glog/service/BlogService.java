package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Member;
import com.project.glog.dto.AwsS3;
import com.project.glog.dto.BlogDTO;
import com.project.glog.dto.ChangeAccountRequest;
import com.project.glog.dto.ChangeBlogSettingRequest;
import com.project.glog.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public class BlogService {
    @Autowired
    private AwsS3Service awsS3Service;
    private final BlogRepository blogRepository;
    private final MemberService memberService;
    public BlogService(BlogRepository blogRepository,
                       MemberService memberService
                        )
    {
        this.blogRepository=blogRepository;
        this.memberService=memberService;
    }

    public Blog findByMemberId(Long uid){
        Optional<Blog> result = blogRepository.findByMemberId(uid);
        if(!result.isPresent()){
            return null;
        }
        return result.get();
    }

    public Blog findById(Long bid){
        return blogRepository.findById(bid).get();
    }
    public BlogDTO getMypage(Long uid){
        return new BlogDTO(blogRepository.findByMemberId(uid).get());
    }

    public BlogDTO changeAccount(Long uid, ChangeAccountRequest changeAccountRequest) {

        Member member = memberService.searchMemberById(uid);
        if(!changeAccountRequest.getNickname().equals("")){
            member.setNickname(changeAccountRequest.getNickname());
        }
        if(!changeAccountRequest.getPw().equals("")){
            member.setLoginpw(changeAccountRequest.getPw());
        }
        Long result = memberService.update(member);
        if (result == -1L) {
            return null;
        }
        else{
            return new BlogDTO(findByMemberId(uid));
        }
    }


    public BlogDTO changeBlogSetting(Long uid, ChangeBlogSettingRequest changeBlogSettingRequest) {
        Blog blog = blogRepository.findByMemberId(uid).get();
        if(!changeBlogSettingRequest.getBlogName().equals("")){
            blog.setBlogName(changeBlogSettingRequest.getBlogName());
        }
        if(!changeBlogSettingRequest.getIntroduction().equals("")){
            blog.setIntroduction(changeBlogSettingRequest.getIntroduction());
        }
        blogRepository.save(blog);
        return new BlogDTO(blog);
    }

    public BlogDTO changeBlogSkin(Long uid, Integer blogSkin) {
        Blog blog = blogRepository.findByMemberId(uid).get();
        blog.setSkin(blogSkin);
        blogRepository.save(blog);
        return new BlogDTO(blog);
    }

    public BlogDTO changeProfileImage(Long uid, MultipartFile multipartFile) throws IOException {
        AwsS3 awsS3 = awsS3Service.upload(multipartFile, "profile");

        Member member = blogRepository.findByMemberId(uid).get().getMember();
        member.setProfileImage(awsS3.getPath());
        memberService.update(member);

        return new BlogDTO(member.getBlog());
    }
}
