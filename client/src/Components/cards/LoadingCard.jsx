/** @format */

import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    const totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className='col-md-4 ' key={i}>
          <Skeleton active />
        </Card>,
      );
    }
    return totalCards;
  };
  return <div className='row pb-5'>{cards()}</div>;
};

export default LoadingCard;
