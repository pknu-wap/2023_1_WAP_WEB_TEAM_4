package com.project.glog.service;

import com.project.glog.domain.Blog;
import com.project.glog.domain.Category;
import com.project.glog.domain.Content;
import com.project.glog.domain.Member;
import com.project.glog.dto.*;
import com.project.glog.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class ContentService {
    @Autowired
    private AwsS3Service awsS3Service;
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

    public Content create(MultipartFile multipartFile, ContentCreateRequest contentCreateRequest, Long uid) throws IOException {
        //카테고리는 이미 저장되어 있어서 요청으로 들어올 것이므로 글만 저장하면 된다.
        //content는 다른 엔티티를 참조할 뿐 다른 엔티티가 content에 대한 영속성을 갖지 않는다.
        //따라서, content값만 잘 저장해주면 된다.

        //컨텐츠를 생성한다.
        Content content = new Content();

        //컨텐츠의 필요 속성을 저장한다.
        content.setTitle(contentCreateRequest.getTitle());
        content.setText(contentCreateRequest.getText());
        content.setIsPrivate(contentCreateRequest.getIsPrivate());
        content.setHashtags(contentCreateRequest.getHashtags());
        content.setLikes(0);
        content.setViews(0);

        //이미지를 저장한다.
        AwsS3 awsS3 = awsS3Service.upload(multipartFile, "thumbnail");
        content.setImage(awsS3.getPath());

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

    public ContentDTOS getContentsByString(String string){
        List<Content> contents = contentRepository.findAllByText(string);
        return new ContentDTOS(contents);
    }

    public ContentDTOS getContentsByHashtag(String hashtag){
        List<Content> contents = contentRepository.findAllByHashtag(hashtag);
        return new ContentDTOS(contents);
    }

    public ContentReadResponse readContent(Long cid){
        //ContentDTO
        Content content = contentRepository.findById(cid).get();
        content.setViews(content.getViews()+1);
        contentRepository.save(content);
        ContentDTO contentDTO = new ContentDTO(content);

        List<CategorySidebar> categorySidebars = getCategorySidebars(content.getBlog().getId());

        return new ContentReadResponse(contentDTO, categorySidebars);
    }

    public List<CategorySidebar> getCategorySidebars(Long bid){
        //List<CategorySidebar>
        //List<Category> 해당 블로그의 카테고리 리스트를 불러온다.
        //카테고리 리스트를 순회하면서 해당 카테고리마다 List<ContentTitle>을 불러오고
        //List<CategorySidebar>에 채워 넣는다.
        List<CategorySidebar> categorySidebars = new ArrayList<>();
        List<Category> categories = categoryService.findAllByBlogId(bid);
        for(Category category : categories){
            List<Content> contents = contentRepository.findAllByCategoryId(category.getId());
            categorySidebars.add(new CategorySidebar(category, contents));
        }
        return categorySidebars;
    }

    public ContentPreviewsResponse getPreviews(Long index){
        ContentDTOS created = getCreatedPreviews(index*8);
        ContentDTOS views = getViewsPreviews(index*8);
        ContentDTOS likes = getLikesPreviews(index*8);
        ContentDTOS random = getRandomPreviews(index*8);

        return new ContentPreviewsResponse(created, likes, views, random);
    }

    public ContentDTOS getCreatedPreviews(Long cursor){
        List<Content> allCratedContents = contentRepository.findAllByOrderByIdDesc();
        List<Content> createdContents = allCratedContents.stream()
                                                            .skip(cursor)
                                                            .limit(8)
                                                            .collect(Collectors.toList());
        return new ContentDTOS(createdContents);
    }
    public ContentDTOS getViewsPreviews(Long cursor){
        List<Content> allViewsContents = contentRepository.findAllByOrderByViewsDesc();
        List<Content> viewsContents = allViewsContents.stream()
                                                        .skip(cursor)
                                                        .limit(8)
                                                        .collect(Collectors.toList());
        return new ContentDTOS(viewsContents);
    }
    public ContentDTOS getLikesPreviews(Long cursor){
        List<Content> allLikesContents = contentRepository.findAllByOrderByLikesDesc();
        List<Content> likesContents = allLikesContents.stream()
                                                        .skip(cursor)
                                                        .limit(8)
                                                        .collect(Collectors.toList());
        return new ContentDTOS(likesContents);
    }
    public ContentDTOS getRandomPreviews(Long cursor){
        List<Content> allRandomContents = contentRepository.findAll();
        Collections.shuffle(allRandomContents);
        List<Content> randomContents = allRandomContents.stream()
                                                        .skip(cursor)
                                                        .limit(8)
                                                        .collect(Collectors.toList());
        return new ContentDTOS(randomContents);
    }

    public void plusLikes(Long cid){
        Content content = contentRepository.findById(cid).get();
        content.setLikes(content.getLikes()+1);
        contentRepository.save(content);
    }

    public ContentDTOS getMorePreviews(String kind, Long index){
        ContentDTOS contents;
        if(kind.equals("created")){
            contents = getCreatedPreviews(index*8);
        }
        else if(kind.equals("views")){
            contents = getViewsPreviews(index*8);
        }
        else if(kind.equals("likes")){
            contents = getLikesPreviews(index*8);
        }
        else if(kind.equals("random")){
            contents = getRandomPreviews(index*8);
        }
        else{
            contents=null;
        }
        return contents;
    }

    public Content update(MultipartFile multipartFile, ContentUpdateRequest contentUpdateRequest, Long uid) throws IOException{
        //컨텐츠를 생성한다.
        Content content = contentRepository.findById(contentUpdateRequest.getContentId()).get();

        //컨텐츠의 필요 속성을 저장한다.
        content.setTitle(contentUpdateRequest.getTitle());
        content.setText(contentUpdateRequest.getText());
        content.setIsPrivate(contentUpdateRequest.getIsPrivate());
        content.setHashtags(contentUpdateRequest.getHashtags());


        //이미지를 저장한다.
        AwsS3 awsS3 = awsS3Service.upload(multipartFile, "thumbnail");
        content.setImage(awsS3.getPath());

        contentRepository.save(content);
        return content;
    }
}
