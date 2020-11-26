import { getConnection } from "typeorm";
import Book from "../../../entity/Book";

export default {
  createBooks: async () => {
    const user = new Book();

    user.title = "Marnie movie";
    user.author = "Timber Saw";

    console.log("user", user);

    await getConnection().manager.save(user);
  },
};
