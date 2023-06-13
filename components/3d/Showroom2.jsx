import React, {  useMemo, useRef, useState } from "react";
import {  useGLTF } from "@react-three/drei";

function Showroom2(props) {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  const modelHi = [
    "https://res.cloudinary.com/dt4up0c48/image/upload/v1686161034/Green5_wtkz9b.glb",
    "https://res.cloudinary.com/dt4up0c48/image/upload/v1686161006/BlackShirt1_iaknmm.glb",
    "https://res.cloudinary.com/dt4up0c48/image/upload/v1686161520/BlueShirt_umphes.glb",
  ]
    const modelLo = [   
      "https://res.cloudinary.com/dt4up0c48/image/upload/v1686162040/BlackShort1_l8cydx.glb",
      "https://res.cloudinary.com/dt4up0c48/image/upload/v1686164268/BlueShort1_myrmzp.glb",
      "https://res.cloudinary.com/dt4up0c48/image/upload/v1686162994/GreenShort_tswmxa.glb",
  ];


  const hiModels = useMemo(
    () =>
    modelHi.map((file) => {
      return useGLTF(file);
    }),
    [modelHi]
    );

    const loModels = useMemo(
      () =>
      modelLo.map((file) => {
        return useGLTF(file);
      }),
      [modelHi]
      );
    
    
  const [currentModelIndex1, setCurrentModelIndex1] = useState(0);
  const [currentModelIndex2, setCurrentModelIndex2] = useState(3);

  const handleModelClick1 = () => {
    setCurrentModelIndex1((prevIndex) => (prevIndex + 1) % 3);
  };

  const handleModelClick2 = () => {
    setCurrentModelIndex2((prevIndex) => (prevIndex + 1) % 3 );
  };

  // useFrame((state) => {
  //   state.camera.fov = 50;
  // });

  return (
    <group scale={2} position={[0,-2.4,0]} dispose={null}>
      <primitive
        object={hiModels[currentModelIndex1 % 3].scene}
        ref={ref1}
        position={[0,0,0]}

        onClick={handleModelClick1}
      /> 
      <primitive
        object={loModels[(currentModelIndex2+ 2) % 3].scene}
        // ref={ref1}
        position={[0,-0.2,0]}
        onClick={handleModelClick2}
      />
    </group>
  );
}

export default Showroom2;
