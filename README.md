
# Movie Search with List/Grid View Toggle

## Description

This is a simple web application that allows users to search for movies using the OMDb API. Search results can be displayed either in a grid view (cards with images) or a list view (rows). A button toggles between these two display modes.

A Bootstrap modal shows detailed information about each movie when clicking the "Read More" button.

---

## Features

* Search movies by title using the OMDb API.
* Display results in grid or list view.
* Lazy loading of images for performance.
* Scroll-triggered animations with IntersectionObserver.
* Bootstrap modal for full movie details.
* Network error handling and user-friendly error messages.
* Responsive UI built with Bootstrap 5.

---

## Technologies Used

* **JavaScript** (ES6 modules)
* **HTML5 & CSS3**
* **Bootstrap 5** (CSS & JS)
* **OMDb API** (API key required)
* **IntersectionObserver** for animations and lazy loading

---

## Installation & Usage

1. Clone or download the project.
2. Create a file named `apikey.js` at the root with your OMDb API key:

```js
export const API_KEY = 'your_omdb_api_key_here';
```

3. Open `index.html` in a modern browser (Chrome, Firefox, Safari, etc.).
4. Use the search bar to find movies by title.
5. Click the "List View"/"Grid View" button to toggle between display modes.
6. Click "Read More" on any movie card to see detailed info in a modal.

---

## Project Structure

```
/
├── index.html       # Main HTML page
├── script.js        # JavaScript logic
├── styles.css       # Custom CSS styles
├── apikey.js        # Exports your API key (not included in repo)
└── README.md        # This documentation file
```

---

## Important Notes

* The `apikey.js` file is **not included** for security reasons. You must create it yourself with your own OMDb API key.
* The list view changes the layout to a single column with horizontal cards.
* Images are lazy-loaded to improve performance.
* Switching views dynamically updates the layout and reloads the search results accordingly.
* Bootstrap 5 is used for layout and modal components.

---

## Compatibility

Tested on:

* Latest Chrome
* Latest Firefox
* Latest Safari

**Note:** Some animations and DOM changes may require tweaks for Safari compatibility.

---

