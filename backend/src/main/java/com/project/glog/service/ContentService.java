package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import com.project.glog.domain.Content;
import com.project.glog.domain.Member;
import com.project.glog.dto.*;
import com.project.glog.repository.ContentRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ContentService {
    private final ContentRepository contentRepository;
    private final CategoryService categoryService;
    private final MemberService memberService;
    private final BlogService blogService;

    public ContentService(ContentRepository contentRepository,
                          CategoryService categoryService,
                          MemberService memberService,
                          BlogService blogService){
        this.contentRepository = contentRepository;
        this.categoryService = categoryService;
        this.memberService = memberService;
        this.blogService = blogService;
    }

    public Content create(ContentCreateRequest contentCreateRequest, Long uid){
        //카테고리는 이미 저장되어 있어서 요청으로 들어올 것이므로 글만 저장하면 된다.
        //content는 다른 엔티티를 참조할 뿐 다른 엔티티가 content에 대한 영속성을 갖지 않는다.
        //따라서, content값만 잘 저장해주면 된다.

        //컨텐츠를 생성한다.
        Content content = new Content();

        //컨텐츠의 필요 속성을 저장한다.
        content.setTitle(contentCreateRequest.getTitle());
        content.setText(contentCreateRequest.getText());
        content.setImage(contentCreateRequest.getImage());
        content.setIsPrivate(contentCreateRequest.getIsPrivate());
        content.setHashtags(contentCreateRequest.getHashtags());
        content.setLikes(0);
        content.setViews(0);

        //멤버와 카테고리, 블로그에 대한 정보를 가져 온다.
        Member member = memberService.searchMemberById(uid);
        Category category = categoryService.findById(contentCreateRequest.getCategoryId());
        Blog blog = blogService.findById(member.getBlog().getId());

        //컨텐츠 객체에 참조 객체를 저장한다.
        content.setMember(member);
        content.setCategory(category);
        content.setBlog(blog);

        //컨텐츠를 저장한다.
        return contentRepository.save(content);
    }

    public void delete(Content content){
        contentRepository.delete(content);
    }

    public Content findById(Long cid){
        return contentRepository.findById(cid).get();
    }

    public List<Content> searchContentsByString(String string){
        return contentRepository.findAllByText(string);
    }
    public List<Content> searchContentsById(List<Long> cids){
        List<Content> contents = new ArrayList<>();
        for(Long cid : cids){
            contents.add(contentRepository.findById(cid).get());
        }
        return contents;
    }

    public List<Content> findAllByCreated() {
        return contentRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Content> findAllByLikes() {
        return contentRepository.findAllByOrderByLikesDesc();
    }

    public List<Content> findAllByViews() {
        return contentRepository.findAllByOrderByViewsDesc();
    }

    public List<Content> findAllByRandom() {
        List<Content> contents = contentRepository.findAll();
        Collections.shuffle(contents);
        return contents;
    }

    public List<Content> getAllContentsByBlog(Blog blog){
        return contentRepository.findAllByBlogId(blog.getId());
    }

    public ContentReadResponse readContent(Long cid){
        //ContentDTO
        Content content = contentRepository.findById(cid).get();
        ContentDTO contentDTO = new ContentDTO(content);

        //List<CategorySidebar>
        //List<Category> 해당 블로그의 카테고리 리스트를 불러온다.
        //카테고리 리스트를 순회하면서 해당 카테고리마다 List<ContentTitle>을 불러오고
        //List<CategorySidebar>에 채워 넣는다.
        List<CategorySidebar> categorySidebars = new ArrayList<>();
        List<Category> categories = categoryService.findAllByBlogId(content.getBlog().getId());
        for(Category category : categories){
            List<Content> contents = contentRepository.findAllByCategoryId(category.getId());
            categorySidebars.add(new CategorySidebar(category, contents));
        }

        //MemberDTO
        Member member = content.getMember();
        MemberDTO memberDTO = new MemberDTO(member.getNickname(), member.getProfile_image(), member.getBlog().getBlog_url());

        return new ContentReadResponse(contentDTO, categorySidebars, memberDTO);
    }
}
