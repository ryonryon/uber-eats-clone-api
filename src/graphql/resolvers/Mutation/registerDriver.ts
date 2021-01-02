import { getConnection } from "typeorm";
import Driver from "../../../entities/Driver";
import User from "../../../entities/User";
import { decodeEntity } from "../../../utils/atob";

export default async (
  _: any,
  {
    id,
    firstName,
    lastName,
  }: {
    id: string;
    firstName: string;
    lastName: string;
  }
) => {
  const connection = getConnection();

  return connection.manager.transaction(async (transactionalEntityManager) => {
    const user = await connection.manager
      .getRepository(User)
      .findOne(decodeEntity(id));
    if (!user) throw new Error(`the user id:${id} doesn't exist`);
    if (user.registered) throw new Error("the user is already registered");

    user.registered = true;

    await transactionalEntityManager.getRepository(User).save(user);

    const driver = new Driver();
    driver.firstName = firstName;
    driver.lastName = lastName;

    await transactionalEntityManager.getRepository(Driver).save(driver);

    return user;
  });
};
