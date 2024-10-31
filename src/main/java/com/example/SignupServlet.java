package com.example;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class SignupServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");

        // Get the form data from the request
        String firstName = request.getParameter("first_name");
        String lastName = request.getParameter("last_name");
        String email = request.getParameter("email");
        String username = request.getParameter("username");
        String location = request.getParameter("location");
        String password = request.getParameter("password");

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "INSERT INTO users (first_name, last_name, email, username, location, password) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setString(1, firstName);
            statement.setString(2, lastName);
            statement.setString(3, email);
            statement.setString(4, username);
            statement.setString(5, location);
            statement.setString(6, password);

            int rowsInserted = statement.executeUpdate();

            PrintWriter out = response.getWriter();
            if (rowsInserted > 0) {
                out.println("<h1>Signup successful!</h1>");
            } else {
                out.println("<h1>Signup failed. Try again.</h1>");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
