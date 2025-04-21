export const mockRecipes = [
  {
    _id: "1",
    title: "Avocado Toast",
    description: "A quick and healthy breakfast.",
    ingredients: ["Bread", "Avocado", "Salt", "Pepper"],
    instructions: ["Toast bread", "Mash avocado", "Spread on toast"],
    category: "breakfast",
    imgUrl: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    title: "Penne Arrabbiata",
    description: "Classic Spicy Italian pasta dish.",
    ingredients: ["Penne", "Tomato Sauce", "Red Pepper Flakes", "Garlic"],
    instructions: [
      "Boil pasta",
      "Chop and add garlic",
      "Mix with sauce",
      "Add pepper flakes",
    ],
    category: "dinner",
    imgUrl: "https://via.placeholder.com/150",
  },
  {
    _id: "3",
    title: "Caesar Salad",
    description: "A classic salad with romaine lettuce and croutons.",
    ingredients: [
      "Romaine Lettuce",
      "Croutons",
      "Caesar Dressing",
      "Parmesan Cheese",
    ],
    instructions: [
      "Chop lettuce",
      "Add dressing",
      "Top with croutons and cheese",
    ],
    category: "lunch",
    imgUrl: "https://via.placeholder.com/150",
  },
];

export function getRecipes({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  return mockRecipes.filter((recipe) => {
    const matchesCategory = category
      ? recipe.category.toLowerCase() === category.toLowerCase()
      : true;

    const matchesSearch = search
      ? recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(search.toLowerCase())
        ) ||
        recipe.category.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });
}
