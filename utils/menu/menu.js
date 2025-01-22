'use server'

import supabase from "@/utils/supabaseClient";

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
        medium: { name: "14 inch", toppingPrice: 2.99 },
        large: { name: "18 inch", toppingPrice: 4.75 },
        xlarge: { name: "23 inch", toppingPrice: 5.75 },
        calzone: { name: "Calzone", toppingPrice: 2.99 }
    },

    extraOptions: [
        { name: "Meat Sauce", price: 1.25 },
        { name: "Ranch Dressing", price: 0.50 },
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
    },

    saladMods: {
        options: [
            { name: "No Onions", price: 0 },
            { name: "No Croutons", price: 0 },
            { name: "No Tomatoes", price: 0 },
            { name: "No Pepperonchini", price: 0 },
            { name: "No Cheese", price: 0 },
            { name: "No Olives", price: 0 },
            { name: "Extra Olives", price: 0.50 },
            { name: "Cheese", price: 0.50 },
            { name: "Croutons", price: 0 },
            { name: "Chicken", price: 3.50 },
            { name: "Croutons on the Side", price: 0 },
            { name: "Dressing on the Side", price: 0 },
        ]
    }
}

export const menuItems = {
    // "Lunch Specials": [
    //     {
    //         name: "#1 Pizza Special Lunch Special",
    //         description: "1 slice, 1 topping, choice of salad, all you can drink.",
    //         choose_option: {
    //             options: [
    //                 { name: "Lunch", price: 10.95 }
    //             ]
    //         },
    //         choose_topping: {
    //             options: COMMON_OPTIONS.toppings
    //         },
    //         add_toppings: {
    //             options: COMMON_OPTIONS.toppings,
    //             pricing: COMMON_OPTIONS.pizzaSizes.slice.toppingPrice
    //         },
    //         choose_salad: {
    //             options: COMMON_OPTIONS.saladOptions
    //         }
    //     },
    //     {
    //         name: "#2 Pasta Lunch Special",
    //         description: "Penne or spaghetti, choice of salad, all you can drink.",
    //         choose_option: {
    //             options: [
    //                 { name: "Lunch", price: 13.95 }
    //             ]
    //         },
    //         choose_pasta: {
    //             options: COMMON_OPTIONS.pastaOptions
    //         },
    //         // Price is different for each extra option
    //         add_extra: {
    //             options: COMMON_OPTIONS.extraOptions
    //         },
    //         choose_salad: {
    //             options: COMMON_OPTIONS.saladOptions
    //         }
    //     },
    //     {
    //         name: "#3 Calzone Lunch Special",
    //         description: "One topping, choice of salad. All you can drink.. Please allow 10-15 minutes.",
    //         choose_option: {
    //             options: [
    //                 { name: "Lunch", price: 12.95 }
    //             ]
    //         },
    //         choose_topping: {
    //             options: COMMON_OPTIONS.toppings
    //         },
    //         add_toppings: {
    //             options: COMMON_OPTIONS.toppings,
    //             pricing: COMMON_OPTIONS.pizzaSizes.slice.toppingPrice
    //         },
    //         choose_salad: {
    //             options: COMMON_OPTIONS.saladOptions
    //         }
    //     }
    // ],
    "Pizza": [
        {
            name: "Cheese Pizza",
            description: "Classic cheese or create your own pizza.",
            choose_option: {
                options: [
                    { name: "10 inch", price: 10.99 },
                    { name: "14 inch", price: 21.99 },
                    { name: "18 inch", price: 26.99 },
                    { name: "23 inch", price: 35.99 }
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
        },
        {
            name: "Buffalo Chicken Bacon Pizza",
            description: "Home-made ranch, chicken, red onion, cilantro, bacon our buffalo sauce & mozzarella cheese.",
            choose_option: {
                options: [
                    { name: "10 inch", price: 17.99 },
                    { name: "14 inch", price: 28.99 },
                    { name: "18 inch", price: 34.99 },
                    { name: "23 inch", price: 45.99 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pizza_sizes: Object.values(COMMON_OPTIONS.pizzaSizes).map(size => ({
                    name: size.name,
                    price: size.toppingPrice
                }))
            },
            remove_toppings: {
                options: COMMON_OPTIONS.toppings
            },
            // Price is different for each general pizza mod
            general_pizza_mod: COMMON_OPTIONS.generalPizzaMods
        },
        {
            name: "Vodka Sauce Pizza",
            description: "New amazing vodka sauce pizza.",
            choose_option: {
                options: [
                    { name: "10 inch", price: 14.99 },
                    { name: "14 inch", price: 23.99 },
                    { name: "18 inch", price: 28.99 },
                    { name: "23 inch", price: 36.99 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pizza_sizes: Object.values(COMMON_OPTIONS.pizzaSizes).map(size => ({
                    name: size.name,
                    price: size.toppingPrice
                }))
            },
            remove_toppings: {
                options: COMMON_OPTIONS.toppings
            },
            // Price is different for each general pizza mod
            general_pizza_mod: COMMON_OPTIONS.generalPizzaMods
        },
        {
            name: "Meat Lovers Pizza",
            description: "2 kinds of pepperoni, Italian sausage, ham, and bacon.",
            choose_option: {
                options: [
                    { name: "10 inch", price: 17.99 },
                    { name: "14 inch", price: 28.99 },
                    { name: "18 inch", price: 39.99 },
                    { name: "23 inch", price: 53.99 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pizza_sizes: Object.values(COMMON_OPTIONS.pizzaSizes).map(size => ({
                    name: size.name,
                    price: size.toppingPrice
                }))
            },
            remove_toppings: {
                options: COMMON_OPTIONS.toppings
            },
            // Price is different for each general pizza mod
            general_pizza_mod: COMMON_OPTIONS.generalPizzaMods
        },
        {
            name: "Famous BBQ Chicken Pizza",
            description: "BBQ sauce, mozzarella, grilled chicken, red onion, cilantro.",
            choose_option: {
                options: [
                    { name: "10 inch", price: 17.99 },
                    { name: "14 inch", price: 28.99 },
                    { name: "18 inch", price: 35.99 },
                    { name: "23 inch", price: 45.99 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pizza_sizes: Object.values(COMMON_OPTIONS.pizzaSizes).map(size => ({
                    name: size.name,
                    price: size.toppingPrice
                }))
            },
            remove_toppings: {
                options: COMMON_OPTIONS.toppings
            },
            // Price is different for each general pizza mod
            general_pizza_mod: COMMON_OPTIONS.generalPizzaMods
        },
        {
            name: "Enzo's Signature Pizza",
            description: "Pepperoni, italian sausage, red onions, black olives and green peppers!",
            choose_option: {
                options: [
                    { name: "10 inch", price: 17.99 },
                    { name: "14 inch", price: 29.99 },
                    { name: "18 inch", price: 39.99 },
                    { name: "23 inch", price: 49.99 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pizza_sizes: Object.values(COMMON_OPTIONS.pizzaSizes).map(size => ({
                    name: size.name,
                    price: size.toppingPrice
                }))
            },
            remove_toppings: {
                options: COMMON_OPTIONS.toppings
            },
            // Price is different for each general pizza mod
            general_pizza_mod: COMMON_OPTIONS.generalPizzaMods
        },
        {
            name: "White Pizza",
            description: "Alfredo sauce, mozzarella, garlic, spinach, ricotta cheese.",
            choose_option: {
                options: [
                    { name: "10 inch", price: 17.99 },
                    { name: "14 inch", price: 28.99 },
                    { name: "18 inch", price: 34.99 },
                    { name: "23 inch", price: 45.99 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pizza_sizes: Object.values(COMMON_OPTIONS.pizzaSizes).map(size => ({
                    name: size.name,
                    price: size.toppingPrice
                }))
            },
            remove_toppings: {
                options: COMMON_OPTIONS.toppings
            },
            // Price is different for each general pizza mod
            general_pizza_mod: COMMON_OPTIONS.generalPizzaMods
        },
        {
            name: "Veggie Pizza",
            description: "Spinach, red onions, green peppers, tomato, mushrooms.",
            choose_option: {
                options: [
                    { name: "10 inch", price: 17.99 },
                    { name: "14 inch", price: 28.99 },
                    { name: "18 inch", price: 34.99 },
                    { name: "23 inch", price: 45.99 }
                ]
            },
            add_toppings: {
                options: COMMON_OPTIONS.toppings,
                pizza_sizes: Object.values(COMMON_OPTIONS.pizzaSizes).map(size => ({
                    name: size.name,
                    price: size.toppingPrice
                }))
            },
            remove_toppings: {
                options: COMMON_OPTIONS.toppings
            },
            // Price is different for each general pizza mod
            general_pizza_mod: COMMON_OPTIONS.generalPizzaMods
        }
    ],
    "Gluten Free Pizzas": [
        {
            name: "Gluten Free Pizza",
            description: "Pizza on a gluten free crust.",
            choose_option: {
                options: [
                    { name: "10 inch", price: 13.99 },
                    { name: "14 inch", price: 22.99 },
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
    "Starters & Sides": [
        {
            name: "Garlic Knots",
            description: "Our fresh dough cooked with our special garlic sauce!",
            choose_option: {
                options: [
                    { name: "1/2 Order (3 Pieces)", price: 4.99 },
                    { name: "Full Order (6 Pieces)", price: 6.75 },
                ]
            },
        },
        {
            name: "Garlic Bread",
            description: "Fresh French Baguette toasted with our special butter garlic sauce served with our homemade marinara sauce.",
            choose_option: {
                options: [
                    { name: "Appetizer", price: 6.99 },
                ]
            },
        },
        {
            name: "Cheese Garlic Bread",
            description: "Fresh Garlic Bread with melted fresh mozzarella cheese!",
            choose_option: {
                options: [
                    { name: "Appetizer", price: 7.99 },
                ]
            },
        },
        {
            name: "Side Of Italian Beef Meatballs",
            description: "Large homemade beef meatballs in our special marinara sauce!",
            choose_option: {
                options: [
                    { name: "3 Meatballs", price: 8.50 },
                ]
            },
        },
        {
            name: "Side Of Italian Sausage",
            description: "Spicy italian sausage served with our special homemade marinara sauce!",
            choose_option: {
                options: [
                    { name: "2 Sausages", price: 8.50 },
                ]
            },
        },
        {
            name: "Grilled Chicken Breast",
            description: "Fresh grilled marinated chicken!",
            choose_option: {
                options: [
                    { name: "Appetizer", price: 7.95 },
                ]
            },
        },
        {
            name: "Buffalo Chicken Wings",
            description: "Marinated spicy chicken wings!",
            choose_option: {
                options: [
                    { name: "6 Pieces", price: 11.99 },
                    { name: "12 Pieces", price: 21.99 },
                ]
            },
            add_extra: {
                options: COMMON_OPTIONS.extraOptions
            }
        },
        {
            name: "Garlic Parmesan Wings",
            description: "Our Marinated Wings tossed in our new Garlic Parmesan Sauce!",
            choose_option: {
                options: [
                    { name: "6 Pieces", price: 11.99 },
                    { name: "12 Pieces", price: 21.99 },
                ]
            },
            add_extra: {
                options: COMMON_OPTIONS.extraOptions
            }
        },
        {
            name: "Honey BBQ Wings",
            description: "Our special marinated chicken wings tossed in our new honey BBQ sauce!",
            choose_option: {
                options: [
                    { name: "6 Pieces", price: 11.99 },
                    { name: "12 Pieces", price: 21.99 },
                ]
            },
            add_extra: {
                options: COMMON_OPTIONS.extraOptions
            }
        },
        {
            name: "Crispy Chicken Breast Tenders",
            description: "Our special marinated chicken breast tenders!",
            choose_option: {
                options: [
                    { name: "3 Pieces", price: 7.99 },
                    { name: "5 Pieces", price: 10.99 },
                ]
            },
            add_extra: {
                options: COMMON_OPTIONS.extraOptions
            }
        },
        {
            name: "Homemade Ranch Dressing",
            description: "Home-made special ranch sauce and dressing! Best seller!",
            choose_option: {
                options: [
                    { name: "Small (2 oz.)", price: 1.00 },
                    { name: "Large (4 oz.)", price: 2.50 },
                ]
            }
        },
        {
            name: "Hand Made Italian Mozzarella Sticks",
            description: "#1 best seller! Fresh mozzarella cheese stick covered with our special italian season breading cooked to perfection served with our delicious home-made marinara sauce!",
            choose_option: {
                options: [
                    { name: "Appetizer", price: 10.50 },
                ]
            }
        },
        {
            name: "Buffalo Ranch Famous French Fries",
            description: "Our famous fries seasoned and topped with our home-made ranch and special buffalo sauce!",
            choose_option: {
                options: [
                    { name: "Appetizer", price: 7.99 },
                ]
            }
        },
        {
            name: "Famous French Fries",
            description: "Our famous crispy seasoned french fries!",
            choose_option: {
                options: [
                    { name: "Appetizer", price: 6.99 },
                ]
            }
        }
    ],
    "Salads": [
        {
            name: "Caesar Salad",
            description: "Fresh lettuce, croutons, and our homemade ceasar dressing!",
            choose_option: {
                options: [
                    { name: "Half Size (Regular)", price: 8.50 },
                    { name: "Full Size (Large)", price: 13.99 },
                ]
            },
            salad_mods: COMMON_OPTIONS.saladMods
        },
        {
            name: "House Salad",
            description: "Fresh lettuce, tomato, red onions, black olives, banana peppers, and our homemade italian dressing!",
            choose_option: {
                options: [
                    { name: "Half Size (Regular)", price: 7.50 },
                    { name: "Full Size (Large)", price: 12.99 },
                ]
            },
            salad_mods: COMMON_OPTIONS.saladMods
        },
        {
            name: "Grilled Chicken Caesar Salad",
            description: "Fresh grilled chicken, croutons, and our homemade ceasar dressing!",
            choose_option: {
                options: [
                    { name: "Large", price: 15.99 },
                ]
            },
            salad_mods: COMMON_OPTIONS.saladMods
        },
        {
            name: "Grilled Chicken House Salad",
            description: "Fresh grilled chicken, tomato, red onions, black olives, banana peppers, and our homemade italian dressing!",
            choose_option: {
                options: [
                    { name: "Large", price: 15.99 },
                ]
            },
            salad_mods: COMMON_OPTIONS.saladMods
        },
        {
            name: "Antipasto Salad",
            description: "Canadian bacon, ham, genoa salami , Pepperoni, mozzarella cheese, tomatoes, italian kalamata olives & pepperoncini on our garden salad!",
            choose_option: {
                options: [
                    { name: "Large", price: 17.99 },
                ]
            },
            salad_mods: COMMON_OPTIONS.saladMods
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
    ],
    "Hero Sandwiches": [
        {
            name: "Chicken Parmesan Sandwich",
            description: "French roll, crispy chicken breast, with our special homemade marinara sauce & cheese.",
            choose_option: {
                options: [
                    { name: "Sandwich", price: 12.95 },
                ]
            }
        },
        {
            name: "Eggplant Parmesan Sandwich",
            description: "French roll, fried eggplant, with tomato sauce & cheese.",
            choose_option: {
                options: [
                    { name: "Sandwich", price: 15.95 },
                ]
            }
        },
        {
            name: "Grilled Chicken Sandwich",
            description: "French roll, grilled chicken breast with fresh tomato, lettuce & italian dressing.",
            choose_option: {
                options: [
                    { name: "Sandwich", price: 15.95 },
                ]
            }
        },
        {
            name: "Sausage Parmesan Sandwich",
            description: "French roll, sausage with tomato sauce & cheese.",
            choose_option: {
                options: [
                    { name: "Large", price: 15.95 },
                ]
            }
        },
        {
            name: "Homemade Beef Meatball Parmesan Sandwich",
            description: "French roll, seasoned all beef meatballs with our special marinara sauce & cheese. Best seller.",
            choose_option: {
                options: [
                    { name: "Large", price: 15.95 },
                ]
            }
        },
        {
            name: "Famous Italian Sandwich",
            description: "French roll, pepperoni, ham, salami, mozzarella cheese, tomatoes, italian kalamata olives & pepperoncini on our garden salad.",
            choose_option: {
                options: [
                    { name: "Large", price: 15.95 },
                ]
            }
        },
        {
            name: "Beef Meatball Deluxe Sandwich",
            description: "All beef homemade meatballs with special tomato sauce & cheese served on garlic bread.",
            choose_option: {
                options: [
                    { name: "Large", price: 15.95 },
                ]
            }
        },
        {
            name: "Sausage & Peppers Sandwich",
            description: "French roll, seasoned sausage, green peppers, onions, tomatoes, mozzarella cheese, & italian seasoning.",
            choose_option: {
                options: [
                    { name: "Large", price: 15.95 },
                ]
            }
        }
    ],
    "Entrees":[
        {
            name: "Chicken Parmesan Dinner",
            description: "Served with Salad, Side of Pasta & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 19.95 },
                ]
            },
            choose_pasta: {
                options: COMMON_OPTIONS.pastaOptions
            },
            choose_salad: {
                options: COMMON_OPTIONS.saladOptions
            }
        },
        {
            name: "Eggplant Parmesan Dinner",
            description: "Served with Salad, Side of Pasta & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 19.95 },
                ]
            },
            choose_pasta: {
                options: COMMON_OPTIONS.pastaOptions
            },
            choose_salad: {
                options: COMMON_OPTIONS.saladOptions
            }
        },
        {
            name: "Meatball Parmesan Dinner",
            description: "Served with Salad, Side of Pasta & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 19.95 },
                ]
            },
            choose_pasta: {
                options: COMMON_OPTIONS.pastaOptions
            },
            choose_salad: {
                options: COMMON_OPTIONS.saladOptions
            }
        },
        {
            name: "Sausage Parmesan Dinner",
            description: "Served with Salad, Side of Pasta & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 19.95 },
                ]
            },
            choose_pasta: {
                options: COMMON_OPTIONS.pastaOptions
            },
            choose_salad: {
                options: COMMON_OPTIONS.saladOptions
            }
        }
    ],
    "Pastas": [
        {
            name: "Organic Penne Pasta",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 16.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Organic Spaghetti",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 16.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Cheese Ravioli",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 18.50 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Meat Ravioli",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 18.50 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Spinach Ravioli",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 18.50 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Organic Fettuccine Alfredo",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 16.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Organic Fettuccine Chicken Alfredo",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 19.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Organic Spaghetti With Meat Sauce",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 17.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Organic Penne With Meat Sauce",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 17.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Organic Spaghetti With Meatballs",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 19.45 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Organic Penne Pasta With Beef Meatballs",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 19.45 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        }
    ],
    "Enzo's Specialties": [
        {
            name: "Homemade Lasagna Meat & Cheese",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 19.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Homemade Lasagna Cheese Only",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 17.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Baked Ziti",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 17.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        },
        {
            name: "Baked Ziti with Meat Sauce",
            description: "Served with Salad & Bread",
            choose_option: {
                options: [
                    { name: "Entree", price: 19.95 },
                ],
                choose_salad: {
                    options: COMMON_OPTIONS.saladOptions
                }
            }
        }
    ],
    "Catering": [
        {
            name: "Penne Pasta Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 50.00 },
                    { name: "Full Tray", price: 100.00 },
                ]
            }
        },
        {
            name: "Spaghetti Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 50.00 },
                    { name: "Full Tray", price: 100.00 },
                ]
            }
        },
        {
            name: "Baked Ziti Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Cheese Lasagna Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Meat Lasagna Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Veggie Lasagna Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Eggplant Parmesan Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Meatball Parmesan Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 60.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Sausage Parmesan Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 70.00 },
                    { name: "Full Tray", price: 140.00 },
                ]
            }
        },
        {
            name: "Chicken Parmesan Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 140.00 },
                ]
            }
        },
        {
            name: "Italian Sausage Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 60.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Sausage & Peppers Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 60.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Antipasto Salad Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 150.00 },
                ]
            }
        },
        {
            name: "Chicken House Salad Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 150.00 },
                ]
            }
        },
        {
            name: "Chicken Caesar Salad Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 150.00 },
                ]
            }
        },
        {
            name: "House Salad Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 60.00 },
                    { name: "Full Tray", price: 95.00 },
                ]
            }
        },
        {
            name: "Caesar Salad Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 60.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Cheesecake Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Tiramisu Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Assorted Desserts Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 75.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        },
        {
            name: "Cannoli Catering",
            choose_option: {
                options: [
                    { name: "Half Tray", price: 60.00 },
                    { name: "Full Tray", price: 120.00 },
                ]
            }
        }
    ],
    "Desserts": [
        {
            name: "Tiramisu",
            choose_option: {
                options: [
                    { name: "Dessert", price: 6.75 },
                ]
            }
        },
        {
            name: "Cheesecake",
            choose_option: {
                options: [
                    { name: "Dessert", price: 6.75 },
                ]
            }
        },
        {
            name: "Cannoli",
            choose_option: {
                options: [
                    { name: "Dessert", price: 5.75 },
                ]
            }
        }
    ],
    "Beverages": [
        {
            name: "Soda",
            choose_option: {
                options: [
                    { name: "Can", price: 3.00 },
                    { name: "2 Liter", price: 5.50 },
                ],
                choose_soda: {
                    options: COMMON_OPTIONS.sodaOptions
                }
            }
        },
        {
            name: "Water",
            choose_option: {
                options: [
                    { name: "Beverage", price: 1.95 },
                ]
            }
        }
    ]
}

