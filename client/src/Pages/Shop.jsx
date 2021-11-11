/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesAction } from "../Actions/categoryAction";
import { getAllSubCategoriesAction } from "../Actions/subCategoryAction";
import { getAllBrandsAction } from "../Actions/brandAction";
import StarRatings from "react-star-ratings";
import NewArrival from "../Components/home/NewArrival";
import { Menu, Slider, Checkbox, Radio, Space, Spin, Pagination } from "antd";
import ProductCard from "../Components/cards/ProductCard";
import { getProductsByFilterAction } from "../Actions/productAction";
import {
  DollarCircleOutlined,
  DownSquareOutlined,
  StarOutlined,
  TagOutlined,
  AntDesignOutlined,
  BgColorsOutlined,
  TransactionOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Group } = Radio;

const Shop = () => {
  const [price, setPrice] = useState([0, 0]);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [star, setStar] = useState(0);
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const [page, setPage] = useState(1);

  const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;

  //stars array
  const stars = [5, 4, 3, 2, 1];
  const colors = [
    "Black",
    "Brown",
    "White",
    "Red",
    "Orange",
    "Yellow",
    "Grey",
    "Blue",
    "Silver",
  ];

  const {
    getProductsByFilter,
    getAllSubCategories,
    getAllCategories,
    getAllBrands,
  } = useSelector((state) => state);

  const { filterProducts, loadingProduct, total } = getProductsByFilter;
  const { categories } = getAllCategories;
  const { subCategories } = getAllSubCategories;
  const { brands } = getAllBrands;

  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllSubCategoriesAction());
    dispatch(getAllBrandsAction());
  }, [dispatch]);

  useEffect(() => {
    const delayed = setTimeout(() => {
      dispatch(
        getProductsByFilterAction({
          query: text,
          price,
          category: checkedCategory,
          stars: star,
          subcategory,
          brand,
          color,
          shipping,
          page,
        }),
      );
    }, 300);

    return () => clearTimeout(delayed);
  }, [
    dispatch,
    text,
    price,
    checkedCategory,
    star,
    subcategory,
    brand,
    color,
    shipping,
    page,
  ]);

  //category check
  const handleCheckCategory = (e) => {
    let inTheState = [...checkedCategory];
    let current = e.target.value;

    let found = inTheState.indexOf(current);
    if (found === -1) {
      inTheState.push(current);
    } else {
      inTheState.splice(found, 1);
    }

    setCheckedCategory(inTheState);
  };

  //star
  const handleStar = (s) => {
    setStar(s);
  };

  //subcategory
  const handleSubcategory = (sub) => {
    setSubcategory(sub);
  };

  //clear
  const handleClear = () => {
    setCheckedCategory([]);
    setBrand("");
    setColor("");
    setSubcategory("");
    setPrice([0, 0]);
    setShipping("");
    setStar(0);
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
  };

  return (
    <Spin spinning={loadingProduct} indicator={antIcon}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='mt-2'>
              <span className='btn btn-info'>Filter</span>
              <span
                className='btn btn-info float-right'
                onClick={() => handleClear()}>
                Clear
              </span>
            </div>
            <Menu
              defaultOpenKeys={[]}
              mode='inline'
              style={{ backgroundColor: "white" }}>
              <SubMenu
                key='1'
                title={
                  <span className='h6'>
                    <DollarCircleOutlined /> Price
                  </span>
                }>
                <Slider
                  className='ml-4 mr-4'
                  value={price}
                  tipFormatter={(v) => `Rs ${v}`}
                  onChange={(v) => setPrice(v)}
                  range
                  max='100000'
                />
              </SubMenu>

              <SubMenu
                key='2'
                title={
                  <span className='h6'>
                    <DownSquareOutlined /> Category
                  </span>
                }>
                {categories && categories.length > 0
                  ? categories.map((c) => {
                      return (
                        <div
                          key={c._id}
                          style={{
                            backgroundColor: "white",
                          }}>
                          <Checkbox
                            name='category'
                            className='pb-2 pr-4 pl-4'
                            value={c._id}
                            checked={checkedCategory.includes(c._id)}
                            onChange={handleCheckCategory}>
                            {c.name}
                          </Checkbox>
                        </div>
                      );
                    })
                  : null}
              </SubMenu>
              <SubMenu
                key='3'
                title={
                  <span className='h6'>
                    <StarOutlined /> Rating
                  </span>
                }>
                {stars.map((s, i) => {
                  return (
                    <div
                      className='pr-4 pl-4 pb-2'
                      key={i}
                      style={{
                        backgroundColor: "white",
                      }}>
                      <StarRatings
                        numberOfStars={s}
                        starEmptyColor='#FF5722'
                        starHoverColor='#FF5722'
                        starDimension='18px'
                        starSpacing='5px'
                        changeRating={() => handleStar(s)}
                      />
                    </div>
                  );
                })}
              </SubMenu>
              <SubMenu
                key='4'
                title={
                  <span className='h6'>
                    <TagOutlined />
                    Sub Category
                  </span>
                }>
                <div style={{ backgroundColor: "white" }}>
                  {subCategories && subCategories.length > 0
                    ? subCategories.map((c) => {
                        return (
                          <div
                            key={c._id}
                            onClick={() => handleSubcategory(c._id)}
                            style={{ cursor: "pointer" }}
                            className='ml-3 mr-1 mt-1 p-2 badge badge-secondary h6'>
                            {c.name}
                          </div>
                        );
                      })
                    : null}
                </div>
              </SubMenu>
              <SubMenu
                key='5'
                title={
                  <span className='h6'>
                    <AntDesignOutlined />
                    Brand
                  </span>
                }>
                <div
                  style={{
                    backgroundColor: "white",
                    maxHeight: "200px",
                    overflow: "scroll",
                    overflowX: "hidden",
                  }}>
                  <Group
                    value={brand}
                    name='brand'
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}>
                    <Space direction='vertical'>
                      {brands && brands.length > 0
                        ? brands.map((c) => {
                            return (
                              <Radio
                                key={c._id}
                                value={c._id}
                                className='pb-2 pr-4 pl-4'>
                                {c.name}
                              </Radio>
                            );
                          })
                        : null}
                    </Space>
                  </Group>
                </div>
              </SubMenu>
              <SubMenu
                key='6'
                title={
                  <span className='h6'>
                    <BgColorsOutlined />
                    Colors
                  </span>
                }>
                <div
                  style={{
                    backgroundColor: "white",
                    maxHeight: "200px",
                    overflow: "scroll",
                    overflowX: "hidden",
                  }}>
                  <Group
                    name='color'
                    value={color}
                    onChange={(e) => setColor(e.target.value)}>
                    <Space direction='vertical'>
                      {colors && colors.length > 0
                        ? colors.map((c) => {
                            return (
                              <Radio value={c} className='pb-2 pr-4 pl-4'>
                                {c}
                              </Radio>
                            );
                          })
                        : null}
                    </Space>
                  </Group>
                </div>
              </SubMenu>
              <SubMenu
                key='7'
                title={
                  <span className='h6'>
                    <TransactionOutlined />
                    Shipping
                  </span>
                }>
                <div style={{ backgroundColor: "white" }}>
                  <Group
                    name='shipping'
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}>
                    <Space direction='vertical'>
                      <Radio value='Yes' className='pb-2 pr-4 pl-4'>
                        Yes
                      </Radio>
                      <Radio value='No' className='pb-2 pr-4 pl-4'>
                        No
                      </Radio>
                    </Space>
                  </Group>
                </div>
              </SubMenu>
            </Menu>
          </div>
          <div className='col-md-9 '>
            <h5 className=' display-4 mt-5 text-center'>Products</h5>
            <div className='underline'></div>
            <div className='row mt-2'>
              {text.length === 0 &&
              price[0] === 0 &&
              price[1] === 0 &&
              checkedCategory.length === 0 &&
              star === 0 &&
              subcategory.length === 0 &&
              brand.length === 0 &&
              color.length === 0 &&
              shipping.length === 0 ? (
                <NewArrival />
              ) : filterProducts && filterProducts.length > 0 ? (
                filterProducts.map((p) => (
                  <div className='col-md-4 mb-5' key={p._id}>
                    <ProductCard product={p} />
                  </div>
                ))
              ) : (
                <span className='h5 text-danger text-center'>
                  No Product Found
                </span>
              )}
            </div>
            {total > 0 && (
              <div className='row'>
                <nav className='col-md-4 offset-md-4 text-center  pt-5'>
                  <Pagination
                    defaultCurrent={1}
                    current={page}
                    total={(total / 3) * 10}
                    onChange={(value) => setPage(value)}
                  />
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Shop;
