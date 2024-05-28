import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Periksa impor useParams
import ReactMarkdown from 'react-markdown';

const ViewRecipe = () => {
  const { id } = useParams(); // Gunakan useParams untuk mengambil id dari URL
  const [recipe, setRecipe] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/whattoeat/GetRecipe?id=${id}`);
        setRecipe(response.data.recipe || "No recipe found");
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setRecipe("No recipe found"); // Handle error case
      }
    };
    fetchRecipe();
  }, [id]);

  return (
    <div>
      <h2>View Recipe</h2>
      <div className="markdown-body" style={{ backgroundColor: 'black', padding: '20px', borderRadius: '8px' }}>
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ViewRecipe;
