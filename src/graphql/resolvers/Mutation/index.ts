import { getConnection } from "typeorm";
import User from "../../../entity/User";

export default {
  createUser: async (
    _: any,
    {
      firstName,
      lastName,
      email,
      iconUrl,
      address,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      iconUrl: string;
      address: string;
    }
  ) => {
    const user = new User();

    //TODO add validation
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.iconUrl = iconUrl;
    user.address = address;

    return await getConnection().manager.save(user);
  },
};
