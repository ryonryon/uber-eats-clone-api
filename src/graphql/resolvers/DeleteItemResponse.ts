import { DeleteResult } from "typeorm";

export default {
  affectedCount: async ({ affected }: DeleteResult, _: any) => {
    return affected || 0;
  },
  message: async ({ affected }: DeleteResult, _: any) => {
    return affected
      ? "the Item is successfully deleted"
      : "Something went wrong while deleting the item";
  },
};
