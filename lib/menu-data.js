export const pizzaSizes = [
    { size: "10\"", basePrice: 10.99, toppingPrice: 1.50 },
    { size: "14\"", basePrice: 21.99, toppingPrice: 2.99 },
    { size: "18\"", basePrice: 26.99, toppingPrice: 4.75 },
    { size: "23\"", basePrice: 35.99, toppingPrice: 5.99 }
];

export const pizzaToppings = [
    { name: "Pepperoni", price: 1.50, allowHalf: true },
    { name: "Meatballs", price: 1.50, allowHalf: true },
    { name: "Canadian Bacon", price: 1.50, allowHalf: true },
    { name: "Fresh Basil", price: 1.50, allowHalf: true },
    { name: "Green Peppers", price: 1.50, allowHalf: true },
    { name: "Onions", price: 1.50, allowHalf: true },
    { name: "Spinach", price: 1.50, allowHalf: true },
    { name: "Artichoke Hearts", price: 1.50, allowHalf: true },
    { name: "Genoa Salami", price: 1.50, allowHalf: true },
    { name: "Sausage", price: 1.50, allowHalf: true },
    { name: "Ham", price: 1.50, allowHalf: true },
    { name: "Garlic", price: 1.50, allowHalf: true },
    { name: "Mushrooms", price: 1.50, allowHalf: true },
    { name: "Pineapple", price: 1.50, allowHalf: true },
    { name: "Jalapenos", price: 1.50, allowHalf: true },
    { name: "Black Olives", price: 1.50, allowHalf: true },
    { name: "Anchovies", price: 1.50, allowHalf: true },
    { name: "Roma Tomatoes", price: 1.50, allowHalf: true },
    { name: "Chicken", price: 1.50, allowHalf: true },
    { name: "Extra Cheese", price: 1.50, allowHalf: true },
    { name: "Vegan Cheese", price: 1.50, allowHalf: true },
    { name: "Bacon", price: 1.50, allowHalf: true }
];

export const pizzaMods = [
    { name: "No Cheese" },
    { name: "Light Cheese" },
    { name: "No Sauce" },
    { name: "Light Sauce" },
    { name: "Extra Sauce", price: 0.50 },
    { name: "Double Cut" },
    { name: "Well Done" },
    { name: "Light Cook" },
    { name: "Square Cut" },
    { name: "Gluten Free" },
    { name: "16 Slices" }
];

export const pizzas = [
    {
        id: "p1",
        name: "Buffalo Chicken Bacon Pizza",
        description: "Home-made ranch, chicken, red onion, cilantro, bacon our buffalo sauce & mozzarella cheese.",
        isSpecialty: true,
        specialtyPrices: [17.99, 24.99, 35.99, 49.99],
        defaultToppings: ["Chicken", "Bacon", "Red Onions", "Ranch", "Buffalo Sauce"],
        removableToppings: ["Homemade Ranch Dressing", "Chicken", "Red Onions", "Cilantro", "Bacon", "Buffalo Sauce", "Mozzarella Cheese"],
        allowExtraToppings: true
    },
    {
        id: "p2",
        name: "Cheese Pizza",
        description: "Classic cheese or create your own pizza.",
        isSpecialty: false,
        defaultToppings: ["Mozzarella Cheese"],
        allowExtraToppings: true
    },
    {
        id: "p3",
        name: "Meat Lovers Pizza",
        description: "2 kinds of pepperoni, Italian sausage, ham, and bacon.",
        isSpecialty: true,
        specialtyPrices: [17.99, 29.99, 39.99, 49.99],
        defaultToppings: ["Pepperoni", "Italian Sausage", "Ham", "Bacon"],
        removableToppings: ["Pepperoni", "Italian Sausage", "Ham", "Bacon", "Mozzarella Cheese"],
        allowExtraToppings: true
    },
    {
        id: "p4",
        name: "Famous BBQ Chicken Pizza",
        description: "BBQ sauce, mozzarella, grilled chicken, red onion, cilantro.",
        isSpecialty: true,
        specialtyPrices: [17.99, 29.99, 39.99, 49.99],
        defaultToppings: ["BBQ Sauce", "Mozzarella", "Grilled Chicken", "Red Onion", "Cilantro"],
        removableToppings: ["BBQ Sauce", "Mozzarella", "Grilled Chicken", "Red Onion", "Cilantro"],
        allowExtraToppings: true
    },
    {
        id: "p5",
        name: "Enzo's Signature Pizza",
        description: "Pepperoni, Italian sausage, red onions, black olives and green peppers!",
        isSpecialty: true,
        specialtyPrices: [17.99, 29.99, 39.99, 49.99],
        defaultToppings: ["Pepperoni", "Italian Sausage", "Red Onions", "Black Olives", "Green Peppers"],
        removableToppings: ["Pepperoni", "Italian Sausage", "Red Onions", "Black Olives", "Green Peppers", "Mozzarella Cheese"],
        allowExtraToppings: true
    },
    {
        id: "p6",
        name: "White Pizza",
        description: "Alfredo sauce, mozzarella, garlic, spinach, ricotta cheese.",
        isSpecialty: true,
        specialtyPrices: [17.99, 29.99, 39.99, 49.99],
        defaultToppings: ["Alfredo Sauce", "Mozzarella", "Garlic", "Spinach", "Ricotta Cheese"],
        removableToppings: ["Alfredo Sauce", "Mozzarella", "Garlic", "Spinach", "Ricotta Cheese"],
        allowExtraToppings: true
    },
    {
        id: "p7",
        name: "Veggie Pizza",
        description: "Spinach, red onions, green peppers, tomato, mushrooms.",
        isSpecialty: true,
        specialtyPrices: [17.99, 29.99, 39.99, 49.99],
        defaultToppings: ["Spinach", "Red Onions", "Green Peppers", "Tomato", "Mushrooms"],
        removableToppings: ["Spinach", "Red Onions", "Green Peppers", "Tomato", "Mushrooms", "Mozzarella Cheese"],
        allowExtraToppings: true
    }
];

