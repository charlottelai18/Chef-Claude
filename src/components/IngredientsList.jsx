export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
      <li key={ingredient}>{ingredient}</li>
    ))
  
    const hasEnoughIngredients = props.ingredients.length >= 4
  
    return (
      <section>
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">
          {ingredientsListItems}
        </ul>
  
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p style={{ color: hasEnoughIngredients ? "#6B7280" : "#c0392b" }}>
              {hasEnoughIngredients
                ? "Generate a recipe from your list of ingredients."
                : "Please enter at least 4 ingredients to generate a recipe."}
            </p>
          </div>
          <button
            onClick={props.fetchRecipe}
            disabled={props.isLoading || !hasEnoughIngredients}
          >
            {props.isLoading ? "Generating..." : "Get a recipe"}
          </button>
        </div>
      </section>
    )
  }
  