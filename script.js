import { API_KEY } from './apikey.js';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const container = document.getElementById('movies-container');
const modalElement = document.getElementById('movieModal');
const modalContent = document.getElementById('modal-content');
const bootstrapModal = new bootstrap.Modal(modalElement);
const toggleBtn = document.getElementById('toggle-view');
let isListView = false;

toggleBtn.addEventListener('click', async () => {
  isListView = !isListView;
  if (isListView) {
    container.classList.add('list-view');
    toggleBtn.textContent = 'Mode Grille';
  } else {
    container.classList.remove('list-view');
    toggleBtn.textContent = 'Mode Liste';
  }
  const query = input.value.trim() || 'Batman';
  container.innerHTML = '';
  await searchMovies(query);
});


const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const imgObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => {
        img.classList.remove('loading');
        img.classList.add('loaded');
      };
      obs.unobserve(img);
    }
  });
}, { rootMargin: '100px' });

async function searchMovies(query) {
  container.innerHTML = '<p>Chargement...</p>';
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await res.json();
    container.innerHTML = '';

    if (data.Response === 'True') {
      data.Search.forEach(film => createMovieCard(film));
    } else {
      container.innerHTML = `<p class="text-danger">${data.Error}</p>`;
    }
  } catch (err) {
    container.innerHTML = `<p class="text-danger">Erreur réseau, veuillez réessayer.</p>`;
  }
}

function createMovieCard(film) {
  const block = document.createElement('div');
  block.className = 'movie-card';

  if (!isListView) {
    block.classList.add('col-md-4');
  }

  block.innerHTML = 
    <div class="card h-100">
      <img
        class="card-img-top loading"
        src="https://via.placeholder.com/300x450?text=Chargement..."
        data-src="${film.Poster !== 'N/A' ? film.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}"
        alt="${film.Title}"
        loading="lazy"
      />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${film.Title}</h5>
        <p class="card-text">Année : ${film.Year}</p>
        <button class="btn btn-secondary mt-auto read-more" data-id="${film.imdbID}">Read More</button>
      </div>
    </div>
  ;
  container.appendChild(block);

  observer.observe(block);

  const img = block.querySelector('img');
  imgObserver.observe(img);
}


form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  await searchMovies(query);
});

document.addEventListener('click', async e => {
  if (!e.target.classList.contains('read-more')) return;

  const imdbID = e.target.dataset.id;
  if (!imdbID) return;

  modalContent.innerHTML = '<p>Chargement des détails...</p>';
  bootstrapModal.show();

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const film = await res.json();

    if (film.Response === 'True') {
      modalContent.innerHTML = `
        <div class="modal-header">
          <h5 class="modal-title">${film.Title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="${film.Poster !== 'N/A' ? film.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" class="img-fluid mb-3" alt="${film.Title}">
          <p><strong>Date de sortie :</strong> ${film.Released}</p>
          <p><strong>Résumé :</strong> ${film.Plot}</p>
        </div>
      `;
    } else {
      modalContent.innerHTML = `<p class="text-danger">${film.Error}</p>`;
    }
  } catch (err) {
    modalContent.innerHTML = `<p class="text-danger">Erreur lors du chargement des détails.</p>`;
  }
});

window.addEventListener('DOMContentLoaded', () => {
  input.focus();
  searchMovies('Batman');
});
