import { API_KEY } from "./config.js";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY(),
    "X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com",
  },
};

const fetchIpInformation = (ip) => {
  return fetch(
    `https://ip-geo-location.p.rapidapi.com/ip/${ip}?format=json`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

/* DOM objects */
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const submit = document.querySelector("#submit");
const results = document.querySelector("#results");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { value } = input;
  if (!value) return;

  submit.setAttribute("disabled", "");
  submit.setAttribute("aria-busy", "true");

  const ipInfo = await fetchIpInformation(value);
  console.log(ipInfo);
  if (ipInfo) {
    results.innerHTML = JSON.stringify(ipInfo, null, 2);
  }
  submit.removeAttribute("disabled");
  submit.removeAttribute("aria-busy");
});
