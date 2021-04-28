"use strict";

// Global variable
let _brands = [];
let _favBrands = [];

initApp();

/**
 * Initializing the app by loading and appending to the DOM
 */
async function initApp() {
  _brands = await loadBrands(); // execute the function to load the brands into _brands
  appendBrands(_brands);
}

/**
 * Fetch brand from data source: JSON file
 */
async function loadBrands() {
  let response = await fetch("./json/brands.json");
  let data = await response.json();
  return data;
}

/**
 * Appending brands to the DOM by the giving argument
 */
function appendBrands(brands) {
  let html = "";
  for (const brand of brands) {
    console.log(brand);
    html += /*html*/`
      <article>
        <img src="${brand.img}">
        ${generateFavBrandButton(brand.id)}
      </article>
    `;
  }
  document.querySelector("#brand-container").innerHTML = html;
}

/* ---------- Brand Fav Functionality ---------- */

/**
 * Appending fav brands to the DOM by looping through _favBrands
 */
function appendFavBrands() {
  let html = "";
  for (const brand of _favBrands) {
    console.log(brand);
    html += /*html*/`
      <article>
        <img src="${brand.img}">
        ${generateFavBrandButton(brand.id)}
      </article>
    `;
  }
  // if no brands display a default text
  if (_favBrands.length === 0) {
    html = "<p>Ingen brands er blevet tilføjet</p>"
  }
  document.querySelector("#fav-brand-container").innerHTML = html;
}

/**
 * Generating the fav button
 */
function generateFavBrandButton(brandId) {
  let btnTemplate = `
    <button onclick="addToFavourites('${brandId}')">Tilføj brand</button>`;
  if (isFavBrand(brandId)) {
    btnTemplate = `
      <button onclick="removeFromFavourites('${brandId}')" class="rm">Fjern brand</button>`;
  }
  return btnTemplate;
}

/**
 * Adding brand to favorites by given brandId
 */
function addToFavourites(brandId) {
  let favBrand = _brands.find(brand => brand.id === brandId);
  _favBrands.push(favBrand);
  appendBrands(_brands); // update the DOM to display the right button
  appendFavBrands(); // update the DOM to display the right items from the _favBrands list
}

/**
 * Removing brand from favorites by given brandId
 */
function removeFromFavourites(brandId) {
  _favBrands = _favBrands.filter(brand => brand.id !== brandId);
  appendBrands(_brand); // update the DOM to display the right button
  appendFavBrands(); // update the DOM to display the right items from the _favBrands list
}

/**
 * Checking if brand already is added to _favBrands
 */
function isFavBrand(brandId) {
  return _favBrands.find(brand => brand.id === brandId); // checking if _favBrands has the brand with matching id or not
}

