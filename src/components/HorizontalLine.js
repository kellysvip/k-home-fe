import React from "react";

function HorizontalLine() {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          backgroundColor: "black",
          opacity: 0.5,
        }}
      />

      <div>
        <p style={{ width: "130px", textAlign: "center" ,
          opacity: 0.9,}}>or continued with</p>
      </div>

      <div
        style={{
          flex: 1,
          height: "1px",
          backgroundColor: "black",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

export default HorizontalLine;
