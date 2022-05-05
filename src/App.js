import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./comps/LoginForm";
import AddEditRecipeForm from "./comps/AddEditRecipeForm";

import './App.css';
import FirebaseFirestoreService from "./FirebaseFirestoreService";


function App() {
  const [user, setUser] = useState(null)

  FirebaseAuthService.subscribeToAuthChanges(setUser)

  async function handleAddRecipe(newRecipe) {
    try {
      //This console.log does run
      console.log('handling is going through 1')
      // First argument "recipes" is the name of our collection
      const response = await FirebaseFirestoreService.createDocument('recipes', newRecipe);
      //This console.log does not run
      console.log('handling is going through 2')
      alert(`Succesfully created a recipe with an ID = ${response.id}`)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="App">
      <div className='title-row'>
        <h1 className='title'>Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
      <div className="main">
        <AddEditRecipeForm handleAddRecipe={handleAddRecipe}/>
      </div>
    </div>
  );
}

export default App;
