import React from "react";
import "./Template.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/GWtextLogoBlack.png";
import daLogo from "../../assets/images/PoweredByDAblack.png";
import { motion } from "framer-motion";

const Template2 = () => {
  return (
    <div className="template">
           <motion.div
        className="logo-container"
        initial={{ transform: "translate(-50%,-50)",top:'50%', opacity: 1 }}
        animate={{ top: "4%", x: "50%", opacity: 1 }}
        transition={{ duration: 1, delay: 1.75 }}
      >
        <Link to="/garmentification">

          <img className="logo-text" src={logo} alt="Gament Workshop logo" />
        </Link>
        </motion.div>


      <motion.div
        className="da-logo"
        initial={{  opacity: 0 }}
        animate={{  opacity: 1 }}
        transition={{ duration: 1, delay: 1.75 }}
      >
        <p> Powered by:</p> <img src={daLogo} alt="Double™ Logo "></img>
        </motion.div>
    </div>
  );
};

export default Template2;
