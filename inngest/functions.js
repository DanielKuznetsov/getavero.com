import { inngest } from "./client";
import { serve } from "inngest/next";
import { insertMenuItemsUtil } from "@/utils/menu/menu";

export const insertMenuItems = inngest.createFunction(
    { name: "Insert Menu Items" },
    { event: "menu.items.insert" },
    async ({ event, step }) => {
      const { restaurantId } = event.data;
      
      const result = await insertMenuItemsUtil(restaurantId);

      if (result.success) {
        return {
          success: true,
          message: result.message,
          inserted: result.inserted,
          duplicates: result.duplicates.length
        };
      } else {
        return {
          success: false,
          message: result.message,
          error: result.error
        };
      }
    }
);

export default serve({
  client: inngest,
  functions: [
        insertMenuItems
  ],
  streaming: "allow",
});
