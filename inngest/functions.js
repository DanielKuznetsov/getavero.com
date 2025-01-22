import { inngest } from "./client";
import { serve } from "inngest/next";

export const insertMenuItems = inngest.createFunction(
    { name: "Insert Menu Items" },
    { event: "menu.items.insert" },
    async ({ event, step }) => {
      const { restaurantId, menuItems } = event.data;
      let inserted = 0;
      let duplicates = [];
  
      for (const item of menuItems) {
        await step.run(`Insert ${item.name}`, async () => {
          // Check if the item already exists
          const { data: existingItem } = await step.run(`Check existing ${item.name}`, async () => {
            // Simulate the database check
            return { data: null }; // Assume it doesn't exist for this example
          });
  
          if (existingItem) {
            duplicates.push(item.name);
          } else {
            // Simulate inserting the item
            await step.run(`Insert ${item.name} to database`, async () => {
              // Here you would typically insert into your database
              // For now, we'll just increment the counter
              inserted++;
            });
          }
        });
      }
  
      let message = `${inserted} menu items inserted successfully.`;
      if (duplicates.length > 0) {
        message += ` ${duplicates.length} duplicate items were skipped.`;
      }
  
      return {
        success: true,
        message: message,
        inserted: inserted,
        duplicates: duplicates.length
      };
    }
  );

export default serve({
  client: inngest,
  functions: [
        insertMenuItems
  ],
  streaming: "allow",
});
