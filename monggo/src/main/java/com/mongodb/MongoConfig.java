package com.mongodb;

import java.net.UnknownHostException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;


@Configuration
public class MongoConfig {

	public @Bean
	MongoOperations abc() throws UnknownHostException {
		return new MongoTemplate(new SimpleMongoDbFactory(new Mongo("220.181.8.33"), "test"));
	}
	
}