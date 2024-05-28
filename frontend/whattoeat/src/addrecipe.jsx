import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`http://localhost:3000/api/whattoeat/GetRecipe?id=${id}`);
      setRecipe(response.data.recipe || "");
    };
    fetchRecipe();
  }, [id]);

  const handleSaveRecipe = async () => {
    await axios.post('http://localhost:3000/api/whattoeat/AddRecipe', { id, recipe });
    navigate("/recipe");
  };

  return (
    <div>
      <h2>Add/Edit Recipe</h2>
      <textarea
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
        rows="10"
        cols="50"
        style={{ padding: "10px", fontSize: "16px", borderRadius: "5px" }}
      />
      <br />
      <button onClick={handleSaveRecipe} style={{ padding: "5px 10px", fontSize: "16px", backgroundColor: "navy", color: "white", border: "none", borderRadius: "5px" }}>Save</button>
    </div>
  );
};

export default AddRecipe;
