const nowPlaying = document.querySelector("#nowPlaying");
const popular = document.querySelector("#popular");

// 1. Now Showing (horisontalt scroll)
fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((film) => {
      nowPlaying.innerHTML += `
        <a class="card" href="detail.html?id=${film.id}">
          <img src="${posterUrl + film.poster_path}" alt="${film.title}" />
          <h3>${film.title}</h3>
          <p class="rating"><img src="img/Star.svg" alt="" class="star" /> ${film.vote_average.toFixed(1)}/10 IMDb</p>
        </a>
      `;
    });
  });

// 2. Popular (lodret liste)
fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
  .then((res) => res.json())
  .then((data) => {
    data.results.slice(0, 10).forEach((film) => {
      // Først skriver vi kortet ud, så rækkefølgen er rigtig
      popular.innerHTML += `
        <a class="row" href="detail.html?id=${film.id}">
          <img src="${posterUrl + film.poster_path}" alt="${film.title}" />
          <div>
            <h3>${film.title}</h3>
            <p class="rating"><img src="img/Star.svg" alt="" class="star" /> ${film.vote_average.toFixed(1)}/10 IMDb</p>
            <div class="tags" id="tags-${film.id}"></div>
          </div>
        </a>
      `;

      // Genrer findes kun i detaljer, så vi henter dem her
      fetch(`https://api.themoviedb.org/3/movie/${film.id}?language=en-US`, options)
        .then((res) => res.json())
        .then((detaljer) => {
          const tags = document.querySelector("#tags-" + film.id);
          detaljer.genres.slice(0, 3).forEach((genre) => {
            tags.innerHTML += `<span class="tag">${genre.name}</span>`;
          });

        });
    });
  });