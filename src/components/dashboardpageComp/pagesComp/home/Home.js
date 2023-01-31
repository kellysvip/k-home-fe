import Chart from "../../chart/Chart";
import Featured from "../../featured/Featured";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import Widget from "../../widget/Widget";
import Table from "../../table/Table";
import "./home.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../../../features/users/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="post" />

        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
