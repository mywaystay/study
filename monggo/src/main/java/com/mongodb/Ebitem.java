package com.mongodb;


import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;

public class Ebitem {
	@Id
	private Long item_id;
	private String itemName;
	private List<Para> list;

	public List<Para> getList() {
		return list;
	}

	public void setList(List<Para> list) {
		this.list = list;
	}

	public Long getItem_id() {
		return item_id;
	}

	public void setItem_id(Long item_id) {
		this.item_id = item_id;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

}
