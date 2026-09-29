const gemteFilmContainer = document.querySelector("#gemteFilm");
const ingenGemteBesked = document.querySelector("#ingenGemte");

// Henter listen af gemte film-id'er fra localStorage
const gemteFilm = JSON.parse(localStorage.getItem("gemteFilm")) || [];

if (gemteFilm.length === 0) {
  ingenGemteBesked.style.display = "block";
} else {
  gemteFilm.forEach((filmId) => {
    fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=en-US`, options)
      .then((res) => res.json())
      .then((film) => {
        gemteFilmContainer.innerHTML += `
          <a class="row" href="detail.html?id=${film.id}">
            <img src="${posterUrl + film.poster_path}" alt="${film.title}" />
            <div>
              <h3>${film.title}</h3>
              <p class="rating"><img src="img/Star.svg" alt="" class="star" /> ${film.vote_average.toFixed(1)}/10 IMDb</p>
              <div class="tags">
                ${film.genres
                  .slice(0, 3)
                  .map((genre) => `<span class="tag">${genre.name}</span>`)
                  .join("")}
              </div>
            </div>
          </a>
        `;
      });
  });
}