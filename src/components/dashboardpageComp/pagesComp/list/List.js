import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllUsers } from "../../../../features/users/userSlice"
import Datatable from "../../datatable/Datatable"
import Navbar from "../../navbar/Navbar"
import Sidebar from "../../sidebar/Sidebar"
import "./list.scss"


const List = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List