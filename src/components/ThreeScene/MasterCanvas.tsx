'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const MasterCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0A0A, 0.02);

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x18181B, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFF8EE, 2.5);
    keyLight.position.set(8, 10, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x788896, 1.2);
    fillLight.position.set(-8, -5, 6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xFFFFFF, 4.0);
    rimLight.position.set(0, 12, -10);
    scene.add(rimLight);

    // Group & Materials
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const titaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x8E8E93,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.4,
    });

    const frostedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xF7F7F5,
      transparent: true,
      opacity: 0.8,
      roughness: 0.12,
      transmission: 0.88,
      thickness: 1.5,
      ior: 1.52,
    });

    const matteCarbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x121214,
      metalness: 0.15,
      roughness: 0.55,
    });

    const aluminiumMat = new THREE.MeshStandardMaterial({
      color: 0xD4D5D8,
      metalness: 0.96,
      roughness: 0.14,
    });

    const platinumMat = new THREE.MeshStandardMaterial({
      color: 0xE5E5E7,
      metalness: 0.98,
      roughness: 0.08,
    });

    // Meshes
    // 1. Carbon Monolith Core
    const coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 0), matteCarbonMat);
    masterGroup.add(coreMesh);

    // 2. Titanium Exoskeleton Wireframe
    const exoGeo = new THREE.OctahedronGeometry(1.9, 0);
    const exoEdges = new THREE.EdgesGeometry(exoGeo);
    const exoLine = new THREE.LineSegments(exoEdges, new THREE.LineBasicMaterial({ color: 0xD4D5D8 }));
    masterGroup.add(exoLine);

    // 3. Gyroscopic Rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.06, 32, 120), aluminiumMat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.04, 32, 120), titaniumMat);
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    // 4. Frosted Glass Blades
    const bladeGeo = new THREE.BoxGeometry(0.35, 3.8, 0.12);
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const blade = new THREE.Mesh(bladeGeo, frostedGlassMat);
      blade.position.set(Math.cos(angle) * 2.2, 0, Math.sin(angle) * 2.2);
      blade.rotation.y = -angle + Math.PI / 2;
      masterGroup.add(blade);
    }

    // 5. Platinum Orbs
    const orbGeo = new THREE.SphereGeometry(0.22, 32, 32);
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const orb = new THREE.Mesh(orbGeo, platinumMat);
      orb.position.set(Math.cos(angle) * 3.6, (i % 2 === 0 ? 1 : -1) * 1.2, Math.sin(angle) * 3.6);
      masterGroup.add(orb);
    }

    // Mouse Vector & Animation Frame
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      masterGroup.rotation.y += 0.003;
      masterGroup.rotation.x = mouseY * 0.25;
      masterGroup.rotation.z = mouseX * 0.15;

      ring1.rotation.z += 0.005;
      ring2.rotation.x += 0.004;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};
