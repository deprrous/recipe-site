require("@babel/polyfill");
import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      let res = await axios(
        "https://forkify-api.herokuapp.com/api/get?rId=" + this.id
      );

      this.publisher = res.data.recipe.publisher;
      this.ingredients = res.data.recipe.ingredients;
      this.source_url = res.data.recipe.source_url;
      this.image_url = res.data.recipe.image_url;
      this.publisher_url = res.data.recipe.publisher_url;
      this.title = res.data.recipe.title;
      this.social_rank = res.data.recipe.social_rank;
    } catch (error) {
      console.log("Асуудал гарлаа: " + error);
    }
  }

  calcTime() {
    let len;
    if (Array.isArray(this.ingredients)) {
      len = this.ingredients.length;
    } else {
      console.log("this is not array");
    }
    this.time = len * 5;
  }
  calcHuniiToo() {
    this.huniiToo = 4;
  }
}
