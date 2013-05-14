package com.mahout;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.common.FastByIDMap;
import org.apache.mahout.cf.taste.impl.model.GenericDataModel;
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

public class Bucket {

	FastByIDMap<PreferenceArray> preferences = new FastByIDMap<PreferenceArray>();

	Map<String, PreferenceArray> map = new HashMap<String, PreferenceArray>();

	public void insert(String p, String i, String v) {
		PreferenceArray prefsForUser = map.get(p);
		if (prefsForUser == null) {
			prefsForUser = new GenericUserPreferenceArray(100);
			prefsForUser.setUserID(0, Integer.valueOf(p));
			map.put(p, prefsForUser);
		}
		prefsForUser.setItemID(Integer.valueOf(i), Long.valueOf(i));
		prefsForUser.setValue(Integer.valueOf(i), Float.valueOf(v));
	}
	
	public List<RecommendedItem> recommended(Integer id,Integer count) throws TasteException {
		for(Object o :map.keySet()){
			PreferenceArray v = map.get(o);
			preferences.put(Long.valueOf(o.toString()), v);
		}
		DataModel model = new GenericDataModel(preferences);
		UserSimilarity similarity = new PearsonCorrelationSimilarity(model);
		UserNeighborhood neighborhood = new NearestNUserNeighborhood(100,
				similarity, model);
		Recommender recommender = new GenericUserBasedRecommender(model,
				neighborhood, similarity);
		List<RecommendedItem> list = recommender.recommend(id, count);
		return list;
	}
}
