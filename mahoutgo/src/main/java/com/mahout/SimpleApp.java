package com.mahout;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;


/*
 * @author janet
 */
public class SimpleApp
{
    /* 缺省的模式是内嵌式的*/
    public String framework = "embedded";
    public String driver = "org.apache.derby.jdbc.EmbeddedDriver";
    public String protocol = "jdbc:derby:";
    public static void main(String[] args) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException
    {
       new SimpleApp().go(args);
    }
    void go(String[] args)
    {
        /* 处理参数，确定这个程序作为内嵌式使用还是作为客户端使用*/
        parseArguments(args);
        System.out.println("SimpleApp starting in " + framework + " mode.");
        try
        {
            /*
               装载驱动程序，如果是内嵌式模式，这将启动Derby, 因为它还没有运行.
             */
        	Class.forName("org.apache.derby.jdbc.EmbeddedDriver").newInstance();
            System.out.println("Loaded the appropriate driver.");
            Connection conn = null;
            Properties props = new Properties();
            props.put("user", "user1");
            props.put("password", "user1");
            //create=true将创建数据库derbyDB
            conn = DriverManager.getConnection(protocol + "derbyDB;create=true", null);
            System.out.println("Connected to and created database derbyDB");
            conn.setAutoCommit(false);//设置自动提交模式
            Statement s = conn.createStatement();
            /*
               创建一个表，加入几条记录并更新一条.
             */
            s.execute("create table derbyDB(num int, addr varchar(40))");
            System.out.println("Created table derbyDB");
            s.execute("insert into derbyDB values (1956,'Webster St.')");
            System.out.println("Inserted 1956 Webster");
            s.execute("insert into derbyDB values (1910,'Union St.')");
            System.out.println("Inserted 1910 Union");
            s.execute(
                "update derbyDB set num=180, addr='Grand Ave.' where num=1956");
            System.out.println("Updated 1956 Webster to 180 Grand");
            s.execute(
                "update derbyDB set num=300, addr='Lakeshore Ave.' where num=180");
            System.out.println("Updated 180 Grand to 300 Lakeshore");
            /*
               查询并校验结果.
             */
            ResultSet rs = s.executeQuery(
                    "SELECT num, addr FROM derbyDB ORDER BY num");
            if (!rs.next())
            {
                throw new Exception("Wrong number of rows");
            }
            if (rs.getInt(1) != 300)
            {
                throw new Exception("Wrong row returned");
            }
            if (!rs.next())
            {
                throw new Exception("Wrong number of rows");
            }
            if (rs.getInt(1) != 1910)
            {
                throw new Exception("Wrong row returned");
            }
            if (rs.next())
            {
                throw new Exception("Wrong number of rows");
            }
            System.out.println("Verified the rows");
            s.execute("drop table derbyDB");//删除表
            System.out.println("Dropped table derbyDB");
           
            rs.close();
            s.close();
            System.out.println("Closed result set and statement");
            conn.commit();
            conn.close();
            System.out.println("Committed transaction and closed connection");
           
            boolean gotSQLExc = false;
            if (framework.equals("embedded"))
            {
                try
                {
                    DriverManager.getConnection("JDBC:derby:;shutdown=true");//关闭数据库服务
                }
                catch (SQLException se)
                {
                    gotSQLExc = true;
                }
                if (!gotSQLExc)
                {
                    System.out.println("Database did not shut down normally");
                }
                else
                {
                    System.out.println("Database shut down normally");
                }
            }
        }
        catch (Throwable e)
        {
            System.out.println("exception thrown:");
            if (e instanceof SQLException)
            {
                printSQLError((SQLException) e);
            }
            else
            {
                e.printStackTrace();
            }
        }
        System.out.println("SimpleApp finished");
    }
    static void printSQLError(SQLException e)
    {
        while (e != null)
        {
            System.out.println(e.toString());
            e = e.getNextException();
        }
    }
    private void parseArguments(String[] args)
    {
       
        //  System.setProperty("derby.system.home", "c:DBdata");//这样可以设置数据库数据的存放目录

        int length = args.length;
        for (int index = 0; index < length; index++)
        {
            if (args[index].equalsIgnoreCase("jccJDBCclient"))
            {
                framework = "jccJDBC";
                driver = "com.ibm.DB2.jcc.DB2Driver";
                protocol = "JDBC:derby:net://localhost:1527/";
            }
            if (args[index].equalsIgnoreCase("derbyclient"))
            {
                framework = "derbyclient";
                driver = "org.apache.derby.JDBC.ClientDriver";
                protocol = "JDBC:derby://localhost:1527/";
            }
        }
    }
}