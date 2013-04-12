package uus;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.gson.Gson;

@SuppressWarnings("serial")
public class Channel extends HttpServlet {
	private static long TWO_HOURS = 60*60*1000*2;
	private class Id {
		String id;
		long time;
		
		Id(String id){
			this.id=id;
			this.time = System.currentTimeMillis();
		}
	}
	private List<Id> activeIds = new ArrayList<Id>();
	private List<Id> syncActiveIds = Collections.synchronizedList(this.activeIds);
	public List<String> getActiveIds(){
		// TODO create list of Strings
		
		long now = System.currentTimeMillis();
		for (Id id : this.syncActiveIds){
			if (now - id.time > TWO_HOURS){
				this.syncActiveIds.remove(id);
			}
			// TODO else add ids to list
		// TODO return list
		}
	}
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		String id = "";

		resp.setContentType("text/html; charset=UTF-8");

		PrintWriter out = resp.getWriter();
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://evalimised-ut-andmebaas:andmebaas/performance_schema");

			id = req.getParameter("id");
			String token = "";
			if (id.equals("")) {
				resp.sendError(400);
			}

			else {
				ChannelService channelService = ChannelServiceFactory
						.getChannelService();
				token = channelService.createChannel(id);
				this.activeIds.add(new Id(id));
			}
			
			
			ChannelResult result = new ChannelResult();
			result.setToken(token);
			// List<StatParteiResult> result = new
			// ArrayList<StatParteiResult>();
			// while (rs.next()) {
			// StatParteiResult spr = new StatParteiResult();
			// // candidate.setId(rs.getInt("id"));
			// spr.setName(rs.getString(1));
			// spr.setPc(rs.getFloat(2));
			// spr.setVotes(rs.getInt(2));
			// // candidate.setPhoto(rs.getString("photo"));
			// // candidate.setAddinfo(rs.getString("addinfo"));
			// // candidate.setRegion_id(rs.getInt("region_id"));
			// // candidate.setParty_id(rs.getInt("party_id"));
			// result.add(spr);
			// }
			String json = new Gson().toJson(result);
			//

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
}