import { Stack } from "@mui/material";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationCustom from "../../components/Pagination";
import { getPosts } from "./postSlice";
import ProductCard from "./ProductCard";

function ProductList({ filters }) {
  console.log(filters);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { currentPagePost, postsById, totalPosts } = useSelector((state) => state.post);
  const products = currentPagePost.map((postId) => postsById[postId]);
  const filterProducts = applyFilter(products, filters);
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
      {filterProducts.map((product, index) => (
        <ProductCard key={products._id} product={product} />
      ))}
      <PaginationCustom page={page} handleChangePage={handleChangePage} count={Math.ceil(totalPosts/10)} />
    </Stack>
  );
}

function applyFilter(products, filters) {
  const { sortBy } = filters;
  let filteredProducts = products;

  // SORT BY
  if (sortBy === "featured") {
    filteredProducts = orderBy(products, ["sold"], ["desc"]);
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

  if (filters.price) {
    filteredProducts = products.filter((product) => {
      if (filters.price === "price1") {
        return product.price < 1;
      }
      if (filters.price === "price2") {
        return product.price >= 1 && product.price <= 3;
      }
      return product.price > 3;
    });
  }
  return filteredProducts;
}

export default ProductList;
