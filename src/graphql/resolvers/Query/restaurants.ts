import { getConnection } from "typeorm";
import Restaurant from "../../../entity/Restaurant";

export default async () => {
  return await getConnection().manager.find(Restaurant);
};
