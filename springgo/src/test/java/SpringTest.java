
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.spring.Student;
import com.spring.Teacher;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class SpringTest {

	@Autowired
	Student stu;
	
	@Autowired
	Student stu2;

	@Autowired
	Teacher tea;

	@Autowired
	Teacher tea2;

	@Test
	public void test1(){
		System.out.println(System.getenv("PATH"));
		System.out.println(stu.getId());
		System.out.println(stu.getName());
		System.out.println(stu2.getId());
		System.out.println(stu2.getName());
		//因为是原型模式 所以两个tea的值不一样
		System.out.println(tea.getId());
		System.out.println(tea2.getId());
	}
	
}
