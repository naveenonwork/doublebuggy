// import React, { useState } from "react";
// import "./SizeButtons.scss";

// const SizeButtons = ({ selectedSize, setSelectedSize }) => {
//   const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
//   const [selectedSize, setSelectedSize] = useState(null);

//   const handleSizeClick = (size) => {
//     setSelectedSize(size);
//   };

//    return (
//     <div className="size-buttons">
//       {sizes.map((size) => (
//         <button
//           key={size}
//           className={`size-button ${selectedSize === size ? "active" : ""}`}
//           onClick={() => setSelectedSize(size)}
//         >
//           {size}
//         </button>
//       ))}
//     </div>
//   );
// };
// export default SizeButtons;
