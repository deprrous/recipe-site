import { elements } from "./Base";
export const renderItem = (item) => {
  const html = `  <li class="shopping__item" data-item_id=${item.id}>
    <div class="shopping__count">
        <input type="number" value="500" step="100">
        <p>g</p>
    </div>
    <p class="shopping__description">${item.item}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
</li>`;
  elements.listDiv.insertAdjacentHTML("beforeend", html);
};

export const clearItems = () => (elements.listDiv.innerHTML = "");

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-item_id="${id}"]`);
  item.parentElement.removeChild(item);
};
