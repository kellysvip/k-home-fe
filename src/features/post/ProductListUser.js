import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getPosts, getPostsOfUser } from "./postSlice";
import ProductCard from "./ProductCard";

const ProductListUser = () => {
    const {user} = useAuth()
    const userId = user._id
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { currentPagePost, postsById, totalPosts, isLoading } = useSelector(
    (state) => state.post
  );

  const posts = currentPagePost.map((postId) => postsById[postId]);
  useEffect(() => {
    if (userId) {
      dispatch(getPostsOfUser({ userId, page }));
    }
  }, [userId, page, dispatch]);

  return (
    <>
      {posts.map((post) => (
        <ProductCard key={post._id} product={post} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPosts ? (
          <LoadingButton
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="j6">No Post Yet</Typography>
        )}
      </Box>
    </>
  );
};

export default ProductListUser;