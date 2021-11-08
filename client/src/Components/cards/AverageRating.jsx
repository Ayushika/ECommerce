/** @format */

import React from "react";
import StarRating from "react-star-ratings";

const AverageRating = ({ product }) => {

  const showAverageRating = () => {
    if (product && product.ratings) {
      let ratingsArray = product && product.ratings;
      let total = [];
      const length = ratingsArray.length;

      ratingsArray.map((r) => total.push(r.star));
      const totalStars = total.reduce((p, n) => p + n, 0);

      const average = (totalStars * 5) / (length * 5);
      return (
        <StarRating
          rating={average}
          starRatedColor='#FF5722'
          starDimension='18px'
          starSpacing='5px'
        />
      );
    }
  };

  return showAverageRating();
};

export default AverageRating;
