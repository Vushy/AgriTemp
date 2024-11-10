let auth0Client;

const login = async () => {
    await auth0Client.loginWithRedirect({
        redirect_uri: window.location.origin + "/AgriTemp/navigate?action=home"
    });
};

const logout = () => {
    auth0Client.logout({
        returnTo: window.location.origin + "/AgriTemp/navigate?action=home"
    });
};

const handleRedirectCallback = async () => {
    const result = await auth0Client.handleRedirectCallback();
    console.log(result);
    updateUI();
};


const updateUI = async () => {
    const user = await auth0Client.getUser();
    const logoutButton = document.getElementById('authLogoutButton');

    if (logoutButton) {
        if (user) {
            // User is logged in: show logout button
            logoutButton.style.display = 'block';
        } else {
            // User is not logged in: hide logout button
            logoutButton.style.display = 'none';
        }
    } else {
        console.error("Logout button not found!");
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

