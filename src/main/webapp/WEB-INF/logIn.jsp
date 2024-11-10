<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgriTemp</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/logIn.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.auth0.com/js/auth0-spa-js/1.19/auth0-spa-js.production.js"></script>
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
                <button class="logIn-btn">Log In</button>
            </form>
            <div style="display: flex; align-items: center; text-align: center;">
                <hr style="flex: 1;">
                <span style="padding: 0 10px;">Or</span>
                <hr style="flex: 1;">
            </div>
            <div class="googleContainer">
                <button id="authLoginButton" onclick="login()">Log in with Auth0</button>
            </div>
            <div class="forgot-password-container">
                <a class="forgotPassword" href="#">Forgot Password?</a>
                <button id="authLogoutButton" style="display: block;">Logout</button>
            </div>
            <div class="signup-container">
                <p><b>Don't Have an account?</b> <a href="navigate?action=signup">Sign Up</a></p>
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

<script type="text/javascript"  src="${pageContext.request.contextPath}/assets/JS/auth.js"></script>

</body>
</html>
