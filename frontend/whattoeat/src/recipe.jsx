import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'github-markdown-css/github-markdown.css';

const Recipe = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [newRecommendation, setNewRecommendation] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const response = await axios.get('http://localhost:3000/api/whattoeat/GetRecommendation');
    setRecommendations(response.data);
  };

  const handleAddRecommendation = async () => {
    const formData = new FormData();
    formData.append("newRecommendation", newRecommendation);
    formData.append("image", image);

    await axios.post('http://localhost:3000/api/whattoeat/AddRecommendation', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setNewRecommendation(""); 
    setImage(null); 
    fileInputRef.current.value = ""; 
    fetchRecommendations();
  };

  const handleDeleteRecommendation = async (id) => {
    await axios.delete(`http://localhost:3000/api/whattoeat/DeleteRecommendation?id=${id}`);
    fetchRecommendations();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#0f1a2b", minHeight: "100vh", color: "white" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1 style={{ color: "white", backgroundColor: "midnightblue", padding: "10px", borderRadius: "8px", textAlign: "center" }}>Tasty Spot</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
          <Link to="/" style={{ marginRight: "10px", color: "white", backgroundColor: "navy", padding: "10px 30px", borderRadius: "5px", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/contact" style={{ marginLeft: "10px", color: "white", backgroundColor: "navy", padding: "10px 30px", borderRadius: "5px", textDecoration: "none" }}>
            Contact
          </Link>
        </div>
      </header>
      <main>
        <div style={{ marginBottom: "20px" }}>
          <h2>Add a New Recommendation</h2>
          <input
            type="text"
            placeholder="Enter description"
            value={newRecommendation}
            onChange={(e) => setNewRecommendation(e.target.value)}
            style={{ marginRight: "10px", padding: "5px", fontSize: "16px", borderRadius: "5px" }}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ marginRight: "10px", padding: "5px 10px", fontSize: "16px", backgroundColor: "navy", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Choose File
          </label>
          <button onClick={handleAddRecommendation} style={{ padding: "5px 10px", fontSize: "16px", backgroundColor: "navy", color: "white", border: "none", borderRadius: "5px" }}>Add</button>
        </div>
        <div>
          <h2>Recommendations</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {recommendations.map((rec) => (
              <div key={rec.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", margin: "10px", width: "350px", backgroundColor: "lightskyblue", color: "black" }}>
                <img src={`http://localhost:3000${rec.image}`} alt={rec.description} style={{ width: "100%", borderRadius: "8px" }} />
                <p>{rec.description}</p>
                <Link to={`/addrecipe/${rec.id}`} style={{ display: "block", marginBottom: "10px", padding: "5px 10px", fontSize: "16px", backgroundColor: "steelblue", color: "white", border: "none", borderRadius: "5px", textAlign: "center", textDecoration: "none" }}>
                  Add Recipe
                </Link>
                <Link to={`/viewrecipe/${rec.id}`} style={{ display: "block", marginBottom: "10px", padding: "5px 10px", fontSize: "16px", backgroundColor: "steelblue", color: "white", border: "none", borderRadius: "5px", textAlign: "center", textDecoration: "none" }}>
                  View Recipe
                </Link>
                <button onClick={() => handleDeleteRecommendation(rec.id)} style={{ padding: "5px 10px", fontSize: "16px", backgroundColor: "cadetblue", color: "white", border: "none", borderRadius: "5px" }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recipe;
