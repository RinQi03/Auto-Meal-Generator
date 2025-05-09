import React from "react";

const StarRating = (props) => {
  const totalStars = 5;
  const rating = props.rating;

  // Create an array for the stars
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<span key={i}>&#9733;</span>); 
    } else if (i - rating < 1 && i - rating > 0) {
      stars.push(<span key={i}>&#189;</span>);
    } else {
      stars.push(<span key={i}>&#9734;</span>); 
    }
  }

  return (
    <div className="flex items-center space-x-1 text-yellow-300 text-lg">
      {stars}
    </div>
  );
};

export default StarRating;
