console.log("javascript file loaded up");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = "loading message...";
    messageTwo.textContent = "";

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error;
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        });
    });
});