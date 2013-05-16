package com.spring;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class ControllerInterceptor extends HandlerInterceptorAdapter {

	// 拦截器一号 在请求执行前发生,如果返回FALSE 请求停止
	// 常常用来进行权限验证
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		return true;
	}

	// 拦截器2号 在视图渲染前调用 经常用来放入视图全局变量
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

	}

	//拦截器3号 请求执行完毕后调用
	//常常用来捕获异常
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		
	}

}
