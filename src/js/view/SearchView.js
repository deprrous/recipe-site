require("@babel/polyfill");
import { elements } from "./Base";
const renderRecipe = (recipe, i) => {
  const markup = ` <li>
  <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
          <img src="${recipe.image_url}" alt="Test">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
  </a>
</li>`;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearchField = () => {
  elements.searchInput.value = "";
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
};

export const getInput = () => {
  return elements.searchInput.value;
};

export const renderRepices = (recipes) => {
  recipes.forEach((el, i) => {
    renderRecipe(el, i);
  });
};
