package com.CMU;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class NavigationServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Retrieve the action parameter from the request
        String action = request.getParameter("action");

        // Determine the page to forward or redirect to based on action
        if (action == null) {
            response.sendRedirect("index.html"); // Default page
        } else if (action.equals("login")) {
            request.getRequestDispatcher("WEB-INF/logIn.jsp").forward(request, response);
        } else if (action.equals("signup")) {
            request.getRequestDispatcher("WEB-INF/signUp.jsp").forward(request, response);
        } else if (action.equals("home")) {
            request.getRequestDispatcher("index.html").forward(request, response);
        }
        else {
            // Handle unknown actions
            response.sendRedirect("error.jsp");
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Optionally handle POST requests the same way as GET
        doGet(request, response);
    }
}
