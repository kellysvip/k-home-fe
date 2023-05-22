import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const List = () => {

  const { currentPagePost, postsById } = useSelector(
    (state) => state.post
  );
  const products = currentPagePost.map((postId) => postsById[postId]);
  console.log(products);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Accom ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Author</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Price</TableCell>

            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="tableCell">
                {product._id.slice(10, 23)}
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={product.imageUrl[0]} alt="" className="image" />
                  {product.product}
                </div>
              </TableCell>
              <TableCell sx={{maxWidth: "100px"}} className="tableCell">{product.title}</TableCell>
              <TableCell className="tableCell">{product.author.name}</TableCell>
              <TableCell className="tableCell">{product.createdAt}</TableCell>
              <TableCell className="tableCell">{product.price}</TableCell>

              <TableCell className="tableCell">
                <span className={`status ${product.status}`}>
                  {product.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
