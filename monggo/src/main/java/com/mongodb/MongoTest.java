package com.mongodb;


import static org.springframework.data.mongodb.core.query.Criteria.where;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.mongodb.Mongo;

public class MongoTest {

	private static final Log log = LogFactory.getLog(MongoTest.class);

	public static void main(String[] args) throws Exception {
		ApplicationContext a = new FileSystemXmlApplicationContext("classpath:spring.xml");
		MongoOperations mongoOps = a.getBean(MongoOperations.class);
		Person p = new Person("Joe", 34);
		// Insert is used to initially store the object into the database.
		mongoOps.insert(p);
		log.info("Insert: " + p);
		// Find
		log.info("Found: " + p);
		// Update
		mongoOps.updateFirst(Query.query(Criteria.where("name").is("Joe")),
				Update.update("age", 35), Person.class);
		p = mongoOps.findOne(Query.query(Criteria.where("name").is("Joe")),
				Person.class);
		log.info("Updated: " + p);
		// Delete
		//mongoOps.remove(p);
		// Check that deletion worked
		List<Person> people = mongoOps.findAll(Person.class);
		log.info("Number of people = : " + people.size());
		//mongoOps.dropCollection(Person.class);
	}
}