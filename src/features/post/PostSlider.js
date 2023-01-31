import React, { Fragment } from "react";
import "../../components/product/PostSlider.css";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./postSlice";
import { useNavigate } from "react-router-dom";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
const PostSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   useEffect(() => {
//     try {
//       dispatch(getPosts({}));
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);
  const { currentPagePost, postsById, totalPosts } = useSelector(
    (state) => state.post
  );
  const products = currentPagePost.map((postId) => postsById[postId]);
    const handleChangePage = (productId) => {
        navigate(`/product/${productId}`)
        window.scrollTo(0, 0)
    }
  return (
    <Fragment>
      <section>
        <div className="row-slider">
          <Carousel breakPoints={breakPoints}>
            {products.map((product) => (
              <div onClick={() => handleChangePage(product._id)}> 
                <div
                 
                  className="product-slider"
                >
                  <div className="product-slider-thumb">
                    <img
                      className="product-slider-thumb-img"
                      src={product.imageUrl}
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
