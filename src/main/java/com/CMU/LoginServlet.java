package com.CMU;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");

        // Get the form data from the request
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setString(1, username);
            statement.setString(2, password);

            ResultSet resultSet = statement.executeQuery();
            PrintWriter out = response.getWriter();

            out.println("<html>");
            out.println("<head>");
            out.println("<title>Login</title>");
            out.println("<link rel='stylesheet' href='assets/css/success.css'>"); // External CSS file for styling
            out.println("</head>");
            out.println("<body>");
            out.println("<div class='login-container'>");

            if (resultSet.next()) {
                out.println("<h1 class='success-message'>Login successful!</h1>");
                out.println("<p>Welcome, " + resultSet.getString("first_name") + " " + resultSet.getString("last_name") + "!</p>");
                out.println("<a href='index.html' class='dashboard-link'>Go to Dashboard</a>");
            } else {
                out.println("<h1 class='error-message'>Invalid username or password. Try again.</h1>");
                out.println("<a href='login.html' class='retry-link'>Back to Login</a>");
            }

            out.println("</div>");
            out.println("</body>");
            out.println("</html>");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
