export default class Like {
  constructor() {
    this.getDataFromLocalStorage();
    if (!this.likes) this.likes = [];
  }
  addLike(id, title, publisher, img) {
    const like = { id, title, publisher, img };
    this.likes.push(like);

    // storage ruu hadgalna
    this.saveData();
    return like;
  }
  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);
    // storage ruu hadgalna
    this.saveData();
  }
  isLiked(id) {
    if (this.likes.findIndex((el) => el.id === id) !== -1) return false;
    else return true;
  }
  getNumberOfLikes() {
    return this.likes.length;
  }
  saveData() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }
  getDataFromLocalStorage() {
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}
