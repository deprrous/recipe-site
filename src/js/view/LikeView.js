import { elements } from "./Base";
export const toggleLikeBtn = (isLiked) => {
  const iconString = isLiked ? `icon-heart` : `icon-heart-outlined`;
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = (numLikes) => {
  if (numLikes === 0) {
    elements.likesMenu.style.visibility = "hidden";
  } else {
    elements.likesMenu.style.visibility = "visible";
  }
};

export const renderLike = (newLike) => {
  const html = `   <li>
    <a class="likes__link" href="#${newLike.id}">
        <figure class="likes__fig">
            <img src="${newLike.img}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${newLike.title}</h4>
            <p class="likes__author">${newLike.publisher}</p>
        </div>
    </a>
</li>`;
  elements.likesList.insertAdjacentHTML("beforeend", html);
};
export const clearLike = (id) => {
  const el = document.querySelector(`.likes__link[href="#${id}"]`);
  if (el) el.parentElement.remove();
};
