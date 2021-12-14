const myForm = document.getElementById("my-form");

const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

const checkCookie = () => {
    if (!getCookie("uid")) {
        window.location.replace("/login");
    }
};

if (window.location.href.includes("login")) {
    const errorDisplay = document.getElementById("status");
    myForm.addEventListener("submit", async (e) => {
        errorDisplay.textContent = "";
        e.preventDefault();
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        let fields = {
            email,
            password,
        };
        try {
            const response = await fetch(`/login`, {
                method: "POST",
                body: JSON.stringify(fields),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            if (responseData.status === "ok") {
                window.location.replace("/profile");
            } else {
                errorDisplay.textContent = responseData.data;
            }
        } catch (error) {
            console.log(error);
        }
    });
}

if (window.location.href.includes("signup")) {
    const errorDisplay = document.getElementById("status");
    myForm.addEventListener("submit", async (e) => {
        errorDisplay.textContent = "";
        e.preventDefault();
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const firstName = document.querySelector('input[name="firstName"]').value;
        const lastName = document.querySelector('input[name="lastName"]').value;

        let fields = {
            firstName,
            lastName,
            email,
            password,
        };
        try {
            const response = await fetch(`/signup`, {
                method: "POST",
                body: JSON.stringify(fields),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            if (responseData.status === "ok") {
                document.cookie = `uid=${responseData.data}; domain=; path=/ `;
                window.location.replace("/");
            } else {
                errorDisplay.textContent = responseData.data;
            }
        } catch (error) {
            console.log(error);
        }
    });
}

if (window.location.href.includes("profile")) {
    checkCookie();
    let userId = document.querySelector('input[name="userID"]');
    userId.value = getCookie("uid");
}

if (window.location.href.includes("logout")) {
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/");
}
