"use client";

import { ContactShadows } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { characterScroll } from "@/lib/characterScroll";
import { characterConfig, getScrollZoomProgress } from "@/lib/characterConfig";

const { scroll: scrollCfg } = characterConfig;

function fitModelToScene(model: THREE.Object3D, targetHeight: number) {
  model.scale.set(1, 1, 1);
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  model.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  if (size.y <= 0) return;

  const scale = targetHeight / size.y;
  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);

  const fitted = new THREE.Box3().setFromObject(model);
  const center = fitted.getCenter(new THREE.Vector3());
  model.position.x -= center.x;
  model.position.z -= center.z;
  model.position.y -= fitted.min.y;
}

function ScrollCamera() {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, scrollCfg.lookAtY, 0));
  const smoothZ = useRef<number>(scrollCfg.cameraZStart);
  const smoothY = useRef<number>(scrollCfg.cameraY);

  useFrame((_, delta) => {
    const zoom =
      characterScroll.sectionIndex === 0
        ? getScrollZoomProgress(characterScroll.progress)
        : characterScroll.progress * 0.25;

    const targetZ = THREE.MathUtils.lerp(scrollCfg.cameraZStart, scrollCfg.cameraZEnd, zoom);
    const targetY = scrollCfg.cameraY + zoom * 0.06;
    const smooth = 1 - Math.pow(0.001, delta);

    smoothZ.current = THREE.MathUtils.lerp(smoothZ.current, targetZ, smooth);
    smoothY.current = THREE.MathUtils.lerp(smoothY.current, targetY, smooth);

    camera.position.z = smoothZ.current;
    camera.position.y = smoothY.current;
    camera.lookAt(lookAt.current);
  });

  return null;
}

function ProceduralFigure() {
  return (
    <group>
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#f5d0a9" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.15, 0]} castShadow>
        <capsuleGeometry args={[0.32, 0.55, 8, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.55} metalness={0.1} />
      </mesh>
    </group>
  );
}

export default function CharacterModel() {
  const root = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const [gltfModel, setGltfModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    let active = true;

    loader.load(
      characterConfig.model,
      (gltf) => {
        if (!active) return;

        const model = gltf.scene;
        fitModelToScene(model, characterConfig.targetHeight);

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        if (gltf.animations.length > 0) {
          const animationMixer = new THREE.AnimationMixer(model);
          const clip =
            gltf.animations.find((a) => /idle|stand|breath/i.test(a.name)) ??
            gltf.animations[0];
          animationMixer.clipAction(clip).play();
          mixer.current = animationMixer;
        }

        setGltfModel(model);
      },
      undefined,
      () => {
        if (active) setGltfModel(null);
      }
    );

    return () => {
      active = false;
      mixer.current?.stopAllAction();
      mixer.current = null;
    };
  }, []);

  useFrame((_, delta) => {
    mixer.current?.update(delta);

    if (!root.current) return;

    const zoom =
      characterScroll.sectionIndex === 0
        ? getScrollZoomProgress(characterScroll.progress)
        : characterScroll.progress * 0.25;

    const faceBase = characterScroll.side === "right" ? -0.35 : 0.35;
    const rotateDir = characterScroll.side === "right" ? 1 : -1;
    const smooth = 1 - Math.pow(0.001, delta);

    const targetRotY = faceBase + rotateDir * zoom * scrollCfg.rotateY;
    const targetY = -0.05 + zoom * scrollCfg.liftY;
    const targetZ = zoom * 0.18;
    const targetScale = THREE.MathUtils.lerp(scrollCfg.scaleMin, scrollCfg.scaleMax, zoom);

    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetRotY, smooth);
    root.current.position.y = THREE.MathUtils.lerp(root.current.position.y, targetY, smooth);
    root.current.position.z = THREE.MathUtils.lerp(root.current.position.z, targetZ, smooth);
    root.current.scale.setScalar(
      THREE.MathUtils.lerp(root.current.scale.x, targetScale, smooth)
    );
  });

  return (
    <>
      <ScrollCamera />
      <ambientLight intensity={1.15} />
      <directionalLight position={[5, 8, 5]} intensity={1.55} castShadow />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#C4A052" />

      <group ref={root} position={[0, -0.15, 0]}>
        {gltfModel ? <primitive object={gltfModel} /> : <ProceduralFigure />}
      </group>

      <ContactShadows position={[0, -0.2, 0]} opacity={0.38} scale={2.2} blur={2.5} far={1.2} />
    </>
  );
}
