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

import com.google.appengine.api.channel.ChannelMessage;
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
			String party = req.getParameter("statpartei");
			String region = req.getParameter("statpiirkond");

			String SELECT = "SELECT c.name, count(c.id) as votes FROM candidate c, vote v ";
			String WHERE = "WHERE v.candidate_id = c.id ";
			String GROUP_BY = "GROUP by c.id ";

			if (!party.equals("100")) {
				WHERE += " AND c.party_id=" + party + " ";
			}
			if (!region.equals("0")) {
				WHERE += " AND c.region_id=" + region + " ";
			}

			String statement = SELECT + WHERE + GROUP_BY;
		
			java.sql.PreparedStatement stmt = c.prepareStatement(statement);

			int success = 2;

			ResultSet rs = stmt.executeQuery(statement);

			List<StatParteiResult> result = new ArrayList<StatParteiResult>();
			while (rs.next()) {
				StatParteiResult spr = new StatParteiResult();

				spr.setName(rs.getString(1));
				spr.setPc(rs.getFloat(2));
				spr.setVotes(rs.getInt(2));

				result.add(spr);
			}
			String json = new Gson().toJson(result);

			out.print(json);

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (c != null)
				try {
					c.close();
				} catch (SQLException ignore) {
				}
		} 
	}

	
	/**
	 * Get name and candidate ID as parameter, resolve user name to user id
	 * insert into vote user Id and candidate Id
	 */
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		// resp.sendError(400);
		ChannelService channelService = ChannelServiceFactory
				.getChannelService();

		PrintWriter out = resp.getWriter();
		Connection c = null;
		// String func = "";
		String user_name = "";
		String candidate_id = "";
		String user_id="";
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://evalimised-ut-andmebaas:andmebaas/performance_schema");

			candidate_id = req.getParameter("candidate_id");
			user_name = req.getParameter("user_name");

			if (user_name == "" || candidate_id == "") {
				resp.sendError(400);
				

			} else {

				/** Resolve user name to user id */
				String selectStatement = "SELECT id FROM user WHERE name=?";
				PreparedStatement sStmt = c.prepareStatement(selectStatement);
				sStmt.setString(1, user_name);
				ResultSet sRs = sStmt.executeQuery(selectStatement);
				List<StatParteiResult> result = new ArrayList<StatParteiResult>();
				while (sRs.next()) {
					StatParteiResult spr = new StatParteiResult();
				
					spr.setName(sRs.getString(1));
					user_id = spr.getName();
					result.add(spr);
				}
				if (user_id == ""){
					resp.sendError(400);
				}
				/** insert into vote using user id and candidate id */
				String insertStatement = "INSERT INTO vote (user_id, candidate_id) VALUES (?, ?)";
				PreparedStatement iStmt = c.prepareStatement(insertStatement);
				iStmt.setString(1, user_id);
				iStmt.setString(2, candidate_id);
				
				int success = -1;
				success = iStmt.executeUpdate();
//				resp.sendError(400);
				
				/** send push notification to all clients */
				if (success > 0) {
					for (String id : Channel.getActiveIds()) {
						channelService.sendMessage(new ChannelMessage(id,
								"vote_updated"));

					}
				}

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
		}
	}
}
