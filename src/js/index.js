require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/Base";
import * as searchView from "./view/SearchView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import * as listView from "./view/ListView";
import Like from "./model/Like";
import * as likeView from "./view/LikeView";
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

  if (id) {
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
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);
window.addEventListener("load", (e) => {
  //app achaallagdahad model uusne like-iin
  if (!state.likes) {
    state.likes = new Like();
  }
  // like tsesiig haah
  likeView.toggleLikeMenu(state.likes.getNumberOfLikes());
  // likeuud baiwal tsesend gargah
  state.likes.likes.forEach((like) => likeView.renderLike(like));
});
const controlList = () => {
  // Nairlagiin modeliig uusgene.
  state.list = new List();

  // umnuh hogooo zailuulnaa
  listView.clearItems();
  // ug modelruu oddo haragdaj baigaa jornii buh nairlagiig awj hiine.
  state.recipe.ingredients.forEach((n, i) => {
    //nairlagiig modelruu hiine.
    const item = state.list.addItem(n);

    // nairlagiig delgetsend gargana
    listView.renderItem(item);
  });
};

// likes controller
const controlLike = () => {
  // 1 like iin modeliig uusgene.
  // if (!state.likes) {
  //   state.likes = new Like();
  // }
  // 2 odoo haragdaj baigaa joriin id-g olj awah
  const currentRecipeid = state.recipe.id;
  // 3 ene joriig likelasan esehiig shalgah
  if (state.likes.isLiked(currentRecipeid)) {
    // likelaagui bol likelna
    const newLike = state.likes.addLike(
      currentRecipeid,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    likeView.renderLike(newLike);
    likeView.toggleLikeBtn(true);
  } else {
    // likelasan bol boliulna
    state.likes.deleteLike(currentRecipeid);
    likeView.toggleLikeBtn(false);
    likeView.clearLike(currentRecipeid);
  }
  likeView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  } else if (e.target.matches(".recipe__love,.recipe__love *")) {
    controlLike();
  }
});

document.querySelector(".shopping__list").addEventListener("click", (e) => {
  if (e.target.closest(".shopping__delete")) {
    const item = e.target.closest(".shopping__item").dataset.item_id;
    const id = item;
    // modelees ustgana.
    state.list.deleteItem(id);
    // delgetsees ustgana
    listView.deleteItem(id);
  }
});
