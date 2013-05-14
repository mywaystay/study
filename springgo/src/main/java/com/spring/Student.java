package com.spring;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
//原型
@Scope("prototype")
public class Student {

	@Value("#{ T(java.lang.Math).random() * 100.0 }")
	private Integer id;
	@Value("#{ T(java.lang.System).getProperty('user.home')}")
	private String name;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
