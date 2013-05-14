package com.mongodb;


public class Para {
	private String key;
	private String value;

	public String getKey() {
		return key;
	}

	public Para(String key, String value) {
		super();
		this.key = key;
		this.value = value;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
