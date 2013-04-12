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

import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.gson.Gson;

@SuppressWarnings("serial")
public class StatCandidate extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("text/html; charset=UTF-8");

		PrintWriter out = resp.getWriter();
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://evalimised-ut-andmebaas:andmebaas/performance_schema");
			// String fname = req.getParameter("fname");
			// String content = req.getParameter("content");
			// if (fname == "" || content == "") {
			// out.println("<html><head></head><body>You are missing either a message or a name! Try again! Redirecting in 3 seconds...</body></html>");
			// } else {

			String party = req.getParameter("statpartei");
			String region = req.getParameter("statpiirkond");

			String SELECT = "SELECT c.name, count(c.id) as votes FROM candidate c, vote v ";
			String WHERE = "WHERE v.candidate_id = c.id ";
			String GROUP_BY = "GROUP by c.id ";

			//
			// if (!name.equals("")){
			// WHERE+=" AND candidate.name LIKE '%"+name+"%' ";
			// out.print("no name");
			// }

			if (!party.equals("100")) {
				WHERE += " AND c.party_id=" + party + " ";
			}
			if (!region.equals("0")) {
				WHERE += " AND c.region_id=" + region + " ";
			}

			String statement = SELECT + WHERE + GROUP_BY;
			// out.print(statement);

			// String statement
			// ="SELECT candidate.name , party.name, region.name FROM candidate, party, region WHERE candidate.party_id=party.id AND candidate.region_id=region.id";
			// String statement
			// ="INSERT INTO candidate (name, photo) VALUES( ? , ? )";
			java.sql.PreparedStatement stmt = c.prepareStatement(statement);
			// stmt.setString(1, fname);
			// stmt.setString(2, content);
			int success = 2;
			// out.print(statement);
			ResultSet rs = stmt.executeQuery(statement);

			List<StatParteiResult> result = new ArrayList<StatParteiResult>();
			while (rs.next()) {
				StatParteiResult spr = new StatParteiResult();
				// candidate.setId(rs.getInt("id"));
				spr.setName(rs.getString(1));
				spr.setPc(rs.getFloat(2));
				spr.setVotes(rs.getInt(2));
				// candidate.setPhoto(rs.getString("photo"));
				// candidate.setAddinfo(rs.getString("addinfo"));
				// candidate.setRegion_id(rs.getInt("region_id"));
				// candidate.setParty_id(rs.getInt("party_id"));
				result.add(spr);
			}
			String json = new Gson().toJson(result);

			out.print(json);
			// if(success == 1) {
			// out.println("<html><head></head><body>Success! Redirecting in 3 seconds...</body></html>");
			// } else if (success == 0) {
			// out.println("<html><head></head><body>Failure! Please try again! Redirecting in 3 seconds...</body></html>");
			// }
			// }
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (c != null)
				try {
					c.close();
				} catch (SQLException ignore) {
				}
		} // resp.setHeader("Refresh","3; url=/performance_schema.jsp");
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		// resp.sendError(400);
		ChannelService channelService = ChannelServiceFactory.getChannelService();

		PrintWriter out = resp.getWriter();
		Connection c = null;
//		String func = "";
		String user_id = "";
		String candidate_id = "";
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://evalimised-ut-andmebaas:andmebaas/performance_schema");

			candidate_id = req.getParameter("candidate_id");
			user_id = req.getParameter("user_id");
			
			if (user_id == "" || candidate_id == "") {
				resp.sendError(400);
				// out.println("Parameters missing");

			} else {

//				func = req.getParameter("func");

				String statement = "INSERT INTO vote (user_id, candidate_id) VALUES (?, ?)";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, user_id);
				stmt.setString(2, candidate_id);
				// stmt.setString(3, region_id);
				int success = 2;
				success = stmt.executeUpdate();
				// TODO send message

			}
		} catch (SQLException e) {
			resp.sendError(403);
			e.printStackTrace();
		} finally {
			if (c != null)
				try {
					c.close();
				} catch (SQLException ignore) {
					resp.sendError(403);
				}
		} // resp.setHeader("Refresh","3; url=/#Kodu");
	}
}
