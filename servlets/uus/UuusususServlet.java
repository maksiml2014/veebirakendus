package uus;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
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
public class UuusususServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
	
	
	   
	  PrintWriter out = resp.getWriter();
	  Connection c = null;
	    try {
	      DriverManager.registerDriver(new AppEngineDriver());
	      c = DriverManager.getConnection("jdbc:google:rdbms://evalimised-ut-andmebaas:andmebaas/performance_schema");
//	      String fname = req.getParameter("fname");
//	      String content = req.getParameter("content");
//	      if (fname == "" || content == "") {
//	        out.println("<html><head></head><body>You are missing either a message or a name! Try again! Redirecting in 3 seconds...</body></html>");
//	      } else {
	      String statement ="SELECT candidate.name , party.name, region.name FROM candidate, party, region WHERE candidate.party_id=party.id AND candidate.region_id=region.id";  
//	      String statement ="INSERT INTO candidate (name, photo) VALUES( ? , ? )";
	      java.sql.PreparedStatement stmt = c.prepareStatement(statement);
//	      stmt.setString(1, fname);
//	      stmt.setString(2, content);
	      int success = 2;
	      ResultSet rs  = stmt.executeQuery(statement);
	      List<Candidate> result = new ArrayList<Candidate>();
	      while (rs.next()){
	    	  Candidate candidate = new Candidate();
//	    	  candidate.setId(rs.getInt("id"));
	    	  candidate.setName(rs.getString(1));
	    	  candidate.setParty_name(rs.getString(2));
	    	  candidate.setRegion_name(rs.getString(3));
//	    	  candidate.setPhoto(rs.getString("photo"));
//	    	  candidate.setAddinfo(rs.getString("addinfo"));
//	    	  candidate.setRegion_id(rs.getInt("region_id"));
//	    	  candidate.setParty_id(rs.getInt("party_id"));
	    	  result.add(candidate);
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
	      } //resp.setHeader("Refresh","3; url=/performance_schema.jsp");
	  }
}
