import React, { Suspense, useEffect, useRef, useState } from "react";
import "./ApiSteps.scss";
import Reveal from "./Reveal";
import { motion, useAnimation } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PresentationControls,
  Stage,
  useGLTF,
} from "@react-three/drei";
import Reveal2 from "./Reveal2";
import Showroom2 from "../3d/Showroom2";
import GW3D2 from "../3d/GW3D2";
import LoadingScene from "../3d/LoadingScene";
import Rigg from "../3d/Rigg";
// import ReactSlider from "react-slider";
// import "react-slider/dist/index.css";
import maleIcon from "../../assets/images/MaleIconBlack.png";
import femaleIcon from "../../assets/images/FemaleIconBlack.png";

const female =
  "https://res.cloudinary.com/dt4up0c48/image/upload/v1686171894/AvatarF_lr61o9.glb";
const male =
  "https://res.cloudinary.com/dt4up0c48/image/upload/v1686171888/AvatarM_nyxu9i.glb";

const ModelViewer = ({ url }) => {
  const { scene } = useGLTF(url, true);
  const ref = useRef();
  // console.log({scene});
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const { material } = child;
        if (material) {
          // Modificar las propiedades del material según sea necesario
          // material.roughness = 0.71;
          // material.metalness = 0;
          // material.color.set("hsl(126, 1%, 17%)"); // Cambiar el color a rojo
        }
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} />;
};

