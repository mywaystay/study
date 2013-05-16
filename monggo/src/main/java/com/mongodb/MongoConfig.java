package com.mongodb;

import java.net.UnknownHostException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

@Configuration
public class MongoConfig {
	private @Value("#{propertiesReader.mongoip}")
	String jdbcUrl;

	public @Bean
	MongoOperations abc() throws UnknownHostException {
		return new MongoTemplate(new SimpleMongoDbFactory(new Mongo(
				jdbcUrl), "test"));
	}

}