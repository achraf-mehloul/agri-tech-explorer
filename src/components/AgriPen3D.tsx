import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

type Hotspot = {
  id: string;
  label: string;
  desc: string;
  position: [number, number, number];
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "cap",
    label: "Top cap",
    desc: "Sealed enclosure — houses status LED, button and buzzer.",
    position: [0.35, 1.55, 0],
  },
  {
    id: "button",
    label: "Power button",
    desc: "Physical control for power and measurement cycle.",
    position: [0.45, 0.75, 0],
  },
  {
    id: "usb",
    label: "USB-C",
    desc: "Charging and firmware flashing port.",
    position: [0.45, 0.1, 0],
  },
  {
    id: "battery",
    label: "18650 Li-ion",
    desc: "Rechargeable battery cell inside the main body.",
    position: [-0.45, -0.15, 0],
  },
  {
    id: "probes",
    label: "Sensor probes",
    desc: "Multi-probe sensor array inserted into the soil.",
    position: [0, -1.85, 0],
  },
];

function PenModel({
  exploded,
  selected,
  onSelect,
}: {
  exploded: boolean;
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null!);

  useFrame((_, dt) => {
    if (!group.current) return;
    if (!selected) {
      group.current.rotation.y += dt * 0.25;
    }
  });

  // Material palette
  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#1a1f1a",
        roughness: 0.35,
        metalness: 0.15,
        clearcoat: 0.6,
        clearcoatRoughness: 0.25,
      }),
    [],
  );
  const capMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0f120f",
        roughness: 0.4,
        metalness: 0.2,
        clearcoat: 0.5,
      }),
    [],
  );
  const metalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c8ccc4",
        roughness: 0.3,
        metalness: 0.9,
      }),
    [],
  );

  // Offsets when exploded
  const capOffset = exploded ? 0.9 : 0;
  const upperOffset = exploded ? 0.4 : 0;
  const lowerOffset = exploded ? -0.4 : 0;
  const probesOffset = exploded ? -0.9 : 0;

  const dim = (id: string) =>
    selected && selected !== id ? 0.25 : 1;

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Top cap */}
      <group
        position={[0, 1.55 + capOffset, 0]}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect("cap");
        }}
      >
        <mesh material={capMat} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.2, 48]} />
        </mesh>
        <mesh material-opacity={dim("cap")} position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.31, 0.32, 0.02, 48]} />
          <meshStandardMaterial color="#2a2f2a" roughness={0.6} />
        </mesh>
      </group>

      {/* Upper body */}
      <group position={[0, 0.55 + upperOffset, 0]}>
        <mesh material={bodyMat} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 1.8, 48]} />
        </mesh>

        {/* Power button */}
        <mesh
          position={[0.32, 0.3, 0]}
          rotation={[0, 0, Math.PI / 2]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect("button");
          }}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.02, 32]} />
          <meshStandardMaterial
            color={selected === "button" ? "#7bb53c" : "#2a2f2a"}
            roughness={0.5}
          />
        </mesh>

        {/* Status LED */}
        <mesh position={[0.322, 0.05, 0]}>
          <sphereGeometry args={[0.018, 16, 16]} />
          <meshStandardMaterial
            color="#7bb53c"
            emissive="#7bb53c"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* USB-C port */}
        <mesh
          position={[0.322, -0.25, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect("usb");
          }}
        >
          <boxGeometry args={[0.02, 0.06, 0.13]} />
          <meshStandardMaterial color="#0a0d0a" roughness={0.4} />
        </mesh>
      </group>

      {/* Lower body — with battery shown when exploded */}
      <group position={[0, -0.75 + lowerOffset, 0]}>
        <mesh
          material={bodyMat}
          castShadow
          onClick={(e) => {
            e.stopPropagation();
            onSelect("battery");
          }}
        >
          <cylinderGeometry args={[0.32, 0.32, 1.4, 48]} />
        </mesh>

        {exploded && (
          <mesh material={metalMat} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 1.15, 32]} />
          </mesh>
        )}
      </group>

      {/* Bottom cap (flared base 38mm) */}
      <group position={[0, -1.55 + lowerOffset - 0.05, 0]}>
        <mesh material={capMat} castShadow>
          <cylinderGeometry args={[0.38, 0.36, 0.15, 48]} />
        </mesh>
      </group>

      {/* Sensor probes */}
      <group
        position={[0, -2 + probesOffset, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("probes");
        }}
      >
        {[
          [-0.12, 0, -0.08],
          [0.12, 0, -0.08],
          [-0.12, 0, 0.08],
          [0.12, 0, 0.08],
          [0, 0, 0],
        ].map((p, i) => (
          <group key={i} position={p as [number, number, number]}>
            <mesh material={metalMat} castShadow>
              <cylinderGeometry args={[0.018, 0.018, 0.5, 12]} />
            </mesh>
            <mesh position={[0, -0.28, 0]} material={metalMat}>
              <coneGeometry args={[0.018, 0.06, 12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Hotspots */}
      {HOTSPOTS.map((h) => (
        <Html
          key={h.id}
          position={h.position}
          center
          distanceFactor={8}
          style={{ pointerEvents: "auto" }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(h.id);
            }}
            className="group relative flex h-5 w-5 items-center justify-center"
            aria-label={h.label}
          >
            <span
              className={`absolute inset-0 rounded-full ${
                selected === h.id ? "bg-accent/40" : "bg-accent/20"
              }`}
              style={{ animation: "pulse-ring 2.2s ease-out infinite" }}
            />
            <span
              className={`h-2 w-2 rounded-full ring-2 ring-background transition-all ${
                selected === h.id
                  ? "bg-accent scale-125"
                  : "bg-foreground/80"
              }`}
            />
          </button>
        </Html>
      ))}
    </group>
  );
}

export function AgriPen3D() {
  const [exploded, setExploded] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [xray, setXray] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const active = HOTSPOTS.find((h) => h.id === selected);

  return (
    <div className="relative h-full w-full">
      {mounted && (
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0.6, 0.2, 8.5], fov: 26 }}
          onPointerMissed={() => setSelected(null)}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#a8c49a" />
          <Suspense fallback={null}>
            <Float speed={0.8} rotationIntensity={0} floatIntensity={0.35}>
              <PenModel exploded={exploded} selected={selected} onSelect={setSelected} />
            </Float>
            <Environment preset="studio" />
          </Suspense>
          <ContactShadows
            position={[0, -2.7, 0]}
            opacity={0.35}
            scale={6}
            blur={2.4}
            far={4}
          />
          <OrbitControls
            enablePan={false}
            minDistance={3.5}
            maxDistance={9}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      )}

      {/* HUD Controls */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="pointer-events-auto rounded-full border border-border/60 bg-background/70 px-3 py-1.5 backdrop-blur">
            <span className="mono-label text-muted-foreground">
              {exploded ? "Exploded view" : "Assembled view"}
            </span>
          </div>
          <div className="pointer-events-auto flex gap-2">
            <button
              onClick={() => {
                setExploded(!exploded);
                setSelected(null);
              }}
              className="rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-xs font-medium backdrop-blur transition hover:bg-background"
            >
              {exploded ? "Assemble" : "Explode"}
            </button>
            <button
              onClick={() => {
                setSelected(null);
                setExploded(false);
              }}
              className="rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-xs font-medium backdrop-blur transition hover:bg-background"
            >
              Reset
            </button>
          </div>
        </div>

        {active && (
          <div className="pointer-events-auto max-w-sm rounded-2xl border border-border/60 bg-background/85 p-5 backdrop-blur-xl shadow-elevated"
            style={{ boxShadow: "var(--shadow-elevated)" }}>
            <p className="mono-label text-accent">Component</p>
            <h4 className="mt-1 text-xl">{active.label}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{active.desc}</p>
            <button
              onClick={() => setSelected(null)}
              className="mono-label mt-3 text-muted-foreground hover:text-foreground"
            >
              ← close
            </button>
          </div>
        )}
      </div>

      {!mounted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mono-label text-muted-foreground animate-pulse">
            Loading device
          </div>
        </div>
      )}
    </div>
  );
}
