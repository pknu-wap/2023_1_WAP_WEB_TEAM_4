package com.project.glog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
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
    public Map<String, Object> helloApi(@RequestParam("name") String name, @RequestParam("title") String title) {
        HashMap<String, Object> hashMap = new HashMap<>();

        Hello hello = new Hello();
        hello.setName(name);
        hello.setAge(13);
        hashMap.put("Hello", hello);

        Content content = new Content();
        content.setTitle(title);
        content.setContent("api 사용");
        hashMap.put("Content", content);

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

    static class Content{
        private String title;
        private String content;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}
