<%--
  Created by IntelliJ IDEA.
  User: Rayl
  Date: 10/12/2024
  Time: 1:40 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgriTemp</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/signUp.css">
</head>
<body>

<main>
    <div class="signup-container">
        <div class="signup-form">
            <h2>Sign Up</h2>
            <p>Get Started Now!</p>
            <form action="signup" method="post">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" name="first_name" placeholder="Enter your first name" required>

                <label for="last-name">Last Name</label>
                <input type="text" id="last-name" name="last_name" placeholder="Enter your last name" required>

                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>

                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required>

                <label for="location">Location</label>
                <select id="location" name="location" required>
                    <option value="Valencia">Valencia</option>
                    <option value="Malaybalay">Malaybalay</option>
                    <option value="Maramag">Maramag</option>
                </select>

                <label for="password" required>Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>

                <button type="submit" class="signup-btn" value="Signup">Sign Up</button>
            </form>
        </div>
    </div>

    <div class="image-container">
        <img src="${pageContext.request.contextPath}/assets/images/maksym-ivashchenko-LVDTuA_cbTM-unsplash.jpg" alt="Farmer">
        <div class="image-text">
            <p>Seeing the temperature and humidity of <br>Bukidnon with <span><b>AgriTemp</b></span></p>
        </div>
    </div>
</main>

</body>
</html>