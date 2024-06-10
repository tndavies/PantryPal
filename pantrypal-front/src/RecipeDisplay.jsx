import RecipeCard from "./RecipeCard";

export default function RecipeDisplay() {

    const recipes = [
        {"title": "Recipe1", "notes": "n/a", "items": ["item1", "item2", "item3"], "effort": 1},
        {"title": "Recipe2", "notes": "fewfjeklwjfwe", "items": ["item4", "item2", "item5"], "effort": 2},
        {"title": "Recipe3", "notes": "Hello world, this is a good recipe!", "items": ["item2", "item3", "item6"], "effort": 3},
        {"title": "Recipe1", "notes": "n/a", "items": ["item1", "item2", "item3"], "effort": 1},
        {"title": "Recipe2", "notes": "fewfjeklwjfwe", "items": ["item4", "item2", "item5"], "effort": 2},
        {"title": "Recipe3", "notes": "Hello world, this is a good recipe!", "items": ["item2", "item3", "item6"], "effort": 3},
        {"title": "Recipe1", "notes": "n/a", "items": ["item1", "item2", "item3"], "effort": 1},
        {"title": "Recipe2", "notes": "fewfjeklwjfwe", "items": ["item4", "item2", "item5"], "effort": 2},
        {"title": "Recipe3", "notes": "Hello world, this is a good recipe!", "items": ["item2", "item3", "item6"], "effort": 3},
        {"title": "Recipe1", "notes": "n/a", "items": ["item1", "item2", "item3"], "effort": 1},
        {"title": "Recipe2", "notes": "fewfjeklwjfwe", "items": ["item4", "item2", "item5"], "effort": 2},
        {"title": "Recipe3", "notes": "Hello world, this is a good recipe!", "items": ["item2", "item3", "item6"], "effort": 3},
        {"title": "Recipe1", "notes": "n/a", "items": ["item1", "item2", "item3"], "effort": 1},
        {"title": "Recipe2", "notes": "fewfjeklwjfwe", "items": ["item4", "item2", "item5"], "effort": 2},
        {"title": "Recipe3", "notes": "Hello world, this is a good recipe!", "items": ["item2", "item3", "item6"], "effort": 3},
        {"title": "Recipe1", "notes": "n/a", "items": ["item1", "item2", "item3"], "effort": 1},
        {"title": "Recipe2", "notes": "fewfjeklwjfwe", "items": ["item4", "item2", "item5"], "effort": 2},
        {"title": "Recipe3", "notes": "Hello world, this is a good recipe!", "items": ["item2", "item3", "item6"], "effort": 3}
      ];

    return (
        <>
         <div id="content">
            <div id="cards-container">
            {
                recipes.map(
                    (recipe,idx) => 
                        <RecipeCard key={idx} title={recipe.title} notes={recipe.notes} items={recipe.items} effort={recipe.effort} />
                )
            }
            </div>
        </div>
        </>
    );
};