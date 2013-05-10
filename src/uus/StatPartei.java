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
public class StatPartei extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		 resp.setContentType("text/html; charset=UTF-8");
	
	
	   
	  PrintWriter out = resp.getWriter();
	  Connection c = null;
	    try {
	    	
	    	
	    	  String party = req.getParameter("statpartei");
		      String region = req.getParameter("statpiirkond");
		      
		      
		      if (party.equals("100") ){
		    	  party = "'%'";
		      }	      
		      if (region.equals("0")){
		    	  region = "'%'";
		      }
		      
		      
		      
		      
		      
	      DriverManager.registerDriver(new AppEngineDriver());
	      c = DriverManager.getConnection("jdbc:google:rdbms://evalimised-ut-andmebaas:andmebaas/evalimised");
//	      String fname = req.getParameter("fname");
//	      String content = req.getParameter("content");
//	      if (fname == "" || content == "") {
//	        out.println("<html><head></head><body>You are missing either a message or a name! Try again! Redirecting in 3 seconds...</body></html>");
//	      } else {
	      String statement ="SELECT " +
	      					"p.name, (count(p.id)/(SELECT count(id) FROM vote))*100 as pc, count(p.id) as votes, c.party_id, c.region_id " +
	      					"FROM party p,candidate c,vote v " +
	      					"WHERE " +
	      					"v.candidate_id = c.id AND c.party_id = p.id AND NOT p.id = 1 " +
	      					"AND c.region_id LIKE " + region + " " + 
	      					"AND c.party_id LIKE " + party + " " +
	      					"GROUP by p.id " +
	      					"UNION " +
	      					"SELECT c.name, (count(c.id)/(SELECT count(id) FROM vote))*100 as pc, count(c.id) as votes, c.party_id, c.region_id " +
	      					"FROM candidate c, vote v " +
	      					"WHERE v.candidate_id = c.id AND c.party_id = 1 " +
	      					"AND c.region_id LIKE " + region + " " +
	      					"AND c.party_id LIKE " + party + " " +
	      					"GROUP by c.id ";  
//	      String statement ="INSERT INTO candidate (name, photo) VALUES( ? , ? )";
	      java.sql.PreparedStatement stmt = c.prepareStatement(statement);
//	      stmt.setString(1, fname);
//	      stmt.setString(2, content);
	      int success = 2;
	      ResultSet rs  = stmt.executeQuery(statement);
	      List<StatParteiResult> result = new ArrayList<StatParteiResult>();
	      while (rs.next()){
	    	  StatParteiResult spr = new StatParteiResult();
//	    	  candidate.setId(rs.getInt("id"));
	    	  spr.setName(rs.getString(1));
	    	  spr.setPc(rs.getFloat(2));
	    	  spr.setVotes(rs.getInt(3));
	    	  spr.setParty(rs.getString(4));
	    	  spr.setRegion(rs.getString(5));
//	    	  candidate.setPhoto(rs.getString("photo"));
//	    	  candidate.setAddinfo(rs.getString("addinfo"));
//	    	  candidate.setRegion_id(rs.getInt("region_id"));
//	    	  candidate.setParty_id(rs.getInt("party_id"));
	    	  result.add(spr);
	      }
	      
	      out.print(new Gson().toJson(result));
//	      out.print("lallalalal");
//	      if(success == 1) {
//	        out.println("<html><head></head><body>Success! Redirecting in 3 seconds...</body></html>");
//	      } else if (success == 0) {
//	        out.println("<html><head></head><body>Failure! Please try again! Redirecting in 3 seconds...</body></html>");
//	      }
//	     }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    } finally {
	        if (c != null) 
	          try {
	            c.close();
	            } catch (SQLException ignore) {
	         }
	      } //resp.setHeader("Refresh","3; url=/evalimised.jsp");
	  }
	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		// resp.sendError(400);
		ChannelService channelService = ChannelServiceFactory.getChannelService();
		PrintWriter out = resp.getWriter();
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://evalimised-ut-andmebaas:andmebaas/evalimised");

			String candidate_name = req.getParameter("candidate_name");
			String party_id = req.getParameter("party");
			String region_id = req.getParameter("region");
			String func = req.getParameter("func");
			
			if (candidate_name == "" || party_id == "" || region_id == "") {
				resp.sendError(400);
				// out.println("Parameters missing");

			} else {
				String statement = "INSERT INTO candidate (name, party_id, region_id) VALUES( ? , ? , ? )";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, candidate_name);
				stmt.setString(2, party_id);
				stmt.setString(3, region_id);
				int success = 2;
				success = stmt.executeUpdate();
				if (success > 0) {
					for (String id : Channel.getActiveIds()) {
						channelService.sendMessage(new ChannelMessage(id,
								"candidate_updated"));

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
				}
		}  //resp.setHeader("Refresh","3; url=/#Kodu");

	}
	
	
	
	
	
	
	
}

