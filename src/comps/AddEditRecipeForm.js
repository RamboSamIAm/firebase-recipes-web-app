import { useEffect, useState } from "react";



function AddEditRecipeForm({ 
    existingRecipe, 
    handleAddRecipe, 
    handleUpdateRecipe, 
    handleDeleteRecipe,
    handleEditRecipeCancel }) {
    useEffect(() => {
        if (existingRecipe) {
            setName(existingRecipe.name)
            setCategory(existingRecipe.category)
            setDirections(existingRecipe.directions)
            setPublishDate(existingRecipe.publishDate.toISOString().split("T")[0])
            setIngredients(existingRecipe.ingredients)
        } else {
            resetForm()
        }

    }, [existingRecipe])

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [publishDate, setPublishDate] = useState(new Date().toISOString().split("T")[0]);
    const [directions, setDirections] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [ingredientName, setIngredientName] = useState('');

    function handleRecipeFormSubmit(e) {
        e.preventDefault();

        console.log('button pressed')

        if (ingredients.length === 0) {
            alert('Ingredients cannot be empty. Please add at least 1 ingredient.')
            return
        }

        const isPublished = new Date(publishDate) <= new Date() ? true : false

        const newRecipe = {
            name,
            category,
            directions,
            publishDate: new Date(publishDate),
            isPublished,
            ingredients,
        };


        console.log(
            name,
            category,
            directions,
            publishDate,
            isPublished,
            ingredients,)


        if (existingRecipe) {
            handleUpdateRecipe(newRecipe, existingRecipe.id)
        } else {
         // This is where we call the function from app.js where we get stuck on the await keyword.
        handleAddRecipe(newRecipe)
        }

        resetForm();
    }

    function handleAddIngredient(e) {
        
        if (e.key && e.key !== "enter") {
            return;
        }

        e.preventDefault();

        if (!ingredientName) {
            alert("Missing ingredient field. Please double check");
            return
        }

        // Set the ingredients array to first, all of the pre exisiting ingredients, and then add the new ingredient.
        setIngredients([...ingredients, ingredientName]);

        // Set the ingredient name to ""
        setIngredientName("")
    }

    function resetForm() {
        setName("")
        setCategory("")
        setDirections("")
        setPublishDate("")
        setIngredients([])
    }
 
    return <form onSubmit={handleRecipeFormSubmit} className='add-edit-recipe-form-container'>
        {
            existingRecipe ? <h2>Update Recipe</h2> : <h2>Add a New Recipe</h2>
        }
        <div className='top-form-section'>
            <div className='fields'>
                <label className='recipe-label input-label'>
                    Recipe Name:
                    <input type="text" required value={name} onChange={ (e) => setName(e.target.value)} className="input-text"/>
                </label>
                <label className='recipe-label input-label'>
                    Category:
                    <select value={category} onChange={ (e) => setCategory(e.target.value)} className="select" required>

                        <option value=""></option>
                        <option value="breadsSandwhichesAndPizza">Breads, Sandwhiches, and Pizza</option>
                        <option value="eggsAndBreakfast">Eggs & Breakfast</option>
                        <option value="dessertsAndBakedGoods">Desserts & Baked Goods</option>
                        <option value="fishAndSeafood">Fish & Seafood</option>
                        <option value="vegetables">Vegetables</option>
                    </select>
                </label>
                <label className='recipe-label input-label'>
                    Directions:
                    <textarea required value={directions} onChange={ (e) => setDirections(e.target.value)} className="input-text directions"/>
                </label>
                <label className='recipe-label input-label'>
                    Publish Date:
                    <input type="date" required value={publishDate} onChange={ (e) => setPublishDate(e.target.value)} className="input-text"/>
                </label>
            </div>
        </div>
        <div className='ingredients-list'>
            <h3 className='text-center'>Ingredients</h3>
            <table className='ingredients-table'>
                <thead>
                    <tr>
                        <th className='table-header'>Ingredient</th>
                        <th className='table-header'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ingredients && ingredients.length > 0 ? ingredients.map((ingredient => {
                            return (
                                <tr key={ingredient}>
                                    <td className='table-date text-center'>{ingredient}</td>
                                    <td className='ingredient-delete-box'>
                                        <button type='button' className='secondary-button ingredient-delete-button'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })) : null
                    }
                </tbody>
            </table>
            {
                ingredients && ingredients.length === 0 ? (<h3 className='text-center no-ingredients'>No Ingredients Added Yet</h3>) : null
            }
            <div className='ingredient-form'>
                <label className='ingredient-label'>
                    Ingredient:
                    <input type="text" value={ingredientName} onChange={ (e) => setIngredientName(e.target.value)} className="input-text" placeholder='ex. 1 cup of sugar' onKeyPress={handleAddIngredient}/>
                </label>
                <button type='button' className='primary-button add-ingredient-button' onClick={handleAddIngredient}>Add Ingredient</button>
            </div>
        </div>
        <div className='action-buttons'>
            <button type='submit' className='primary-button action-button'>
                {
                    existingRecipe ? "Update Recipe" : "Create Recipe"
                }
            </button>
            {
                existingRecipe ? (
                <>
                <button type="button" onClick={handleEditRecipeCancel} className="primary-button action-button">Cancel</button>
                <button type="button" className="primary-button action-button" onClick={() => handleDeleteRecipe(existingRecipe.id)}>
                    Delete
                    </button>
                </>) : null
            }
        </div>
    </form>
}

export default AddEditRecipeForm