import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./comps/LoginForm";

import './App.css';


function App() {
  const [user, setUser] = useState(null)
  console.log(process.env.REACT_APP_API_KEY)

  FirebaseAuthService.subscribeToAuthChanges(setUser)



  return (
    <div className="App">
      <div className='title-row'>
        <h1 className='title'>Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
    </div>
  );
}

export default App;
