import { Center, ContactShadows, PresentationControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import GW3D2 from "./GW3D2";
import Showroom2 from "./Showroom2";

const LoadingScene = () => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
          <ContactShadows
            position={[0, -5.4, 0]}
            opacity={0.75}
            scale={10}
            blur={0.5}
            far={4}
          />
        <Stage
          intensity={1}
          environment={false}
        
          adjustCamera={0.85}
        >
          <Center top back>
            <GW3D2 castShadow receiveShadow scale={1.2} />
          </Center>
          <PresentationControls global adjustCamera={true}  azimuth={[0,Math.PI*2]} >
            <Center bottom>
              <Showroom2 castShadow receiveShadow scale={1.7} />
            </Center>
          </PresentationControls>
        </Stage>
      </Canvas>
    </Suspense>
  );
};

export default LoadingScene;
