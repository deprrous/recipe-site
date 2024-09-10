require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/Base";
import * as searchView from "./view/SearchView";
import Recipe from "./model/Recipe";
import {
  highlightSelectedRecipe,
  renderRecipe,
  clearRecipe,
} from "./view/RecipeView";
/**
 * Web app tuluw
 * -Hailtiin query,ur dun
 * -Tuhain uzuulj baigaa jor
 * -likelasan joruud
 * -zahialj baigaa joriin nairlaguud
 */

const state = {};
// search controller
const controlSearch = async () => {
  // 1.webees hailtiin tulhuur ugiig gargaj awna.
  const query = searchView.getInput();
  if (query) {
    //2.shineer hailtiin object uusgej ugnu.
    state.search = new Search(query);
    //3.hailt hiihed zoriulj delgetsiin UI iig beltgene.
    searchView.clearSearchField();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    // 4.hailtiig guitsetgene
    await state.search.doSearch();
    // 5.hailtiig ur dung delkgetsend gargana.
    clearLoader();
    if (state.search.result === undefined) {
      alert("Илэрц олдсонгүй...");
    } else {
      searchView.renderRepices(state.search.result);
    }
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-inline");

  if (btn) {
    const goto = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRepices(state.search.result, goto);
  }
});

// Joriin controller

const controlRecipe = async () => {
  // 1 URL-s ID-g salgaj awna
  const id = window.location.hash.replace("#", "");
  // 2 joriin mododeliig uusgej ugnu
  state.recipe = new Recipe(id);
  // 3 UI delgetsiig beltgene
  renderLoader(elements.recipeDiv);

  highlightSelectedRecipe(id);
  clearRecipe();
  // 4 Joroo tataj awch irne
  await state.recipe.getRecipe();
  clearLoader();
  // 5 joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno.
  state.recipe.calcTime();
  state.recipe.calcHuniiToo();

  // 6 joroo delgetsend gargana
  renderRecipe(state.recipe);
};

window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
