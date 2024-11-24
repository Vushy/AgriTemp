package com.CMU;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet("/fetchWeather")
public class API_Servlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String latitude = request.getParameter("latitude");
        String longitude = request.getParameter("longitude");

        // Validate input
        if (latitude == null || longitude == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing required parameters");
            return;
        }

        // Default API parameters
        String current = "temperature_2m,wind_speed_10m";
        String hourly = "temperature_2m,relative_humidity_2m,wind_speed_10m";

        // Construct the API URL
        String apiUrl = "https://barmmdrr.com/connect/gweather_api?latitude=" + latitude +
                "&longitude=" + longitude +
                "&current=" + current +
                "&hourly=" + hourly;

        try {
            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
            if (responseCode == 200) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder jsonResponse = new StringBuilder();
                String line;

                while ((line = reader.readLine()) != null) {
                    jsonResponse.append(line);
                }
                reader.close();

                // Return JSON response to JavaScript
                response.setContentType("application/json");
                response.getWriter().write(jsonResponse.toString());
            } else {
                response.sendError(HttpServletResponse.SC_BAD_GATEWAY, "Error calling external API");
            }
        } catch (IOException e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error occurred while processing the request.");
        }
    }
}
