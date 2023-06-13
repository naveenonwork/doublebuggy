import { useThree, Canvas } from '@react-three/fiber'
import { useGLTF as useGLTFImpl, OrbitControls } from '@react-three/drei'
import { KTX2Loader } from 'three-stdlib'

const kTX2Loader = new KTX2Loader()

function useGLTF(url) {
  const gl = useThree((state) => state.gl)
  return useGLTFImpl(url, true, true, (loader) => {
    kTX2Loader.detectSupport(gl)
    kTX2Loader.setTranscoderPath('/basis/')
    loader.setKTX2Loader(kTX2Loader)
  })
}

function ModelView(props) {
  const gltf = useGLTF('/TurquoiseShirtF.glb')
  return <primitive {...props} object={gltf.scene} />
}

export default ModelView;