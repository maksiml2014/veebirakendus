package uus;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.gson.Gson;

@SuppressWarnings("serial")
public class User extends HttpServlet {
	

	/**
	 * Being called on fb login, adds user to database (if not already there)
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
		PrintWriter out = resp.getWriter();
		Connection c = null;
		
		String user_name = "";
		
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://evalimised-ut-andmebaas:andmebaas/performance_schema");

			
			user_name = req.getParameter("user_name");
			if (user_name == "") {
				resp.sendError(400);
			

			} else {


				String statement = "INSERT INTO user (name) VALUES (?);";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, user_name);
				int success = 2;

		
				success += stmt.executeUpdate();
			}
		} catch (SQLException e) {
			resp.sendError(202);
			e.printStackTrace();
		} finally {
			if (c != null)
				try {
					c.close();
				} catch (SQLException ignore) {
					resp.sendError(400);
				}
		} // resp.setHeader("Refresh","3; url=/#Kodu");

	}

}
