import { decorate, observable, computed } from "mobx";
import { instance } from "./instance";

class BookStore {
  books = [];

  query = "";

  loading = true;

  fetchBooks = async () => {
    try {
      const res = await instance.get("books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {}
  };

  addBook = async (newBook, author) => {
    newBook.authors = [author.id];
    try {
      const res = await instance.post("books/", newBook);
      const book = res.data;
      this.books.push(book);
      author.books.push(book.id);
      console.log("BOOK", book);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
