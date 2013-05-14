package com.spring;

import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
//原型
@Scope("prototype")
public class Teacher {
	//调用组建中的student的ID 应该是调用了容器的getbean方法
    //所以如所student是原型 teacherid 会和stu id 不一致
	@Value("#{student.id}")
	private Integer id;

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
