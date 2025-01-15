import NewRestaurantForm from "@/components/ui/custom-large/new-restaurant-form";
import AddMenuItems from "@/components/ui/custom-large/add-menu-items";
import AddDishCategories from "@/components/ui/custom-large/add-dish-categories";

// Need to import signed in and signed out components
import { SignedIn, SignedOut } from "@clerk/nextjs";



export default async function Home() {

  return (
    <div className="flex gap-4 p-4">
      <SignedIn>


        {/* Add New Restaurant */}
        <NewRestaurantForm />

        {/* Edit/Remove Existing Restaurant */}

        {/* Add Dish Categories */}
        <AddDishCategories />

        {/* Edit/Remove Existing Dish Categories */}

        {/* Add Menu Items */}
        <AddMenuItems />

        {/* Edit/Remove Existing Menu Items */}
      </SignedIn>

      <SignedOut>
        <p>Marketing Page</p>
      </SignedOut>
    </div>
  );
}
