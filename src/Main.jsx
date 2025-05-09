import React from "react"
import IngredientsList from "./components/IngredientsList"
import ReactMarkdown from "react-markdown"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState("")

    function fetchRecipe() {
        fetch("https://claude-kitchen-backend.onrender.com/api/recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients })
        })
            .then(res => res.json())
            .then(data => {
                setRecipe(data.recipe)
                setRecipeShown(true)
            })
            .catch(err => {
                console.error("Failed to fetch recipe:", err)
            })
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function resetApp() {
      setIngredients([])
      setRecipe("")
      setRecipeShown(false)
    }
    

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    fetchRecipe={fetchRecipe}
                />
            )}

            {recipeShown && (
              <>
                <section className="suggested-recipe-container">
                  <ReactMarkdown>{recipe}</ReactMarkdown>
                </section>

                <button onClick={resetApp} className="reset-button">
                  Start over
                </button>
              </>
            )}
        </main>
    )
}