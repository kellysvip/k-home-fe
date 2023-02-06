import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSinglePost } from "../../../features/post/postSlice";
import "./Propert.css";
const PropertBookmarkCard = ({ bookmark }) => {
  const navigate = useNavigate()
  return (
    <div className="column-propert">
      <div className="single-property">
        <div
          className="card-propert"
          onClick={() => navigate(`/product/${bookmark._id}`)}
        >
          <div className="property-thumb">
            {/* <div className="property-tag">Forsale</div> */}
            <img src={bookmark.imageUrl} alt="" />
          </div>
          <div className="property-content">
            <h3>{bookmark.title}</h3>
            <div className="mark-propert">
              {/* <i className="fa-solid fa-location-dot"></i>{" "} */}
              <span>{bookmark.address}</span>
            </div>
            <span className="amount">{bookmark.price} Milion VND</span>
          </div>
          <div className="property-footer">
            <ul>
              <li>
                <span>Area: {bookmark.area}</span>
              </li>
              <li>
                <img
                  src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-bed-line-icon-vector-png-image_5074650.jpg"
                  alt=""
                />
                <span>BedRoom: {bookmark.noBedroom}</span>
              </li>
              <li>
                <img
                  src="https://png.pngtree.com/png-clipart/20191123/original/pngtree-bathtub-glyph-icon-vector-png-image_5199633.jpg"
                  alt=""
                />
                <span>BathRoom: {bookmark.noBathroom}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertBookmarkCard;
