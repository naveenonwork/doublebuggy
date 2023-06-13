import { useFrame } from '@react-three/fiber';
import React, { useState, useEffect } from 'react';
import * as THREE from 'three';

function Rigg({ vec = new THREE.Vector3() }) {
  const [deviceType, setDeviceType] = useState('');

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      setDeviceType('mobile');
    } else if (width <= 800) {
      setDeviceType('tablet');
    } else if (width <= 1200) {
      setDeviceType('tablet-large');
    } else {
      setDeviceType('desktop');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useFrame((s) => {
    let adapt;
    if (deviceType === 'mobile') {
      adapt = 19;
    } else if (deviceType === 'tablet') {
      adapt = 16.7; // Ajusta el valor según tus necesidades para tablets de 800px
    } else if (deviceType === 'tablet-large') {
      adapt = 12; // Ajusta el valor según tus necesidades para tablets más grandes (800-1200px)
    } else {
      adapt = 8.2; // Ajusta el valor según tus necesidades para escritorios
    }

    // s.camera.position.lerp(
    //   vec.set(
    //     Math.sin(s.clock.elapsedTime / 2) * 1.2,
    //     0.2 + Math.cos(s.clock.elapsedTime / 2) * 0.5,
    //     adapt
    //   ),
    //   0.01
    // );
    s.camera.position.x =  THREE.MathUtils.lerp(s.camera.position.x, 1.5 + s.mouse.x * 1.5, 0.075) 
    s.camera.position.y = THREE.MathUtils.lerp(s.camera.position.y, .6+  s.mouse.y * 1.2, 0.075)
    s.camera.position.z = adapt

    s.camera.lookAt(0.4, 0, 0);
  });

  return null;
}

export default Rigg;
