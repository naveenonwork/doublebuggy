import React, { useState, useEffect } from "react";
import handZoom from "../../assets/images/handZoomBlack.png";
import handRotate from "../../assets/images/handRotateBlack.png";
import mouseRotate from "../../assets/images/mouseRotateBlack.png";
import mouseZoom from "../../assets/images/mouseZoomBlack.png";
import "./UxIcons.scss";

const UxIcons = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    handleResize(); // Actualizar el estado inicialmente

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="ux-icons">
      <div className={isMobile ? "ux-icons-mobile mobile" : "ux-icons-mobile"}>
        <div className="ux-icon">
          <img src={isMobile ? handRotate : mouseRotate} alt="rotate with 1 finger logo" />
          <h3>Rotate</h3>
        </div>
        <div className="ux-icon">
          <img src={isMobile ? handZoom : mouseZoom} alt="zoom with 2 fingers logo" />
          <h3>Zoom</h3>
        </div>
      </div>
    </div>
  );
};

export default UxIcons;