const myForm = document.getElementById("my-form");

if (window.location.href.includes("login")) {
  const errorDisplay = document.getElementById("status");
  myForm.addEventListener("submit", async (e) => {
    errorDisplay.textContent = "";
    e.preventDefault(); //don't send form if empty input
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
        window.location.replace("/");
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
      console.log(responseData)
      if (responseData.status === "ok") {
        window.location.replace("/");
      } else {
        errorDisplay.textContent = responseData.data;
      }
    } catch (error) {
      console.log(error);
    }
  });
}
