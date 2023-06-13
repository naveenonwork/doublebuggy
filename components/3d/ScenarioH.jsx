import { Backdrop, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import React from "react";
import Rigg from "./Rigg";

const ScenarioH = () => {
  return (
    <Canvas
      dpr={[1, 2]}
        // className="canvas"
      style={{ position: "absolute", zIndex: 0 }}
      shadows
      camera={{ position: [5, 3.5, 6], fov: 50 }}
    >
      <OrbitControls />
      <Backdrop
        receiveShadow
        scale={[100, 10, 7]}
        floor={1.5}
        position={[0, -0.1, -5]}
      >
        <meshStandardMaterial
          color={"hsl(149, 97%, 6%)"}
          roughness={0.43}
          metalness={1}
        />
      </Backdrop>
      <pointLight position={[4, 5, 0]} intensity={1} />
      <pointLight position={[-6, 5, 0]} intensity={1} />
      <pointLight position={[0, -3, 1]} intensity={1} />
      <pointLight position={[10, 0, 10]} args={["white", 10, 20, 20]} />
      <pointLight position={[0, 4, -5]} args={["white", 10, 20, 20]} />
      <pointLight position={[0, 3, -10]} intensity={0.05} />
      <pointLight position={[2, 1, -10]} intensity={0.01} />
      <pointLight position={[-2, 1, -10]} intensity={0.01} />
      <pointLight position={[0, 1, 6]} intensity={0.8} />
      <pointLight position={[0, 8, -6]} intensity={0.8} />
      <pointLight position={[0, 3, 2]} intensity={1.8} />
      <pointLight position={[0, 3, -2]} intensity={1.8} />
      <Rigg />
    </Canvas>
  );
};

export default ScenarioH;
