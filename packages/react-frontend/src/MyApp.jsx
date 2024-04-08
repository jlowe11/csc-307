// src/MyApp.jsx
import React from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);
    function updateList(person) {
      setCharacters([...characters, person]);
    }
    <Form handleSubmit={updateList} />
    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }
  return (
    <div className="container">
      <Table 
        characterData={characters} 
        removeCharacter={removeOneCharacter}
      />
      <Form/>
    </div>
  );
}

export default MyApp;
