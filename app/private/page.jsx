import NewRestaurantForm from "@/components/ui/custom-large/new-restaurant-form";
import AddMenuItems from "@/components/ui/custom-large/add-menu-items";
import AddDishCategories from "@/components/ui/custom-large/add-dish-categories";


export default function Page() {
    return (
        <div className="flex gap-4 p-4">
            {/* Add New Restaurant */}
            <NewRestaurantForm />

            {/* Edit/Remove Existing Restaurant */}

            {/* Add Dish Categories */}
            <AddDishCategories />

            {/* Edit/Remove Existing Dish Categories */}

            {/* Add Menu Items */}  
            <AddMenuItems />

            {/* Edit/Remove Existing Menu Items */}
        </div>
    );
}


// Need to add several components here:
// 1. New restaurant form
// 2. Menu items form

