import React, { Fragment } from "react";
import "./Propert.css";
const Propert = () => {
  return (
    <Fragment>
      <section className="property">
        <div className="center">
          <h3>Popular Properties</h3>
        </div>
        <div className="row-propert">
          <div className="column-propert">
            <div className="single-property">
              <div className="card-propert">
                <div className="property-thumb">
                  <div className="property-tag">Forsale</div>
                  <img
                    src="https://cloud.mogi.vn/images/2022/02/21/414/f26e16e935634184b31da1669467fede.jpg"
                    alt=""
                  />
                </div>
                <div className="property-content">
                  <h3>Phòng Trọ Gò Vấp Giá Sinh Viên</h3>
                  <div className="mark-propert">
                    {/* <i className="fa-solid fa-location-dot"></i>{" "} */}
                    <span>Go Vap District</span>
                  </div>
                  <span className="amount">From 3.3 Milion VND</span>
                </div>
                <div className="property-footer">
                  <ul>
                    <li>
                      <span>Area: 20</span>
                    </li>
                    <li>
                      <img
                        src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-bed-line-icon-vector-png-image_5074650.jpg"
                        alt=""
                      />
                      <span>BedRoom: 0</span>
                    </li>
                    <li>
                      <img
                        src="https://png.pngtree.com/png-clipart/20191123/original/pngtree-bathtub-glyph-icon-vector-png-image_5199633.jpg"
                        alt=""
                      />
                      <span>BathRoom: 1</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="column-propert">
            <div className="single-property">
              <div className="card-propert">
                <div className="property-thumb">
                  <div className="property-tag">Forsale</div>
                  <img
                    src="https://cloud.mogi.vn/images/2023/01/27/415/10d5e86892da401fbba2406f612826fa.jpg"
                    alt=""
                  />
                </div>
                <div className="property-content">
                  <h3>CHDV Tiện Nghi Gần Trường Học</h3>
                  <div className="mark-propert">
                    <span>District 1</span>
                  </div>
                  <span className="amount">From 5 Milion VND</span>
                </div>
                <div className="property-footer">
                  <ul>
                    <li>
                      <span>Area: 15</span>
                    </li>
                    <li>
                      <img
                        src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-bed-line-icon-vector-png-image_5074650.jpg"
                        alt=""
                      />
                      <span>BedRoom: 1</span>
                    </li>
                    <li>
                      <img
                        src="https://png.pngtree.com/png-clipart/20191123/original/pngtree-bathtub-glyph-icon-vector-png-image_5199633.jpg"
                        alt=""
                      />
                      <span>BathRoom: 1</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="column-propert">
            <div className="single-property">
              <div className="card-propert">
                <div className="property-thumb">
                  <div className="property-tag">Forsale</div>
                  <img
                    src="https://cloud.mogi.vn/images/2021/06/02/599/bcb9a287406b474c85556e7cab02079e.jpg"
                    alt=""
                  />
                </div>
                <div className="property-content">
                  <h3>Căn Hộ 2 PN Quận Thủ Đức</h3>
                  <div className="mark-propert">
                    <span>Thu Duc City</span>
                  </div>
                  <span className="amount">From 7 Milion VND</span>
                </div>
                <div className="property-footer">
                  <ul>
                    <li>
                      <span>Area: 40</span>
                    </li>
                    <li>
                      <img
                        src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-bed-line-icon-vector-png-image_5074650.jpg"
                        alt=""
                      />
                      <span>BedRoom: 2</span>
                    </li>
                    <li>
                      <img
                        src="https://png.pngtree.com/png-clipart/20191123/original/pngtree-bathtub-glyph-icon-vector-png-image_5199633.jpg"
                        alt=""
                      />
                      <span>BathRoom: 1</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="more-property">
          <a className="property-bt" href="/">
            <button className="property-btn"> More Property</button>
          </a>
        </div>
      </section>
    </Fragment>
  );
};

export default Propert;
