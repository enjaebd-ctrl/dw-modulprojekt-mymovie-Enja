// Henter id'et fra url'en: detail.html?id=123
const id = new URLSearchParams(window.location.search).get("id");

// ---------- Gem film (bookmark) ----------
const bookmarkKnap = document.querySelector(".bookmark");

function hentGemteFilm() {
  return JSON.parse(localStorage.getItem("gemteFilm")) || [];
}

function opdaterBookmarkKnap() {
  const gemteFilm = hentGemteFilm();
  if (gemteFilm.includes(id)) {
    bookmarkKnap.classList.add("gemt");
  } else {
    bookmarkKnap.classList.remove("gemt");
  }
}


bookmarkKnap.addEventListener("click", () => {
  let gemteFilm = hentGemteFilm();
  if (gemteFilm.includes(id)) {
    gemteFilm = gemteFilm.filter((gemtId) => gemtId !== id);
  } else {
    gemteFilm.push(id);
  }
  localStorage.setItem("gemteFilm", JSON.stringify(gemteFilm));
  opdaterBookmarkKnap();
});

opdaterBookmarkKnap();

fetch(
  `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits,videos,release_dates`,
  options
)
  .then((res) => res.json())
  .then((film) => {
    // Billede øverst (backdrop, hvis den findes)
    let billede = film.backdrop_path || film.poster_path;
    document.querySelector("#hero").style.backgroundImage =
      "url(" + bigUrl + billede + ")";

    // Titel og rating
    document.querySelector("#titel").textContent = film.title;
    document.querySelector("#rating").innerHTML =
      `<img src="img/Star.svg" alt="" class="star" /> ${film.vote_average.toFixed(1)}/10 IMDb`;

    // Genrer
    const genrer = document.querySelector("#genrer");
    film.genres.forEach((genre) => {
      genrer.innerHTML += `<span class="tag">${genre.name}</span>`;
    });

    // Længde
    const timer = Math.floor(film.runtime / 60);
    const minutter = film.runtime % 60;
    document.querySelector("#laengde").textContent = `${timer}h ${minutter}min`;

    // Sprog
    if (film.spoken_languages.length > 0) {
      document.querySelector("#sprog").textContent =
        film.spoken_languages[0].english_name;
    } else {
      document.querySelector("#sprog").textContent = film.original_language;
    }

    // Aldersgrænse (fra USA)
    let alder = "N/A";
    const usa = film.release_dates.results.find((land) => land.iso_3166_1 === "US");
    if (usa) {
      const med = usa.release_dates.find((udgivelse) => udgivelse.certification !== "");
      if (med) {
        alder = med.certification;
      }
    }
    document.querySelector("#alder").textContent = alder;

    // Beskrivelse
    document.querySelector("#beskrivelse").textContent = film.overview;

    // Trailer-knap (findes kun hvis filmen har en trailer på YouTube)
    const trailer = film.videos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (trailer) {
      document.querySelector("#trailer").href =
        "https://www.youtube.com/watch?v=" + trailer.key;
    }

    // Cast (de første 4 med billede)
    const cast = document.querySelector("#cast");
    film.credits.cast
      .filter((person) => person.profile_path)
      .slice(0, 4)
      .forEach((person) => {
        cast.innerHTML += `
          <div class="person">
            <img src="${faceUrl + person.profile_path}" alt="${person.name}" />
            <p>${person.name}</p>
          </div>
        `;
      });
  });