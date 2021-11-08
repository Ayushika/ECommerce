/** @format */

import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subcategories,
    brand,
    color,
    shipping,
    quantity,
    sold,
  } = product;
  return (
    <ul className='list-group'>
      <li className='list-group-item text-muted'>
        Price
        <span className='label label-default label-pill pull-xs-right text-muted'>
          $ {price}
        </span>
      </li>
      {category && (
        <li className='list-group-item text-muted'>
          Category
          <Link
            to={`/category/${category.slug}`}
            className='label label-default label-pill pull-xs-right '>
            {category.name}
          </Link>
        </li>
      )}
      {subcategories && (
        <li className='list-group-item text-muted'>
          Subcategories
          {subcategories.map((s) => (
            <Link
              key={s._id}
              to={`/subcategory/${s.slug}`}
              className='label label-default label-pill pull-xs-right '>
              {s.name}
            </Link>
          ))}
        </li>
      )}
      {brand && (
        <li className='list-group-item text-muted'>
          brand
          <Link
            to={`/brand/${brand.slug}`}
            className='label label-default label-pill pull-xs-right '>
            {brand.name}
          </Link>
        </li>
      )}
      <li className='list-group-item text-muted'>
        Color
        <span className='label label-default label-pill pull-xs-right text-muted'>
          {color}
        </span>
      </li>
      <li className='list-group-item text-muted'>
        Shipping
        <span className='label label-default label-pill pull-xs-right text-muted'>
          {shipping}
        </span>
      </li>
      <li className='list-group-item text-muted'>
        Available
        <span className='label label-default label-pill pull-xs-right text-muted'>
          {quantity}
        </span>
      </li>
      <li className='list-group-item text-muted'>
        Sold
        <span className='label label-default label-pill pull-xs-right text-muted'>
          {sold}
        </span>
      </li>
      {/* <li className='list-group-item text-muted'>
        Rating
        <span className='label label-default label-pill pull-xs-right text-muted'>
          {product && product.ratings && product.ratings.length > 0 ? (
            <AverageRating product={product} />
          ) : (
            "No Rating Yet"
          )}
        </span>
      </li> */}
    </ul>
  );
};

export default ProductListItems;
