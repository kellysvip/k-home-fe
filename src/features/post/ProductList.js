import { Stack, Typography } from "@mui/material";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationCustom from "../../components/Pagination";
import { getPosts } from "./postSlice";
import ProductCard from "./ProductCard";

function ProductList({ filters, filtersPd }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { currentPagePost, postsById, totalPosts } = useSelector(
    (state) => state.post
  );
  console.log("totalPosts", totalPosts);
  const products = currentPagePost.map((postId) => postsById[postId]);
  const filterProducts = applyFilter(products, filtersPd);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    try {
      const delayDebounceFn = setTimeout(() => {
        dispatch(getPosts({ filters, page }));
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } catch (error) {
      console.log(error);
    }
  }, [filters, page, dispatch]);

  return (
    <Stack container spacing={2}>
      {filterProducts.length > 0 ? (
        <>
          {filterProducts.map((product, index) => (
            <ProductCard key={products._id} product={product} />
          ))}
          <PaginationCustom
            page={page}
            handleChangePage={handleChangePage}
            count={Math.ceil(totalPosts / 10)}
          />
        </>
      ) : (
        <>
          <Typography>No results were found</Typography>
          <PaginationCustom
            page={page}
            handleChangePage={handleChangePage}
            count={Math.ceil(totalPosts / 10) - 2}
          />
        </>
      )}
    </Stack>
  );
}

function applyFilter(products, filtersPd) {
  const { sortBy } = filtersPd;
  let filteredProducts = products;

  // SORT BY
  if (sortBy === "featured") {
    filteredProducts = orderBy(products, ["status"], ["available"]);
  }
  if (sortBy === "newest") {
    filteredProducts = orderBy(products, ["createdAt"], ["desc"]);
  }
  if (sortBy === "priceDesc") {
    filteredProducts = orderBy(products, ["price"], ["desc"]);
  }
  if (sortBy === "priceAsc") {
    filteredProducts = orderBy(products, ["price"], ["asc"]);
  }

  return filteredProducts;
}

export default ProductList;
