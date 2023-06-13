import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas} from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  Stage, 
  useGLTF,
} from "@react-three/drei";
import ApiSteps from "../components/ux/ApiSteps";
import RingLight from "../components/3d/RingLight";
import { motion } from "framer-motion";
import Reveal from "../components/ux/Reveal";
import { useLocation } from "react-router-dom";
///MODEL VIEWER///
import "../components/ux/SizeButtons.scss";

///MODEL VIEWER///

const ModeloGlb = ({ glbUrl }) => {
  const { scene } = useGLTF(glbUrl, true);
  const ref = useRef();
  // Recorre los materiales del modelo y modifícalos según sea necesario
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const { material, geometry } = child;
        if (material) {
          // Modificar las propiedades del material según sea necesario
          material.flatShading = false; // Cambiar el color a rojo
          material.roughness = 0.71;
          material.metalness = 0;

          material.color.set("#000000");
        }
        if (geometry) {
          geometry.computeVertexNormals();
        }
      }
    });
  }, [scene]);

  console.log({ scene });
  return <primitive object={scene} ref={ref} />;
};

const MaskGlb = ({ mask }) => {
  const { scene } = useGLTF(mask, true);
  const ref = useRef();
  // Recorre los materiales del modelo y modifícalos según sea necesario
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const { material, geometry } = child;
        if (material) {
          // Modificar las propiedades del material según sea necesario
          material.flatShading = false; // Cambiar el color a rojo
          material.roughness = 0.71;
          material.metalness = 0;

          material.color.set("hsl(126, 1%, 17%)");
        }
        if (geometry) {
          geometry.computeVertexNormals();
        }
      }
    });
  }, [scene]);

  console.log({ scene });
  return (
    <primitive
      object={scene}
      scale={[0.95, 1, 1.06]}
      position={[0.0105, 0.005, 0.007]}
      ref={ref}
    />
  );
};

const UpperGarmentGlb = ({ garmentGlb }) => {
  const scene = useGLTF(garmentGlb, true);
  console.log(garmentGlb);

  return (
    <primitive
      object={scene.scene}
      // scale={2.05}
    />
  );
};

const LowerGarmentGlb = ({ lowerGarmentGlb }) => {
  const scene = useGLTF(lowerGarmentGlb, true);
  // console.log();
  return (
    <primitive
      object={scene.scene}
      // rotation={[-0.01, 0, 0]}
    />
  );
};