const ApiSteps = ({ onFormSubmit, onUserName }) => {
  const [introButton, setIntroButton] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [photoCheck, setPhotoCheck] = useState(false);
  const [heightCheck, setHeightCheck] = useState(false);
  const [genderCheck, setGenderCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [step, setStep] = useState(0);
  const [currentModel, setCurrentModel] = useState(
    gender === "M" ? male : female
  );
  const [userName, setUserName] = useState("");
  const isSubmitDisabled = !(photoCheck && heightCheck && genderCheck);

  const handleClick = () => {
    setIntroButton(true);
  };

  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoCheck(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("file", photo);
      formdata.append("size", height);
      //formdata.append("session_id", "male1");
      formdata.append("gender", gender.toLowerCase());

      const response = await fetch(
        "https://double-backend.onrender.com/static/avatar",
        {
          method: "POST",
          body: formdata,
        }
      );

      if (response.ok) {
        response.json().then(function (data) {
          console.log("GLB file ->", data);
          onFormSubmit(data);
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const submitButtonStyle = {
    borderColor: isSubmitDisabled ? "darkred" : "#1d977a",
    color: isSubmitDisabled ? "darkred" : "#1d977a",
  };

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    setGenderCheck(selectedGender === "M" || selectedGender === "F");
    setCurrentModel(selectedGender === "M" ? male : female);
    console.log(selectedGender);
  };
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    setHeightCheck(true);
    console.log(e.target.value);
  };
  //////////////////////////////////////
  const handleLoader = () => {
    setIsLoading(true);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
    onUserName(e.target.value);
  };

  const Test = () => {
    const [currentModel, setCurrentModel] = useState(
      gender === "M" ? male : female
    );
    const ref = useRef();

    // const handleClick = () => {
    //   setCurrentModel((prevModel) => (prevModel === female ? male : female));
    //   console.log(currentModel);
    // };

    useFrame((state) => {
      if (!ref.current) return;
      ref.current.rotation.y = -Math.sin(state.clock.elapsedTime / 2) * 0.4;
    });

    return (
      <mesh ref={ref}>
        <ModelViewer scale={1} url={currentModel} />
      </mesh>
    );
  };

  //////////////////////////////////////////////
  return (
    <div className="steps-wrap">
      {isLoading ? (
        <Reveal>
          <div className="loading-screen">
            <Canvas>
              <Suspense fallback={null}>
                <Stage
                  intensity={0.5}
                  preset="rembrandt"
                  environment={false}
                  shadows={{
                    type: "contact",
                    color: "black",
                    files: "./littleParis.hdr",
                    colorBlend: 2,
                    opacity: 1,
                    bias: -0.001,
                  }}
                  adjustCamera={0.8}
                >
                  <pointLight position={[-2, 5, 0]} intensity={0.6} />

                  <Showroom2 />
                  <GW3D2  />
                  <OrbitControls />
                </Stage>
              </Suspense>
            </Canvas>
          </div>
          <div className="loading-text">
            <div className="dot-overtaking"></div>
            <h2>Generating Avatar{userName && ` for ${userName}`}...</h2>
          </div>
        </Reveal>
      ) : (
        <Reveal>
          {currentStep === 0 && (
            <Reveal2>
              <div className="loading-screen">
              <Canvas onClick={handleClick}>
                  <Suspense fallback={null}>
                    <Stage
                      intensity={0.5}
                      preset="rembrandt"
                      environment={false}
                      shadows={{
                        type: "contact",
                        color: "black",
                        files: "./littleParis.hdr",
                        colorBlend: 2,
                        opacity: 1,
                        bias: -0.001,
                      }}
                      adjustCamera={0.9}
                    >
                      <pointLight position={[-2, 5, 0]} intensity={.6}/>

                      <Showroom2 />
                      <GW3D2 />
                      <OrbitControls />
                    </Stage>
                  </Suspense>
                </Canvas>
              </div>
              {/* </div> */}
              {introButton && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 1.3 }}
                  className="next-btn"
                  onClick={() => setCurrentStep(1)}
                >
                  <span className="arrow"></span>
                </motion.button>
              )}
            </Reveal2>
          )}
          {currentStep === 1 && (
            <Reveal>
              <div className="steps-item-content">
                <h2>
                  Let's find your perfect fit on a customized
                  <span style={{ color: "#1d977a" }}> 3D Avatar</span> in two
                  simple steps
                </h2>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1.3 }}
                  className="next-btn"
                  onClick={() => setCurrentStep(2)}
                >
                  <span className="arrow"></span>
                </motion.button>
              </div>
            </Reveal>
          )}
          <form onSubmit={handleSubmit} className="formulario">
            {currentStep === 2 && (
              <Reveal>
                <div className="form-container">
                  <h2>
                    First set your
                    <span style={{ color: "#1d977a" }}> Height </span> and
                    <span style={{ color: "#1d977a" }}> Body type </span>
                  </h2>
                  <motion.div className="form-height">
                    {/* <label htmlFor="gender-select"> */}
                    <p>Body Type</p>

                    <div className="gender-input">
                      <img
                        src={maleIcon}
                        alt="Male"
                        onClick={() => handleGenderSelection("M")}
                        className={gender === "M" ? "selected" : ""}
                      />
                      <img
                        src={femaleIcon}
                        alt="Female"
                        onClick={() => handleGenderSelection("F")}
                        className={gender === "F" ? "selected" : ""}
                      />
                    </div>
                    {/* </label> */}

                    <div className="canvas-avatar">
                      <Canvas
                      // camera={{fov: 30}}
                      >
                        <Suspense fallback={null}>
                          <Stage
                            intensity={0.5}
                            environment={{
                              background: false,
                              files: "./littleParis.hdr", // Cambia este valor según tu necesidad
                              intensity: 0.5, // Cambia este valor según tu necesidad
                              // Puedes agregar más propiedades aquí si es necesario
                            }}
                            shadows={false}
                            adjustCamera={0.7}
                          >
                            <PresentationControls
                              config={{ mass: 2, tension: 500 }}
                              snap={{ mass: 4, tension: 100 }}
                              // rotation={[0, -0.4, 0]}
                              global={false}
                            >
                              <Test />
                            </PresentationControls>
                          </Stage>
                        </Suspense>
                      </Canvas>
                    </div>

                    {/* <label htmlFor="height-input"> */}
                    <p>Height:</p>
                    {/* <div className="height-input"> */}
                    <span id="slider-value">
                      <h3>{height || 170}cm</h3>
                    </span>

                    <input
                      id="height-input"
                      type="range"
                      min="150"
                      max="195"
                      value={height}
                      onChange={handleHeightChange}
                    />
                    {/* </div> */}
                    {/* </label> */}
                  </motion.div>
                  {gender !== "" && height !== "" && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1.3 }}
                      className="next-btn"
                      onClick={() => setCurrentStep(3)}
                    >
                      <span className="arrow"></span>
                    </motion.button>
                  )}
                </div>
              </Reveal>
            )}
            {currentStep === 3 && (
              <Reveal>
                <div
                  style={{
                    display: "flex",
                    width: "100vw",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20rem",
                  }}
                >
                  <h2>
                    Second choose a
                    <span style={{ color: "#1d977a" }}> full body photo </span>
                    of yourself, our AI will generate an
                    <span style={{ color: "#1d977a" }}> Avatar </span>
                    based on your proportions.*
                  </h2>
                  <div className="form-row">
                    {/* <label htmlFor="photo-input"> */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      style={
                        photoCheck
                          ? { backgroundColor: "#1d977a", color: "black" }
                          : {}
                      }
                      className="btn-warning"
                    >
                      <p
                        style={
                          photoCheck ? { fontWeight: 400 } : { fontWeight: 400 }
                        }
                      >
                        {photoCheck ? "Photo Uploaded" : "Choose a Photo"}
                      </p>
                      <input
                        id="photo-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          onChangePhoto(e);
                        }}
                      />
                    </motion.button>
                  </div>
                  {photoCheck == true && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 1.3 }}
                      className="next-btn"
                      onClick={(e) => {
                        handleSubmit(e);
                        handleLoader(e);
                      }}
                    >
                      <span className="arrow"></span>
                    </motion.button>
                  )}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.5 }}
                    style={{ position: "fixed", bottom: "2%" }}
                  >
                    *All user data is peridocally removed from our servers.
                  </motion.p>
                </div>
              </Reveal>
            )}
          </form>
        </Reveal>
      )}
    </div>
  );
};

export default ApiSteps;
