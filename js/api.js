// Fælles indstillinger til begge sider
const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDk4MmRmY2UyNDUyZWM0MmI2MjI2NTI5Y2Y4ZWE3YSIsIm5iZiI6MTc5MDU3OTM3NS42MjgsInN1YiI6IjZhYmExMmFmODBlN2Y3NWE0YTM2ZjIxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VkmmXMn1W9KP64dFLr5QiW8SVqLniaBr93QkCsASICc",
  },
};

const posterUrl = "https://image.tmdb.org/t/p/w342";
const bigUrl = "https://image.tmdb.org/t/p/w780";
const faceUrl = "https://image.tmdb.org/t/p/w185";

// ---------- Darkmode ----------
// Virker på både index.html og detail.html, da begge loader api.js når man trykker på knappen
const darkSwitch = document.querySelector(".switch input");

// Sæt korrekt tilstand til, når siden åbnes
if (localStorage.getItem("darkmode") === "true") {
  document.body.classList.add("dark");
  darkSwitch.checked = true;
}

// Skift tilstand, når man trykker på knappen
darkSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkSwitch.checked);
  localStorage.setItem("darkmode", darkSwitch.checked);
});