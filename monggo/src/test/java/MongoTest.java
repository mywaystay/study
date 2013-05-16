
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.mapreduce.GroupBy;
import org.springframework.data.mongodb.core.mapreduce.GroupByResults;
import org.springframework.data.mongodb.core.mapreduce.MapReduceOptions;
import org.springframework.data.mongodb.core.mapreduce.MapReduceResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Order;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.mongodb.Card;
import com.mongodb.Ebitem;
import com.mongodb.Para;
import com.mongodb.Person;
import com.mongodb.WriteResult;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class MongoTest {
	private static final Log log = LogFactory.getLog(MongoTest.class);

	@Autowired
	MongoOperations mongoOps;

	@Test
	public void testInsert() {
		Person p = new Person("Joe", 34);
		List list = new ArrayList();
		Card card = new Card();
		card.setMoney(1000);
		card.setName("招商银行");

		Card card2 = new Card();
		card2.setMoney(2000);
		card2.setName("交通银行");

		Card card3 = new Card();
		card3.setMoney(3000);
		card3.setName("工商银行");

		list.add(card);
		list.add(card2);
		list.add(card3);
		p.setCard(list);
		mongoOps.insert(p);
		log.info("Insert: " + p);
	}

	// There was implicit conversion using the MongoConverter between a String
	// and ObjectId as stored in the database and recognizing a convention of
	// the property "Id" name.
	@Test
	public void testFindById() {
		Person p1 = new Person("Joe", 34);
		p1.setPid("123");
		mongoOps.insert(p1);
		Person p = mongoOps.findById(p1.getPid(), Person.class);
		log.info("Found: " + p);
	}

	// db.person.find({"card":{"$all":["jiaotong","gongshang"]}})
	@Test
	public void testAll() {
		List<Person> list = mongoOps.find(Query.query(Criteria.where("card")
				.all("gongshang", "jiaotong")), Person.class);
		for (Person p : list) {
			log.info("Found: " + p);
		}
	}

	// {"$or":[{"name":{"$exsits":"true"}},{"name":{"$exsits":"false"}}]}
	@Test
	public void testorOperator() {
		List<Person> list = mongoOps.find(Query.query(new Criteria()
				.orOperator(Criteria.where("name").exists(true), Criteria
						.where("name").exists(false))), Person.class);
		for (Person p : list) {
			log.info("Found: " + p);
		}
	}

	// {"name":1,"age":1}
	@Test
	public void testAnd() {
		List<Person> list = mongoOps.find(
				Query.query(Criteria.where("name").exists(true).and("age")
						.exists(true)), Person.class);
		for (Person p : list) {
			log.info("Found: " + p);
		}
	}

	@Test
	// db.person.find({"card":{"$elemMatch":{"$in":["jiaotong"]}}});
	public void testelemMatchIn() {
		List<Person> list = mongoOps.find(
				Query.query(Criteria.where("card").elemMatch(
						new Criteria().in("zhaoshang"))), Person.class);
		for (Person p : list) {
			log.info("Found: " + p);
		}
	}

	// db.person.update({"name":"Joe","card.name":"招商银行"},{"$inc":{"card.$.money":1000}});
	@Test
	public void testUpdate() {
		WriteResult wr = mongoOps.updateMulti(
				Query.query(Criteria.where("name").in("Joe").and("card.name")
						.in("招商银行")), new Update().inc("card.$.money", 11000),
				Person.class);
		log.info(wr.getLastError());
	}

	@Test
	public void testUpdateAddtoSet() {
		Card card = new Card();
		card.setMoney(1000);
		card.setName("農業銀行");
		WriteResult wr = mongoOps.updateMulti(
				Query.query(Criteria.where("name").in("Joe").and("card.name")
						.in("招商银行")), new Update().addToSet("card", card),
				Person.class);
		log.info(wr.getLastError());
	}

	@Test
	public void testUpdateFirst() {
		mongoOps.updateFirst(Query.query(Criteria.where("name").is("Joe")),
				Update.update("age", 35), Person.class);
	}

	@Test
	public void testQuery() {
		Person p = mongoOps.findOne(
				Query.query(Criteria.where("name").is("Joe")), Person.class);
		log.info("Found: " + p);
		List<Person> people = mongoOps.findAll(Person.class);
		log.info("Number of people = : " + people.size());
	}

	@Test
	public void testFindAndModify() {
		Person p = mongoOps.findAndModify(Query.query(Criteria.where("name")
				.is("Joe")), Update.update("age", 125),
				new FindAndModifyOptions().returnNew(true).upsert(true),
				Person.class);
		log.info("Found: " + p);
	}

	public void testDelete() {
		Person p = new Person("Joe", 34);
		mongoOps.remove(p);
	}

	public void testdropCollection() {
		mongoOps.dropCollection(Person.class);
	}

	Random r = new Random();

	// db.test.find({ "map" : { "颜色" : "白色" , "内存" : "24G" , "地域" : "美国" ,
	// "操作系统" : "IOS"}}).exlain();
	@Test
	public void testquery() {
		long begin = System.currentTimeMillis();
		for (int i = 0; i < 10; i++) {
			List<Para> listp = new ArrayList<Para>();
			listp.add(new Para("颜色", list.get(r.nextInt(4))));
			listp.add(new Para("内存", list2.get(r.nextInt(4))));
			listp.add(new Para("操作系统", list3.get(r.nextInt(3))));
			listp.add(new Para("地域", list4.get(r.nextInt(3))));
			Query q = Query.query(Criteria.where("list").all(listp))
					.with(new Sort(new Sort.Order(Direction.ASC, "item_id")))
					.limit(20);
			List<Ebitem> Ebitemlist = mongoOps.find(q, Ebitem.class);
			log.info("doQuery:" + i);
		}
		long end = System.currentTimeMillis();
		log.info("time: " + (end - begin));
	}

	// db.ebitem.find({"list":{"$all":[{"key":"内存","value":"16G"},{"key":"颜色","value":"白色"}]}});
	@Test
	public void testInsertItem() {
		long begin = System.currentTimeMillis();
		for (int i = 0; i < 10; i++) {
			Ebitem item = new Ebitem();
			item.setItem_id(Long.valueOf(i));
			item.setItemName("itemName***" + i);
			List<Para> listp = new ArrayList<Para>();
			listp.add(new Para("颜色", list.get(r.nextInt(4))));
			listp.add(new Para("内存", list2.get(r.nextInt(4))));
			listp.add(new Para("操作系统", list3.get(r.nextInt(3))));
			listp.add(new Para("地域", list4.get(r.nextInt(3))));
			item.setList(listp);
			mongoOps.insert(item);
			log.info("Insert: " + item.getItem_id());
		}
		long end = System.currentTimeMillis();
		log.info("time: " + (end - begin));
	}
	
	@Test
	public void testFindAll() {
		long begin = System.currentTimeMillis();
		List<Person> list = mongoOps.findAll(Person.class);
		System.out.println(list.size());
	}

	//@Test
	public void mapreduce() {
		Map map2 = new HashMap();
		map2.put("color", "白色");
		String map = "function() {var arr=this.list;for(var i=0;i<arr.length;i++){if(arr[i].key=='颜色'&&arr[i].value==color){emit(1,{颜色:color,count:1})}}}";
		String reduece = "function (key, values) {var a={颜色:color,count:0};values.forEach(function(v){a.count+=v.count});return a;}";
		MapReduceResults<Ebitem> r1 = mongoOps.mapReduce("ebitem", map,
				reduece, MapReduceOptions.options().scopeVariables(map2)
						.outputCollection("mapreduce"), Ebitem.class);
		log.info("time: " + r1);
	}

	@Test
	public void group() {
		Map map2 = new HashMap();
		map2.put("color", "白色");
		Para p = new Para("颜色", "白色");
		GroupByResults<Ebitem> r1 = mongoOps.group(
				Criteria.where("list").is(p), "ebitem", GroupBy.key("list.1")
						.initialDocument("{count:0,sum:0}").reduceFunction("function(doc,prev){prev.count++;prev.sum+=doc._id}").finalizeFunction("function(prev){prev.sum=prev.sum/prev.count}"), Ebitem.class);
		log.info("time: "+r1.getRawResults());
	}

	@Before
	public void before() {
		list.add("黑色");
		list.add("白色");
		list.add("红色");
		list.add("绿色");
		list2.add("8G");
		list2.add("16G");
		list2.add("24G");
		list2.add("32G");
		list3.add("安卓");
		list3.add("IOS");
		list3.add("塞班");
		list4.add("中国");
		list4.add("日本");
		list4.add("美国");
	}

	List<String> list = new ArrayList<String>();

	List<String> list2 = new ArrayList<String>();

	List<String> list3 = new ArrayList<String>();

	List<String> list4 = new ArrayList<String>();

}
