"use client";

import * as THREE from 'three';
import { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, Environment, Lightformer, RoundedBox, Text } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

// Support for React 19+ / TypeScript 5.1+
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
}

export const Lanyard = ({ position = [0, 0, 8], gravity = [0, -40, 0] }: LanyardProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas 
        camera={{ position, fov: 30 }} 
        dpr={isMobile ? 1 : [1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Physics interpolate={!isMobile} gravity={gravity}>
            <Scene isMobile={isMobile} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer intensity={3} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            {!isMobile && (
              <>
                <Lightformer intensity={3} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                <Lightformer intensity={3} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
              </>
            )}
          </Environment>
          <ambientLight intensity={1.0} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

function Scene({ isMobile }: { isMobile: boolean }) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  
  // Custom textures for the user
  const photoTexture = useTexture('/Abarre.JPG');
  const logoTexture = useTexture('/jiyo-logo.png');

  // Set color space for original non-faded colors
  useEffect(() => {
    if (photoTexture) photoTexture.colorSpace = THREE.SRGBColorSpace;
    if (logoTexture) logoTexture.colorSpace = THREE.SRGBColorSpace;
  }, [photoTexture, logoTexture]);

  const { size } = useThree();
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, setDragged] = useState<THREE.Vector3 | null>(null);
  const [hovered, setHovered] = useState(false);

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2,
  };

  // Ultra-Short Lace Joints - 0.08 distance per segment for high-tension look
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.08]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.08]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.08]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.15, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered]);

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      const dir = vec.clone().sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      
      // Limit horizontal dragging to keep it within the glass box
      const limitX = 2.4;
      const targetX = THREE.MathUtils.clamp(vec.x * 1.2 - dragged.x, -limitX, limitX);
      
      card.current?.setNextKinematicTranslation({
        x: targetX,
        y: vec.y * 1.2 - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2, j3, card].forEach((ref) => ref.current?.wakeUp());
      
      const worldTop = 2.15;
      
      fixed.current.setNextKinematicTranslation({
        x: THREE.MathUtils.clamp(state.pointer.x * 2.8, -2.2, 2.2),
        y: worldTop,
        z: 0,
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      card.current.setAngvel({ x: ang.x * 0.95, y: ang.y * 0.95, z: ang.z * 0.95 }, true);
    }
  });

  return (
    <>
      {/* Invisible Physics Boundaries to prevent hiding */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, -4, 0]}>
        <CuboidCollider args={[4, 0.5, 2]} /> {/* Floor */}
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[3, 0, 0]}>
        <CuboidCollider args={[0.5, 4, 2]} /> {/* Right Wall */}
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[-3, 0, 0]}>
        <CuboidCollider args={[0.5, 4, 2]} /> {/* Left Wall */}
      </RigidBody>

      <group position={[0, 0, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="kinematicPosition" />
        <RigidBody ref={j1} {...segmentProps}><BallCollider args={[0.05]} /></RigidBody>
        <RigidBody ref={j2} {...segmentProps}><BallCollider args={[0.05]} /></RigidBody>
        <RigidBody ref={j3} {...segmentProps}><BallCollider args={[0.05]} /></RigidBody>

        <RigidBody
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          colliders={false}
        >
          <CuboidCollider args={[0.8, 1.1, 0.05]} />
          
          <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={(e: any) => {
              (e.target as any).releasePointerCapture(e.pointerId);
              setDragged(new THREE.Vector3().copy(e.point).sub(card.current.translation()));
            }}
            onPointerUp={() => setDragged(null)}
          >
            {/* The Badge/Card Case */}
            <mesh>
              <boxGeometry args={[1.7, 2.22, 0.08]} />
              <meshStandardMaterial color="#ffffff" roughness={0.25} />
            </mesh>

            {/* Front Face (Photo) - Fixed to 4:5 Aspect Ratio (4000x5000) */}
            <mesh position={[0, 0, 0.041]}>
              <planeGeometry args={[1.65, 2.0625]} />
              <meshBasicMaterial map={photoTexture} toneMapped={false} transparent />
            </mesh>

            {/* Back Face (Logo) */}
            <mesh position={[0, 0, -0.041]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.2, 1.2]} />
              <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
            </mesh>
            
            <mesh position={[0, 1.15, 0]}>
              <boxGeometry args={[0.2, 0.1, 0.1]} />
              <meshStandardMaterial color="#111111" />
            </mesh>
          </group>
        </RigidBody>
      </group>
      
      {/* Visual Band (Single Lace) - Thicker Bold Ribbon */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#0a0a0a"
          depthTest={false}
          resolution={[size.width, size.height]}
          lineWidth={0.24}
        />
      </mesh>
    </>
  );
}
