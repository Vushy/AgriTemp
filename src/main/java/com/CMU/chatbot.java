package com.CMU;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

public class chatbot {
    public static void main(String[] args) {
        try {
            // Call the function with a custom prompt
            String prompt = "what is a supernova?";
            sendGetRequest(prompt);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Function to send GET request
    public static void sendGetRequest(String prompt) {
        try {
            // Base URL
            String baseUrl = "https://barmmdrr.com/connect_ai/message_box";

            // Encode the prompt for URL safety
            String encodedPrompt = URLEncoder.encode(prompt, "UTF-8");

            // Construct the full URL with the prompt as a query parameter
            String fullUrl = baseUrl + "?prompt=" + encodedPrompt;

            // Open a connection
            URL url = new URL(fullUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            // Set request properties (optional)
            connection.setRequestProperty("User-Agent", "Java-HttpClient");

            // Check the response code
            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            // Read the response if the request was successful
            if (responseCode == 200) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line;
                StringBuilder response = new StringBuilder();
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                // Print the response
                System.out.println("Response: " + response.toString());
            } else {
                System.out.println("Error: " + connection.getResponseMessage());
            }

            // Close the connection
            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}