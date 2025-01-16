// Common options that can be reused across menu items
const COMMON_OPTIONS = {
    toppings: [
        { name: "Pepperoni" },
        { name: "Meatball" },
        { name: "Canadian Bacon" },
        { name: "Ham" },
        { name: "Pineapple" },
        { name: "Onions" },
        { name: "Green Peppers" },
        { name: "Black Olives" },
        { name: "Banana Peppers" },
        { name: "Jalapenos" },
        { name: "Mushrooms" },
        { name: "Extra Cheese" }
    ],

    saladOptions: [
        { name: "Caesar Salad" },
        { name: "House Salad w Ranch" },
        { name: "House Salad w Italian" },
        { name: "3 Garlic Knots" }
    ],

    pastaOptions: [
        { name: "Penne" },
        { name: "Spaghetti" }
    ],

    pizzaSizes: {
        slice: { name: "Slice", toppingPrice: 0.75 },
        small: { name: "10 inch", toppingPrice: 1.50 },
        medium: { name: "14 inch", toppingPrice: 2.00 },
        large: { name: "18 inch", toppingPrice: 2.50 },
        xlarge: { name: "23 inch", toppingPrice: 3.00 },
        calzone: { name: "Calzone", toppingPrice: 2.99 }
    },

    extraOptions: [
        { name: "Meat Sauce", price: 1.25 }
    ],

    generalPizzaMods: {
        options: [
            { name: "No Cheese", price: 0 },
            { name: "Light Cheese", price: 0 },
            { name: "No Sauce", price: 0 },
            { name: "Light Sauce", price: 0 },
            { name: "Extra Sauce", price: 0.50 },
            { name: "Double Cut", price: 0 },
            { name: "Well Done", price: 0 },
            { name: "Light Cook", price: 0 },
            { name: "Square Cut", price: 0 },
            { name: "16 Slices", price: 0 },
        ]
    }
}

export const menuItems = {
    "Lunch Specials": [
        {
            name: "#1 Pizza Special Lunch Special",
            description: "1 slice, 1 topping, choice of salad, all you can drink.",
            choose_option: {
                options: [
                    { name: "Lunch", price: 10.95 }
                ]
            },
            choose_topping: {
                options: COMMON_OPTIONS.toppings
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pricing: COMMON_OPTIONS.pizzaSizes.slice.toppingPrice
            },
            choose_salad: {
                options: COMMON_OPTIONS.saladOptions
            }
        },
        {
            name: "#2 Pasta Lunch Special",
            description: "Penne or spaghetti, choice of salad, all you can drink.",
            choose_option: {
                options: [
                    { name: "Lunch", price: 13.95 }
                ]
            },
            choose_pasta: {
                options: COMMON_OPTIONS.pastaOptions
            },
            // Price is different for each extra option
            add_extra: {
                options: COMMON_OPTIONS.extraOptions
            },
            choose_salad: {
                options: COMMON_OPTIONS.saladOptions
            }
        },
        {
            name: "#3 Calzone Lunch Special",
            description: "One topping, choice of salad. All you can drink.. Please allow 10-15 minutes.",
            choose_option: {
                options: [
                    { name: "Lunch", price: 12.95 }
                ]
            },
            choose_topping: {
                options: COMMON_OPTIONS.toppings
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pricing: COMMON_OPTIONS.pizzaSizes.slice.toppingPrice
            },
            choose_salad: {
                options: COMMON_OPTIONS.saladOptions
            }
        }
    ],
    "Pizza": [
        {
            name: "Cheese Pizza",
            description: "Classic cheese or create your own pizza.",
            choose_option: {
                options: [
                    { name: "10 inch", price: 13.99 },
                    { name: "14 inch", price: 17.99 },
                    { name: "18 inch", price: 21.99 },
                    { name: "23 inch", price: 25.99 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pizza_sizes: Object.values(COMMON_OPTIONS.pizzaSizes).map(size => ({
                    name: size.name,
                    price: size.toppingPrice
                }))
            },
            // Price is different for each general pizza mod
            general_pizza_mod: COMMON_OPTIONS.generalPizzaMods
        }
    ],
    "Calzones": [
        {
            name: "Calzone",
            description: "Includes One Topping. Additional Toppings $2.99 each.",
            choose_option: {
                options: [
                    { name: "Large", price: 15.50 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pricing: COMMON_OPTIONS.pizzaSizes.calzone.toppingPrice
            }
        },
        {
            name: "White Calzone",
            description: "Ricotta, mozzarella, alfredo, garlic, spinach.",
            choose_option: {
                options: [
                    { name: "Large", price: 15.50 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pricing: COMMON_OPTIONS.pizzaSizes.calzone.toppingPrice
            }
        }
    ]
}