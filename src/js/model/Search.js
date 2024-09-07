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

      this.res = res.data.recipes;
      return this.res;
    } catch (error) {
      alert(error);
    }
  }
}
