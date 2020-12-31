import { getConnection } from "typeorm";
import User from "../../../entities/User";
import UserType from "../../../entities/UserType";
import { decodeEntity } from "../../../utils/atob";

export default async (
  _: any,
  {
    id,
    type,
    address,
  }: {
    id: string;
    type: UserType;
    address: string | null;
  }
) => {
  if (type === UserType.CUSTOMER && !address)
    throw new Error("Customer type needs address");

  const user = await getConnection()
    .manager.getRepository(User)
    .findOne(decodeEntity(id));
  if (!user) throw new Error(`the user id:${id} doesn't exist`);
  console.log("user.registered", user.registered);
  console.log("user.registered", id);
  if (user.registered) throw new Error("the user is already registered");

  user.registered = true;
  user.type = type;
  user.address = address ? address : null;

  await getConnection().manager.getRepository(User).save(user);

  return user;
};
