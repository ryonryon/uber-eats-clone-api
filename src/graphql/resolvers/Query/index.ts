import { getConnection } from "typeorm";
import Book from "../../../entity/Book";

export default {
  books: async () => {
    const books = await getConnection().manager.find(Book);

    console.log("books", books);

    return books;
  },
};
