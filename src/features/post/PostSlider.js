import React, { Fragment } from "react";
import "../../components/product/PostSlider.css";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
const PostSlider = ({ products }) => {
  const navigate = useNavigate();
  const handleChangePage = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };
  return (
    <Fragment>
      <section>
        <div className="row-slider">
          <Carousel breakPoints={breakPoints}>
            {products?.map((product, index) => (
              <div key={index} onClick={() => handleChangePage(product._id)}>
                <div className="product-slider">
                  <div className="product-slider-thumb">
                    <img
                      className="product-slider-thumb-img"
                      src={product.imageUrl[0]}
                      alt=""
                    />
                  </div>
                </div>
                <div className="product-slider-body">
                  <div className="product-slider-title">{product.title}</div>
                  <div className="product-slider-address">
                    {product.address}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </Fragment>
  );
};

export default PostSlider;
