import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios'

function App() {

  //  a state
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieReviewList, setMovieList] = useState([])
  const [newReview, setNewReview] = useState("")

  //  prints database data on front-end
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    })
  }, [])
  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review,
    });

    setMovieList([
      ...movieReviewList, 
      {movieName: movieName, movieReview: review},
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie, 
      movieReview: newReview,
    });

    setNewReview("");

  };
  return (
    <div className="App">
      <h1>Movie Review Application</h1>

      <div className="form">
        <label for="movieName">Movie Name:</label>
        <input type="text" name="movieName" id="movieName" onChange={(e) => {
          setMovieName(e.target.value);
        }}/>

        <label for="review">Review:</label>
        <input type="text" name="review" id="review" onChange={(e) => {
          setReview(e.target.value);
        }}/>

        <button type="submit" onClick={submitReview}>Submit</button>

        {movieReviewList.map((val)=> {
          return (
          <div className="card">
            <h1>{val.movieName}</h1>
            <p>{val.movieReview}</p>
            <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
            <input type="text" id="updateReview" onChange={(e)=> { setNewReview(e.target.value)}}/>
            <button onClick={()=> {updateReview(val.movieName)}}>Update</button>
          </div>
          )
        })};
      </div>
    </div>

  );
}

export default App;
