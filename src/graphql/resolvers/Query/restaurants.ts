import { getConnection } from "typeorm";
import Restaurant from "../../../entities/Restaurant";

export default async () => {
  return await getConnection().manager.find(Restaurant);
};
