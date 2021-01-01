import { getConnection } from "typeorm";
import Customer from "../../../entities/Customer";
import User from "../../../entities/User";
import { decodeEntity } from "../../../utils/atob";

export default async (
  _: any,
  {
    id,
    firstName,
    lastName,
    address,
  }: {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
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

    const customer = new Customer();
    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.address = address;

    await transactionalEntityManager.getRepository(Customer).save(customer);

    return user;
  });
};
