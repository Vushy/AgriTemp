let auth0Client;

const login = async () => {
    await auth0Client.loginWithRedirect({
        redirect_uri: window.location.origin + "/AgriTemp/navigate?action=home"
    });
};

const logout = async () => {
    try {
        // Log out of Auth0 if logged in
        const user = await auth0Client.getUser();
        if (user) {
            await auth0Client.logout({
                returnTo: window.location.origin + "/AgriTemp/navigate?action=login"
            });
        }

        // Log out of MySQL session
        await fetch('/logout', { method: 'POST', credentials: 'include' });

        // Redirect to login page or refresh UI
        window.location.href = '/AgriTemp/navigate?action=login';
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

// Attach the logout function to the logout button
document.getElementById('authLogoutButton').addEventListener('click', logout);


const handleRedirectCallback = async () => {
    const result = await auth0Client.handleRedirectCallback();
    console.log(result);
    updateUI();
};


const updateUI = async () => {
    try {
        // Check if the user is logged in with Auth0
        const user = await auth0Client.getUser();
        const logoutButton = document.getElementById('authLogoutButton');

        // Check MySQL session status
        const response = await fetch('/checkSession', { method: 'GET', credentials: 'include' });
        const mysqlSession = await response.json();

        const isLoggedInMySQL = mysqlSession.loggedIn; // Assume backend responds with { loggedIn: true/false }

        if (logoutButton) {
            if (user || isLoggedInMySQL) {
                // User is logged in via Auth0 or MySQL: show logout button
                logoutButton.style.display = 'block';
            } else {
                // User is not logged in: hide logout button
                logoutButton.style.display = 'none';
            }
        } else {
            console.error("Logout button not found!");
        }
    } catch (error) {
        console.error("Error updating UI:", error);
    }
};



window.addEventListener('DOMContentLoaded', async () => {
    auth0Client = await createAuth0Client({
        domain: "dev-gk4td32b1nbz60oy.jp.auth0.com",
        client_id: "PYiwqsAXLUkg3zxdOAqpDvzGT2a6HkSy",
        redirect_uri: window.location.origin + "/AgriTemp/navigate?action=login"
    });

    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        await handleRedirectCallback();
    } else {
        await updateUI();
    }

    // Ensure buttons exist after DOM is fully loaded
    const logoutButton = document.getElementById('authLogoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

