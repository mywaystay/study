package com.spring;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/spring")
public class Action {

	@RequestMapping(value = "/abc.do")
	public void test(HttpServletRequest req, HttpServletResponse rep)
			throws IOException {
		rep.getWriter().write("123");
	}

	@RequestMapping(value = "/abc/{ownerId}.do", method = RequestMethod.GET)
	public void findOwner(@PathVariable String ownerId, Model model,
			HttpServletResponse rep) throws IOException {
		rep.getWriter().write(ownerId);
	}

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
			HttpServletRequest req) throws IOException {
		Map map = req.getParameterMap();
		rep.getWriter().write(mahout(map));
	}
	
	public String mahout(Map map){
		return "";
	}

}
