import { encodeEntity } from "../../utils/btoa";
import User from "../../entities/User";

export default {
  id: async (source: User, _: any) => {
    return encodeEntity(source.id, "user");
  },
};
