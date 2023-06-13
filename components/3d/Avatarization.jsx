import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTextureLoader } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Avatar({ photo, height, sessionId, gender, ...props }) {
  const [modelUrl, setModelUrl] = useState(null);
  const { nodes, materials } = useGLTF(modelUrl || "/Default.glb");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hybrik.azurewebsites.net', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            photo,
            height,
            sessionId,
            gender,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setModelUrl(data.glbUrl); // or whatever key the URL is under

      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [photo, height, sessionId, gender]);

  useFrame((state) => {
    state.camera.lookAt(0, 2.6, 0);
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={}
        material={}
        // position={[0, -0.05, 0.04]}
      />
    </group>
  );
}

useGLTF.preload("/Default.glb");
