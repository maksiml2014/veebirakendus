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
public class UuusususServlet extends HttpServlet {
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
			String statement = "SELECT candidate.name , party.name, region.name FROM candidate, party, region WHERE candidate.party_id=party.id AND candidate.region_id=region.id";
			// String statement
			// ="INSERT INTO candidate (name, photo) VALUES( ? , ? )";
			java.sql.PreparedStatement stmt = c.prepareStatement(statement);
			// stmt.setString(1, fname);
			// stmt.setString(2, content);
			int success = 2;
			ResultSet rs = stmt.executeQuery(statement);
			List<Candidate> result = new ArrayList<Candidate>();
			while (rs.next()) {
				Candidate candidate = new Candidate();
				// candidate.setId(rs.getInt("id"));
				candidate.setName(rs.getString(1));
				candidate.setParty_name(rs.getString(2));
				candidate.setRegion_name(rs.getString(3));
				// candidate.setPhoto(rs.getString("photo"));
				// candidate.setAddinfo(rs.getString("addinfo"));
				// candidate.setRegion_id(rs.getInt("region_id"));
				// candidate.setParty_id(rs.getInt("party_id"));
				result.add(candidate);
			}

			out.print(new Gson().toJson(result));
			// out.print("lallalalal");
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
		ChannelService channelService = ChannelServiceFactory
				.getChannelService();
		PrintWriter out = resp.getWriter();
		Connection c = null;
		// String func = "";
		String user_id = "";
		// String candidate_id = "";
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://evalimised-ut-andmebaas:andmebaas/performance_schema");

			// candidate_id = req.getParameter("candidate_id");
			user_id = req.getParameter("user_id");

			if (user_id == "") {
				resp.sendError(400);
				// out.println("Parameters missing");

			} else {

				// func = req.getParameter("func");

				String statement = "DELETE FROM vote WHERE user_id=?";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, user_id);
				// stmt.setString(3, region_id);
				int success = 2;
				success += stmt.executeUpdate();
				if (success == 2) {
					resp.sendError(403);
				} else {

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
		} // resp.setHeader("Refresh","3; url=/#Kodu");

	}

}
