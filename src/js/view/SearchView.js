require("@babel/polyfill");
import { elements } from "./Base";
const renderRecipe = (recipe) => {
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
  elements.pageButtons.innerHTML = "";
};

export const getInput = () => {
  return elements.searchInput.value;
};

export const renderRepices = (recipes, currentPage = 1, resPerPage = 7) => {
  // hailtiin ur dung huudaslah
  // currentPage = 2 , start = 10,end = 20
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // huudasnii towchiig gargaj ireh
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto = ${page}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
<span>Хуудас ${page}</span>
</button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHtml;
  if (currentPage === 1 && totalPages > 1) {
    // 1-r haadas deer baina , 2r huudas gdg towchiig gargana.
    buttonHtml = createButton(currentPage + 1, "next", "right");
  } else if (currentPage < totalPages) {
    // dund baina umnuh daraah towch baina.
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    // hamgiin suuliin huudas deer baina,
    buttonHtml = createButton(totalPages - 1, "prev", "left");
  }
  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
  buttonHtml = "";
};
