
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.common.FastByIDMap;
import org.apache.mahout.cf.taste.impl.model.GenericDataModel;
import org.apache.mahout.cf.taste.impl.model.GenericItemPreferenceArray;
import org.apache.mahout.cf.taste.impl.model.GenericUserPreferenceArray;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.model.PreferenceArray;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;
import org.junit.Before;
import org.junit.Test;
import org.mortbay.jetty.Handler;
import org.mortbay.jetty.Server;
import org.mortbay.jetty.handler.DefaultHandler;
import org.mortbay.jetty.servlet.ServletHandler;
import org.mortbay.xml.XmlConfiguration;
import org.xml.sax.SAXException;

import com.mahout.Bucket;
import com.mahout.MahoutAction;

public class MahoutTest {
	private List<Integer> userlist;
	private List<Integer> contentlist;

	@Before
	public void before() {
		userlist = new ArrayList();
		int i = 0;
		do {
			userlist.add(i);
			i++;
		} while (i < 10);
		contentlist = new ArrayList();
		i = 100;
		do {
			contentlist.add(i);
			i++;
		} while (i < 110);

	}

	@Test
	public void test1() throws TasteException {
		FastByIDMap<PreferenceArray> preferences = new FastByIDMap<PreferenceArray>();
		PreferenceArray prefsForUser0 = new GenericUserPreferenceArray(100);
		prefsForUser0.setUserID(0, 0);
		prefsForUser0.setItemID(0, 0);
		prefsForUser0.setValue(0, 1f);
		prefsForUser0.setItemID(1, 1);
		prefsForUser0.setValue(1, 1f);
		prefsForUser0.setItemID(2, 2);
		prefsForUser0.setValue(2, 1);
		prefsForUser0.setItemID(3, 3);
		prefsForUser0.setValue(3, 2);

		PreferenceArray prefsForUser1 = new GenericUserPreferenceArray(10);
		prefsForUser1.setUserID(0, 1);
		prefsForUser1.setItemID(0, 0);
		prefsForUser1.setValue(0, 1f);
		prefsForUser1.setItemID(1, 1);
		prefsForUser1.setValue(1, 1f);
		prefsForUser1.setItemID(2, 2);
		prefsForUser1.setValue(2, 2);
		prefsForUser1.setItemID(3, 3);
		prefsForUser1.setValue(3, 0);

		PreferenceArray prefsForUser2 = new GenericUserPreferenceArray(10);
		prefsForUser2.setUserID(0, 2);
		prefsForUser2.setItemID(0, 0);
		prefsForUser2.setValue(0, 1f);
		prefsForUser2.setItemID(1, 2);
		prefsForUser2.setValue(1, 1);
		// 0 1 2 3
		// 0 1 1 1 2
		// 1 1 1 2 0
		// 2 1 1

		preferences.put(0, prefsForUser0);
		preferences.put(1, prefsForUser1);
		preferences.put(2, prefsForUser2);

		DataModel model = new GenericDataModel(preferences);
		UserSimilarity similarity = new PearsonCorrelationSimilarity(model);
		UserNeighborhood neighborhood = new NearestNUserNeighborhood(100,
				similarity, model);
		Recommender recommender = new GenericUserBasedRecommender(model,
				neighborhood, similarity);
		List<RecommendedItem> list = recommender.recommend(2, 1);
		System.out.println(list);
	}

	@Test
	public void test2() throws TasteException {
		FastByIDMap<PreferenceArray> preferences = new FastByIDMap<PreferenceArray>();

		PreferenceArray item0 = new GenericItemPreferenceArray(100);

		PreferenceArray prefsForUser1 = new GenericUserPreferenceArray(10);
		prefsForUser1.setUserID(0, 1);
		prefsForUser1.setItemID(0, 0);
		prefsForUser1.setValue(0, 1f);
		prefsForUser1.setItemID(1, 1);
		prefsForUser1.setValue(1, 1f);
		prefsForUser1.setItemID(2, 2);
		prefsForUser1.setValue(2, 2);
		prefsForUser1.setItemID(3, 3);
		prefsForUser1.setValue(3, 0);

		PreferenceArray prefsForUser2 = new GenericUserPreferenceArray(10);
		prefsForUser2.setUserID(0, 2);
		prefsForUser2.setItemID(0, 0);
		prefsForUser2.setValue(0, 1f);
		prefsForUser2.setItemID(1, 2);
		prefsForUser2.setValue(1, 1);
		// 0 1 2 3
		// 0 1 1 1 2
		// 1 1 1 2 0
		// 2 1 1

		preferences.put(1, prefsForUser1);
		preferences.put(2, prefsForUser2);

		DataModel model = new GenericDataModel(preferences);
		UserSimilarity similarity = new PearsonCorrelationSimilarity(model);
		UserNeighborhood neighborhood = new NearestNUserNeighborhood(100,
				similarity, model);
		Recommender recommender = new GenericUserBasedRecommender(model,
				neighborhood, similarity);
		List<RecommendedItem> list = recommender.recommend(2, 1);
		System.out.println(list);
	}

}
