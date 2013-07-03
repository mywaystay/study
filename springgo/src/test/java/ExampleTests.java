import java.awt.print.Printable;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.ui.Model;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class ExampleTests {

	@Autowired
	private WebApplicationContext wac;

	private MockMvc mockMvc;

	@Before
	public void setup() {
		// webAppContextSetup 注意上面的static import
		// webAppContextSetup 构造的WEB容器可以添加fileter 但是不能添加listenCLASS
		// WebApplicationContext context =
		// ContextLoader.getCurrentWebApplicationContext();
		// 如果控制器包含如上方法 则会报空指针
		this.mockMvc = webAppContextSetup(this.wac).build();
	}

	@Test
	public void ownerId() throws Exception {
		mockMvc.perform((get("/spring/rest/4.do"))).andExpect(status().isOk())
				.andDo(print());
	}

	@Test
	public void test() throws Exception {
		mockMvc.perform((get("/spring/test.do"))).andExpect(status().isOk())
				.andDo(print())
				.andExpect(model().attributeHasNoErrors("teacher"));
	}

	@Test
	public void testb() throws Exception {
		mockMvc.perform((get("/spring/testb.do"))).andExpect(status().isOk())
				.andDo(print());
	}

	@Test
	public void getAccount() throws Exception {
		mockMvc.perform((post("/spring/post.do").param("abc", "def")))
				.andExpect(status().isOk()).andDo(print());
	}
	
	@Test
	public void getAccount2() throws Exception {
		mockMvc.perform((get("/spring/pic.do")))
				.andExpect(status().isOk()).andDo(print());
	}

}