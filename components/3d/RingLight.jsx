import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const RingLight = ({garmentLoad}) => {
    const ref = useRef();
    useFrame((state) => {
        if (!ref.current) {
            return;
        }
        // const t = state.clock.elapsedTime()
        if(!garmentLoad){

          ref.current.position.y =  .85+ Math.sin(state.clock.elapsedTime /2 ) * .075;
          ref.current.rotation.x = 1.6+Math.sin(state.clock.elapsedTime  ) * .05;
          ref.current.rotation.y = Math.cos(state.clock.elapsedTime  ) * .05;
          ref.current.scale.set(1,1,1)
        }else{
          ref.current.scale.set(Math.cos(state.clock.elapsedTime  )*3,Math.cos(state.clock.elapsedTime  )*2,Math.cos(state.clock.elapsedTime  )*2)
          ref.current.position.y =  -.38+ Math.sin(state.clock.elapsedTime  ) ;
        }
    })
  return (
    <mesh ref={ref} position={[0,0,0]}   rotation={[Math.PI/2,  0,0]} >
      <torusGeometry  args={[0.25, 0.011, 36, 60,]}   />
       {garmentLoad ? (
        <meshPhysicalMaterial color="#1d977a" /> // Material cuando el estado es true
      ) : (
        <meshPhysicalMaterial color="white" /> // Material cuando el estado es false
      )}
     
    </mesh>
  );
};

export default RingLight;