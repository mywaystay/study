package com.mahout;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.w3c.dom.Entity;

@Controller
@RequestMapping(value = "/mahout")
public class MahoutAction {

	@RequestMapping(value = "/make.do")
	public String findOwner(Model model, Integer p, Integer i)
			throws IOException {
		List listi = new ArrayList(i);
		List listp = new ArrayList(p);
		for (int j = 1; j <= i; j++) {
			listi.add(j);
		}
		for (int j = 1; j <= p; j++) {
			listp.add(j);
		}
		model.addAttribute("listi", listi);
		model.addAttribute("listp", listp);
		return "a";
	}

	@RequestMapping(value = "/mahout.do")
	public void findOwner(Model model, HttpServletResponse rep,
			HttpServletRequest req, Integer userId, Integer count)
			throws IOException, TasteException {
		Map map = req.getParameterMap();
		rep.getWriter().write(mahout(map, userId, count));
	}

	public String mahout(Map map, Integer id, Integer count)
			throws TasteException {
		if (count == null) {
			count = 10;
		}
		Bucket b = new Bucket();
		for (Object o : map.keySet()) {
			String key = o.toString();
			String a[] = key.split("_");
			if(a.length>1){
				String user = a[0];
				String item = a[1];
				String[] value = (String[]) map.get(o);
				if (value.length > 0 && value[0].length() > 0) {
					b.insert(user, item, value[0]);
				}
			}
		}
		List<RecommendedItem> list = b.recommended(id, count);
		return JSONArray.toJSONString(list);
	}

}
