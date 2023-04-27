package com.project.glog.controller;

import com.project.glog.domain.Content;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HelloController {

    @GetMapping("hello")
    public String hello(Model model){
        model.addAttribute("data", "hello!!");
        return "hello";
    }

    //뷰 리졸버 사용 x, http body에 직접 문자 내용을 반환함
    @GetMapping("hello-string")
    @ResponseBody
    public String hello(@RequestParam("name") String name){
        return "hello" + name;
    }

    //객체가 JSON으로 변환되어 반환된다.
    //이번 프로젝트에서 최종적으로 이 기능이 많이 사용될 것으로 예상된다.
    @GetMapping("hello-api")
    @ResponseBody
    public Map<String, Object> helloApi() {
        HashMap<String, Object> hashMap = new HashMap<>();

        List<Content> views = new ArrayList<>();
        List<Content> likes = new ArrayList<>();
        List<Content> latest = new ArrayList<>();
        List<Content> random = new ArrayList<>();

        Content content1 = new Content();
        content1.setTitle("content1");
        Content content2 = new Content();
        content2.setTitle("content2");
        Content content3 = new Content();
        content3.setTitle("content3");
        Content content4 = new Content();
        content4.setTitle("content4");

        views.add(content1);
        views.add(content2);

        likes.add(content3);
        likes.add(content2);

        latest.add(content1);
        latest.add(content3);

        random.add(content3);
        random.add(content4);

        hashMap.put("views", views);
        hashMap.put("likes", likes);
        hashMap.put("latest", latest);
        hashMap.put("random", random);

        return hashMap;
    }
    static class Hello {
        private String name;
        private int age;
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }
}
