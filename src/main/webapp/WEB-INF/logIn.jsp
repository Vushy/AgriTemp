<%--
  Created by IntelliJ IDEA.
  User: Rayl
  Date: 10/12/2024
  Time: 3:50 PM
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
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/logIn.css">
</head>

<body>
<header>
    <div class="navbar">
        <div class="logo">
            <h1>AgriTemp</h1>
        </div>

        <nav>
            <ul>
                <div class="search-icon">
                    <img src="${pageContext.request.contextPath}/assets/images/icons/search.png" alt="Search">
                </div>
                <li><a href="navigate?action=home">Home</a></li>
                <li><a href="#">Auto Locate</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#" class="active">Login</a></li>
            </ul>
        </nav>

    </div>
</header>

<main>
    <div class="login-container">
        <div class="login-form">
            <h2>Login</h2>
            <p>Enter your credentials to access your account</p>
            <form action="login" method="post">
                <label for="username">Username or Email</label>
                <input type="text" id="username" name="username" placeholder="Enter your username or email" required>

                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>

                <div class="forgot-password-container">
                    <a class="forgotPassword" href="#">Forgot Password?</a>
                </div>

                <button type="submit" class="logIn-btn">Log In</button>
            </form>
            <div class="signup-container">
                <p>
                    <b>Don't Have an account?</b> <a href="navigate?action=signup">Sign Up</a>
                </p>
            </div>
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