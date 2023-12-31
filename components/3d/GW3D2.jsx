import { Text3D } from "@react-three/drei";
import React from "react";

const GW3D2 = () => {
  return (
    <>

      <Text3D
        curveSegments={64}
        bevelEnabled
        bevelSize={0.01}
        bevelThickness={0.03}
        height={0.002}
        letterSpacing={0.04}
        size={1}
        font="/Trajan.json"
        position={[-4, 2.4, -2.13]}
        // rotation={[-0.1, 0.45, 0.03]}
      >
        {`GARMENT`}
        <meshStandardMaterial
          color={"#bfb7ab"}
          roughness={0.8}
          metalness={0.3}
        />
      </Text3D>{" "}
      <Text3D
        curveSegments={64}
        bevelEnabled
        bevelSize={0.01}
        bevelThickness={0.04}
        height={0.002}
        letterSpacing={0.02}
        size={1}
        font="/Trajan.json"
        position={[-4.5, 1, -2]}
        rotation={[0, 0, 0]}
      >
        {`WORKSHOP`}
        <meshStandardMaterial
          color={"#bfb7ab"}
          roughness={0.8}
          metalness={0.3}
        />
      </Text3D>
    </>
  );
};

export default GW3D2;
