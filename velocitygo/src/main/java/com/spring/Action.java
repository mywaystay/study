package com.spring;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/spring")
public class Action {

	@Autowired
	Teacher teacher;

	// spring 支持restful的格式

	@ResponseBody
	@RequestMapping(value = "/rest/{ownerId}.do", method = RequestMethod.GET)
	public String findOwner(@PathVariable String ownerId, Model model,
			HttpServletResponse rep) throws IOException {
		return ownerId;
	}

	@RequestMapping(value = "/test.do", method = RequestMethod.GET)
	public String testa(Model model, HttpServletResponse rep)
			throws IOException {
		model.addAttribute("b", true);
		List<Teacher> list = new ArrayList<Teacher>();
		for (Integer i = 0; i < 3; i++) {
			Teacher t = new Teacher();
			t.setId(i);
			t.setName("name" + i.toString());
			list.add(t);
			model.addAttribute("teacher", t);
		}
		model.addAttribute("list", list);
		List<Student> list2 = new ArrayList<Student>();
		for (Integer i = 0; i < 3; i++) {
			Student t = new Student();
			t.setId(i);
			t.setName("name" + i.toString());
			list2.add(t);
		}
		model.addAttribute("list2", list2);
		Map map = new HashMap();
		map.put("key", "value");
		map.put("key2", "value2");
		return "a";
	}

	@ResponseBody
	// 理论上可以@ResponseBody 支持直接返回teacher对象 但是3.2里有问题 我们还是老实返回字符串吧
	@RequestMapping(value = "/testb.do", method = RequestMethod.GET)
	public String testb(Model model, HttpServletResponse rep,
			HttpServletRequest req, String ex) throws IOException {
		// WEB中获得SPRING容器
		WebApplicationContext wac = WebApplicationContextUtils
				.getRequiredWebApplicationContext(req.getServletContext());
		return new JSONObject(wac.getBean(Teacher.class)).toString();
	}

	@ResponseBody
	@RequestMapping(value = "/post.do", method = RequestMethod.POST)
	public String post(Model model, HttpServletResponse rep,
			HttpServletRequest req, String ex) throws IOException {
		return new JSONObject(req.getParameterMap()).toString();
	}

}
