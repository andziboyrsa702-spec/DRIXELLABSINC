/**
 * DRIXEL LABS INC. — MASTER ARCHITECTURAL 3D SCENE CONTROLLER (Three.js)
 * Precision Materials: Brushed Titanium, Frosted Glass, Matte Ceramic, Anodized Aluminium
 * Dynamic Kinetic Sculptural Geometry reacting to scroll inertia and cursor vector.
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export class Master3DScene {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0A0A0A, 0.02);

    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 11);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    this.container.appendChild(this.renderer.domElement);

    // Mouse & Inertia Tracking
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, velocityX: 0, velocityY: 0 };
    this.scrollProgress = 0;
    this.targetScroll = 0;

    // Component Groups
    this.masterGroup = new THREE.Group();
    this.scene.add(this.masterGroup);

    this.initLighting();
    this.createMaterials();
    this.buildDynamicArchitecturalSculpture();
    this.buildParticleField();
    this.bindEvents();
    this.animate();
  }

  initLighting() {
    // Studio Photography Lighting Rig
    this.ambientLight = new THREE.AmbientLight(0x18181B, 1.4);
    this.scene.add(this.ambientLight);

    // Key Light (Warm Champagne Highlight)
    this.keyLight = new THREE.DirectionalLight(0xFFF8EE, 2.5);
    this.keyLight.position.set(8, 10, 8);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 2048;
    this.keyLight.shadow.mapSize.height = 2048;
    this.keyLight.shadow.bias = -0.0001;
    this.scene.add(this.keyLight);

    // Fill Light (Graphite Steel Shadow Softener)
    this.fillLight = new THREE.DirectionalLight(0x788896, 1.2);
    this.fillLight.position.set(-8, -5, 6);
    this.scene.add(this.fillLight);

    // Rim Light (Sharp Aluminium Contour Highlight)
    this.rimLight = new THREE.DirectionalLight(0xFFFFFF, 4.0);
    this.rimLight.position.set(0, 12, -10);
    this.scene.add(this.rimLight);
  }

  createMaterials() {
    // 1. Brushed Titanium Precision Metal
    this.titaniumMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8E8E93,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.4,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9
    });

    // 2. Frosted Quartz Glass Monolith
    this.frostedGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xF7F7F5,
      transparent: true,
      opacity: 0.8,
      roughness: 0.12,
      transmission: 0.88,
      thickness: 1.5,
      ior: 1.52,
      reflectivity: 0.6
    });

    // 3. Deep Carbon Matte Core
    this.matteCarbonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x121214,
      metalness: 0.15,
      roughness: 0.55,
      clearcoat: 0.2
    });

    // 4. Anodized Aluminium Structural Rings
    this.aluminiumMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4D5D8,
      metalness: 0.96,
      roughness: 0.14
    });

    // 5. Polished Platinum Accent Spheres
    this.platinumMaterial = new THREE.MeshStandardMaterial({
      color: 0xE5E5E7,
      metalness: 0.98,
      roughness: 0.08
    });
  }

  buildDynamicArchitecturalSculpture() {
    this.parts = [];

    // Layer 1: Core Geodesic Icosahedron Monolith (Nested Geometry)
    const innerCoreGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, this.matteCarbonMaterial);
    innerCoreMesh.castShadow = true;
    innerCoreMesh.receiveShadow = true;
    this.masterGroup.add(innerCoreMesh);
    this.parts.push({
      mesh: innerCoreMesh,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeDir: new THREE.Vector3(0, 0, 0),
      rotSpeed: new THREE.Vector3(0.002, 0.004, 0.001)
    });

    // Layer 2: Wireframe Titanium Exoskeleton Frame
    const exoGeo = new THREE.OctahedronGeometry(1.9, 0);
    const exoEdges = new THREE.EdgesGeometry(exoGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xD4D5D8, linewidth: 2 });
    const exoMesh = new THREE.LineSegments(exoEdges, lineMat);
    this.masterGroup.add(exoMesh);
    this.parts.push({
      mesh: exoMesh,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeDir: new THREE.Vector3(0, 0.8, 0),
      rotSpeed: new THREE.Vector3(-0.003, 0.002, 0.003)
    });

    // Layer 3: Dual Interlocking Gyroscopic Aluminium Rings
    const ring1Geo = new THREE.TorusGeometry(2.6, 0.06, 32, 120);
    const ring1Mesh = new THREE.Mesh(ring1Geo, this.aluminiumMaterial);
    ring1Mesh.rotation.x = Math.PI / 3;
    ring1Mesh.castShadow = true;
    this.masterGroup.add(ring1Mesh);
    this.parts.push({
      mesh: ring1Mesh,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeDir: new THREE.Vector3(-1.8, 1.2, -1.0),
      rotSpeed: new THREE.Vector3(0.004, -0.002, 0.001)
    });

    const ring2Geo = new THREE.TorusGeometry(3.1, 0.04, 32, 120);
    const ring2Mesh = new THREE.Mesh(ring2Geo, this.titaniumMaterial);
    ring2Mesh.rotation.y = Math.PI / 4;
    ring2Mesh.castShadow = true;
    this.masterGroup.add(ring2Mesh);
    this.parts.push({
      mesh: ring2Mesh,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeDir: new THREE.Vector3(1.8, -1.2, 1.0),
      rotSpeed: new THREE.Vector3(-0.002, 0.005, -0.002)
    });

    // Layer 4: Architectural Frosted Glass Refractor Blades (Symmetrical Orbit)
    const bladeGeo = new THREE.BoxGeometry(0.35, 3.8, 0.12);
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const bladeMesh = new THREE.Mesh(bladeGeo, this.frostedGlassMaterial);
      const x = Math.cos(angle) * 2.2;
      const z = Math.sin(angle) * 2.2;
      bladeMesh.position.set(x, 0, z);
      bladeMesh.rotation.y = -angle + Math.PI / 2;
      bladeMesh.castShadow = true;
      this.masterGroup.add(bladeMesh);
      this.parts.push({
        mesh: bladeMesh,
        basePos: new THREE.Vector3(x, 0, z),
        explodeDir: new THREE.Vector3(x * 1.5, (i - 1) * 1.8, z * 1.5),
        rotSpeed: new THREE.Vector3(0.001, 0.003, 0.002)
      });
    }

    // Layer 5: Kinetic Precision Platinum Orbs
    const orbGeo = new THREE.SphereGeometry(0.22, 32, 32);
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3.6;
      const x = Math.cos(angle) * radius;
      const y = (i % 2 === 0 ? 1 : -1) * 1.2;
      const z = Math.sin(angle) * radius;
      const orbMesh = new THREE.Mesh(orbGeo, this.platinumMaterial);
      orbMesh.position.set(x, y, z);
      orbMesh.castShadow = true;
      this.masterGroup.add(orbMesh);
      this.parts.push({
        mesh: orbMesh,
        basePos: new THREE.Vector3(x, y, z),
        explodeDir: new THREE.Vector3(x * 1.3, y * 2.0, z * 1.3),
        rotSpeed: new THREE.Vector3(0.01, 0.01, 0)
      });
    }
  }

  buildParticleField() {
    // Subtle Metallic Dust Particles Floating in Space
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 15;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xD4D5D8,
      size: 0.04,
      transparent: true,
      opacity: 0.45
    });

    this.particles = new THREE.Points(geometry, particleMat);
    this.scene.add(this.particles);
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      const targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      const targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      this.mouse.velocityX = targetX - this.mouse.targetX;
      this.mouse.velocityY = targetY - this.mouse.targetY;
      this.mouse.targetX = targetX;
      this.mouse.targetY = targetY;
    });

    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.targetScroll = totalHeight > 0 ? window.scrollY / totalHeight : 0;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Smooth Spring Lerp for Physics
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;
    this.scrollProgress += (this.targetScroll - this.scrollProgress) * 0.05;

    // Master Group Kinetic Motion
    this.masterGroup.rotation.y += 0.0025 + Math.abs(this.mouse.velocityX) * 0.02;
    this.masterGroup.rotation.x = this.mouse.y * 0.3;
    this.masterGroup.rotation.z = this.mouse.x * 0.18;

    // Scroll Disassembly & Kinetic Separation Physics
    const explodeFactor = Math.sin(this.scrollProgress * Math.PI * 1.2);
    this.parts.forEach(part => {
      part.mesh.position.x = part.basePos.x + part.explodeDir.x * explodeFactor;
      part.mesh.position.y = part.basePos.y + part.explodeDir.y * explodeFactor;
      part.mesh.position.z = part.basePos.z + part.explodeDir.z * explodeFactor;

      part.mesh.rotation.x += part.rotSpeed.x * (1 + explodeFactor * 2);
      part.mesh.rotation.y += part.rotSpeed.y * (1 + explodeFactor * 2);
      part.mesh.rotation.z += part.rotSpeed.z * (1 + explodeFactor * 2);
    });

    // Particle Drift
    if (this.particles) {
      this.particles.rotation.y += 0.0006;
      this.particles.rotation.x = this.mouse.y * 0.05;
    }

    // Dynamic Camera Path Orbit
    this.camera.position.z = 11 - this.scrollProgress * 3.0;
    this.camera.position.y = Math.sin(this.scrollProgress * Math.PI) * 1.8;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }
}
