"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. GLOBE - Inner Glowing Core & Outer Wireframe Shell
    const globeGroup = new THREE.Group();

    // Core sphere
    const coreGeo = new THREE.SphereGeometry(8.5, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x7d562d,
      emissive: 0x3d230e,
      shininess: 40,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // Wireframe Grid Globe
    const gridGeo = new THREE.SphereGeometry(9, 24, 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0xd4a373,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    globeGroup.add(gridMesh);

    // 2. Orbital Rings
    const ringGeo = new THREE.RingGeometry(11.5, 11.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4a373,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.2;
    globeGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 3.5;
    ring2.rotation.y = Math.PI / 4;
    globeGroup.add(ring2);

    mainGroup.add(globeGroup);

    // 3. STARFIELD / COSMIC DUST
    const starCount = 450;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 120;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      starScales[i] = Math.random() * 1.5 + 0.5;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xd4a373,
      size: 0.6,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. METEORS / COMETS WITH GLOW TAILS
    const meteorCount = 6;
    interface Meteor {
      head: THREE.Mesh;
      tail: THREE.Line;
      velocity: THREE.Vector3;
      reset: () => void;
    }

    const meteors: Meteor[] = [];

    for (let i = 0; i < meteorCount; i++) {
      // Meteor Head
      const mHeadGeo = new THREE.SphereGeometry(0.35, 12, 12);
      const mHeadMat = new THREE.MeshBasicMaterial({
        color: 0xffe8d6,
      });
      const head = new THREE.Mesh(mHeadGeo, mHeadMat);

      // Meteor Trail Line
      const trailPoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-4, 2, -2)];
      const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
      const trailMat = new THREE.LineBasicMaterial({
        color: 0xd4a373,
        transparent: true,
        opacity: 0.7,
      });
      const tail = new THREE.Line(trailGeo, trailMat);

      const mGroup = new THREE.Group();
      mGroup.add(head);
      mGroup.add(tail);
      scene.add(mGroup);

      const velocity = new THREE.Vector3(-0.4 - Math.random() * 0.3, -0.2 - Math.random() * 0.2, 0);

      const reset = () => {
        mGroup.position.set(
          35 + Math.random() * 20,
          15 + Math.random() * 20,
          (Math.random() - 0.5) * 20
        );
      };

      reset();
      // Offset initial positions
      mGroup.position.x -= i * 15;

      meteors.push({ head, tail, velocity, reset });
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffdcbd, 1.2);
    dirLight1.position.set(20, 30, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7d562d, 0.8);
    dirLight2.position.set(-20, -20, -10);
    scene.add(dirLight2);

    let mousePos = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      mousePos.y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Globe rotation & gentle bobbing
      globeGroup.rotation.y = elapsedTime * 0.15;
      globeGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
      gridMesh.rotation.y = -elapsedTime * 0.1;
      ring1.rotation.z = elapsedTime * 0.05;
      ring2.rotation.z = -elapsedTime * 0.08;

      // Mouse Parallax
      mainGroup.rotation.y += (mousePos.x * 0.5 - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (mousePos.y * 0.3 - mainGroup.rotation.x) * 0.05;

      // Starfield Rotation
      starField.rotation.y = elapsedTime * 0.02;

      // Update Meteors
      meteors.forEach((m) => {
        m.head.parent?.position.add(m.velocity);
        if (m.head.parent && m.head.parent.position.x < -40) {
          m.reset();
        }
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
