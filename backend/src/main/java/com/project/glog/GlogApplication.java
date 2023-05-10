package com.project.glog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class GlogApplication {

	public static void main(String[] args) {
		SpringApplication.run(GlogApplication.class, args);
	}

}
