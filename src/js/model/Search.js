require("@babel/polyfill");
import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async doSearch() {
    try {
      let res = await axios(
        "https://forkify-api.herokuapp.com/api/search?q=" + this.query
      );

      this.result = res.data.recipes;
      return this.result;
    } catch (error) {
      console.log("Асуудал гарлаа: " + error);
    }
  }
}