const Test2 = ({ name }) => {
  const [glbUrl, setGlbUrl] = useState("");
  const [mask, setMask] = useState("");
  const [maskUrl, setMaskUrl] = useState("");
  const [modelUrl, setModelUrl] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [garmentGlb, setGarmentGlb] = useState("");
  const [lowerGarmentGlb, setLowerGarmentGlb] = useState("");
  const [showGarment, setShowGarment] = useState(false);
  const [yesAvatar, setYesAvatar] = useState(false);
  const [noAvatar, setNoAvatar] = useState(false);
  const [user, setUser] = useState("");
  const [step, setStep] = useState(0);
  const [garmentLoad, setGarmentLoad] = useState(false);
  const [selectedSize, setSelectedSize] = useState("xl");
  const [session_id, setSessionID] = useState("");

  console.log("load", garmentLoad);

  const handleGarmentCall = async (selectedSize) => {
    event.preventDefault();
    setShowGarment(true);
    setGarmentLoad(true);

    const params = new URLSearchParams(location.search);
    const productid = params.get("id");

    const payload = {
      method: "POST",
      body: JSON.stringify({
        productid: productid,
        session: session_id,
        size: selectedSize.toLowerCase(),
      }),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(
        "https://double-avatars-backend.onrender.com/static/garment",
        payload
      ) //cambiar testgarment a garment
        .then((response) => response.json())
        .then((data) => {
          // console.log("garment api response", data);
          // let avatarglb = data.avatarglb;
          // console.log("avatarglb ", data.avatarglb);
          let garmentglb = data.uppergarmentglb;
          let lowerGarmentGlb = data.lowergarmentglb;
          // console.log("garmentglb ", data.uppergarmentglb);
          setGarmentGlb(garmentglb);
          setLowerGarmentGlb(lowerGarmentGlb);
          setGarmentLoad(false);

          console.log("url garment", garmentglb);
        })
        .catch((error) => {
          console.error(error);
          setGarmentLoad(false);
          // result = error;
        });
    } catch (error) {
      console.error(error);
      setGarmentLoad(false);
    }
  };

  const modeloMemo = useMemo(() => <ModeloGlb glbUrl={glbUrl} />, [glbUrl]);
  const maskMemo = useMemo(() => <MaskGlb mask={mask} />, [mask]);
  const garmentsMemo = useMemo(
    () => <UpperGarmentGlb garmentGlb={garmentGlb} />,
    [garmentGlb]
  );
  const lowerGarmentsMemo = useMemo(
    () => <LowerGarmentGlb lowerGarmentGlb={lowerGarmentGlb} />,
    [lowerGarmentGlb]
  );

  const handleFormSubmit = (data) => {
    setGlbUrl(data.avatarglb);
    setMask(data.maskglb);
    setGarmentGlb(data.uppergarmentglb);
    setSessionID(data.session_id);
    // setModelUrl(data); // Guardar la URL del modelo GLB
    setShowModel(true);
    // console.log("URL obtenida:", data);
  };

  const handleRegenerateAvatar = () => {
    setGlbUrl(""); // Borrar la información del estado glbUrl
    setShowModel(false); // Mostrar nuevamente el componente ApiSteps
  };

  const handleUserName = (event) => {
    setUser(event.target.value);
    // console.log("userName:", event.target.value);
  };

  //////////////size buttons //////////////
  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleSizeClick = async (size) => {
    setSelectedSize(size);
    await handleGarmentCall(size);
  };

  return (
    <Suspense fallback={null}>
      <div className="home">
        {showModel && step === 3 && (
          <Reveal>
            <div className="text-input">
              <h2>
                Set a name for your
                <span style={{ color: "#1d977a" }}> Avatar </span>
                <input
                  type="texts"
                  placeholder="Your name"
                  value={user}
                  onChange={handleUserName}
                />
              </h2>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 1.3 }}
                className="next-btn"
                onClick={(e) => setStep(1)}
              >
                <span className="arrow"></span>
              </motion.button>
            </div>
          </Reveal>
        )}
        {showModel && step === 0 && (
          <Reveal>
            <div className="canvas-wrapper">
              {/* <Suspense fallback={null}>
                {user ? (
                  <div className="user-container">
                    <h3> {user}'s Avatar</h3>
                  </div>
                ) : null}
              </Suspense> */}
              <Canvas>
                <Stage
                  preset="rembrandt"
                  adjustCamera={false}
                  environment={{
                    background: false,
                    files: "./littleParis.hdr", // Cambia este valor según tu necesidad
                    intensity: 0.5, // Cambia este valor según tu necesidad
                    // Puedes agregar más propiedades aquí si es necesario
                  }}
                  shadows={{ position: [0, 0, 0] }}
                  intensity={0.7}
                >
                  <ContactShadows
                    position={[0, -1.4, 0]}
                    opacity={0.75}
                    scale={10}
                    blur={0.5}
                    far={4}
                  />
                  <Suspense fallback={null}>
                    {/* <Center disableX={false}> */}

                    {glbUrl && modeloMemo}
                    {mask && maskMemo}
                    {garmentGlb && garmentsMemo}
                    {/* </Center> */}
                    {lowerGarmentGlb && lowerGarmentsMemo}
                  </Suspense>

                  {showModel ? (
                    <>
                      <OrbitControls
                        dampingFactor={0.009}
                        minDistance={0.7}
                        maxDistance={2}
                        rotateSpeed={0.5}
                        // minAzimuthAngle={}
                        target={[0, 0.36, 0]}
                        maxAzimuthAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 4.5}
                        maxPolarAngle={Math.PI / 1.4}
                        enablePan={false}
                      />
                      <pointLight
                        intensity={1.5}
                        position={[0, 2, -3]}
                        color={"hsl(24, 90%, 84%)"}
                      />
                      <RingLight garmentLoad={garmentLoad} />
                    </>
                  ) : null}
                  {/* <Environment preset="forest" /> */}
                  {/* {showModel ? null : <Rigg />} */}
                </Stage>
              </Canvas>
            </div>

            {!showModel ? null : (
              <div className="size-buttons">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-button ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={(e) => {
                      handleSizeClick(size);
                      handleGarmentCall(e);
                    }}
                    // disabled={garmentLoad}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </Reveal>
        )}

        {showModel ? null : (
          <>
            <ApiSteps
              onFormSubmit={handleFormSubmit}
              // onUserName={handleUserName}
            />
            {/* <Loader
              containerStyles={{ backgroundColor: "rgb(219, 219, 219)" }}
              barStyles={{ backgroundColor: "#177962", color: "white" }}
              initialState={(a) => a}
              // dataInterpolation={}
            /> */}
          </>
        )}
      </div>
    </Suspense>
  );
};

export default Test2;