export async function insertMenuItemsUtil(restaurantId) {
    const RESTAURANT_ID = restaurantId;
    // const RESTAURANT_ID = "256075a0-74b1-41eb-be8c-c89d0808774e";
    let duplicates = [];
    let inserted = 0;

    try {
        // Process each category
        for (const [categoryName, items] of Object.entries(menuItems)) {
            // Check if category exists
            const { data: existingCategory } = await supabase
                .from('dish_categories')
                .select('id')
                .eq('restaurant_id', RESTAURANT_ID)
                .eq('name', categoryName)
                .single();

            // Get category ID - create if doesn't exist
            let categoryId;
            if (!existingCategory) {
                const { data: newCategory, error: categoryError } = await supabase
                    .from('dish_categories')
                    .insert({
                        name: categoryName,
                        restaurant_id: RESTAURANT_ID
                    })
                    .select()
                    .single();

                if (categoryError) throw categoryError;
                categoryId = newCategory.id;
            } else {
                categoryId = existingCategory.id;
            }

            // Insert menu items for this category
            for (const item of items) {
                // Check if the item already exists
                const { data: existingItem } = await supabase
                    .from('menu_items')
                    .select('id')
                    .eq('restaurant_id', RESTAURANT_ID)
                    .eq('name', item.name)
                    .single()

                if (existingItem) {
                    duplicates.push(item.name);
                    continue; // Skip this item and continue with the next
                }

                const menuItem = {
                    name: item.name,
                    description: item.description || null,
                    restaurant_id: RESTAURANT_ID,
                    dish_category_id: categoryId,
                    choose_option: item.choose_option || null,
                    choose_topping: item.choose_topping || null,
                    add_toppings: item.add_toppings || null,
                    choose_salad: item.choose_salad || null,
                    choose_pasta: item.choose_pasta || null,
                    add_extra: item.add_extra || null,
                    remove_toppings: item.remove_toppings || null,
                    general_pizza_mod: item.general_pizza_mod || null,
                    salad_toppings_mod: item.salad_toppings_mod || null,
                    choose_soda: item.choose_soda || null
                };

                const { error: insertError } = await supabase
                    .from('menu_items')
                    .insert(menuItem);

                if (insertError) {
                    console.error(`Error inserting menu item ${item.name}:`, insertError);
                    throw insertError;
                }

                inserted++;
            }
        }

        let message = `${inserted} menu items inserted successfully.`;
        if (duplicates.length > 0) {
            message += ` ${duplicates.length} duplicate items were skipped.`;
            // message += ` ${duplicates.length} duplicate items were skipped: ${duplicates.join(', ')}.`;
        }

        return {
            success: true,
            message: message
        };

    } catch (error) {
        console.error("Error inserting menu items:", error);
        return {
            success: false,
            message: "Failed to insert menu items",
            error: error.message
        };
    }
}