import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ECOSYSTEM_MODULES, EcosystemModule } from '../data/mediaKitData';
import { 
  Sparkles, 
  RotateCw, 
  Maximize2, 
  ChevronDown, 
  ChevronUp, 
  Info,
  ArrowRight
} from 'lucide-react';

interface ThreeEcosystemOrbitProps {
  onSelectModule?: (module: EcosystemModule) => void;
  selectedModuleId?: string | null;
}

export const ThreeEcosystemOrbit: React.FC<ThreeEcosystemOrbitProps> = ({
  onSelectModule,
  selectedModuleId,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeModule, setActiveModule] = useState<EcosystemModule>(
    ECOSYSTEM_MODULES[0]
  );
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraView, setCameraView] = useState<'overview' | string>('overview');

  const targetCameraPos = useRef(new THREE.Vector3(0, 6, 17));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const autoRotateRef = useRef(true);
  const nodeMeshesRef = useRef<Map<string, THREE.Group>>(new Map());

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    if (selectedModuleId) {
      const found = ECOSYSTEM_MODULES.find((m) => m.id === selectedModuleId);
      if (found) {
        setActiveModule(found);
        focusNode(found.id);
      }
    }
  }, [selectedModuleId]);

  const focusNode = (id: string) => {
    setCameraView(id);
    if (id === 'overview') {
      targetCameraPos.current.set(0, 6, 17);
      targetLookAt.current.set(0, 0, 0);
      return;
    }
    const nodeGroup = nodeMeshesRef.current.get(id);
    if (nodeGroup) {
      const pos = new THREE.Vector3();
      nodeGroup.getWorldPosition(pos);
      targetCameraPos.current.set(pos.x * 1.3 + 1.5, pos.y + 2, pos.z * 1.3 + 4.5);
      targetLookAt.current.copy(pos);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as mandated by Three.js skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f19);
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.038);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x7c5cfc, 2.4);
    keyLight.position.set(10, 14, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-10, -6, -8);
    scene.add(fillLight);

    // Core central procedural group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const nucleusGeo = new THREE.IcosahedronGeometry(1.9, 3);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x5932ea,
      emissive: 0x3b1ebd,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.8,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    const wireGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireframe);

    const ringGeo = new THREE.TorusGeometry(2.9, 0.08, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x7c5cfc,
      emissive: 0x5932ea,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const coreRing = new THREE.Mesh(ringGeo, ringMat);
    coreRing.rotation.x = Math.PI / 2.3;
    coreGroup.add(coreRing);

    // Orbit Ring Guide
    const orbitTrackRadius = 7.2;
    const trackGeo = new THREE.RingGeometry(orbitTrackRadius - 0.02, orbitTrackRadius + 0.02, 96);
    const trackMat = new THREE.MeshBasicMaterial({
      color: 0x334155,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const orbitTrack = new THREE.Mesh(trackGeo, trackMat);
    orbitTrack.rotation.x = Math.PI / 2;
    scene.add(orbitTrack);

    // Satellites
    const satellitePivotGroup = new THREE.Group();
    scene.add(satellitePivotGroup);

    const nodeMeshes = new Map<string, THREE.Group>();
    const interactiveMeshes: THREE.Mesh[] = [];

    const nodeColors: Record<string, number> = {
      catalogo: 0x5932ea,
      vendeai: 0x3b82f6,
      core: 0x10b981,
      evolux_ai: 0x8b5cf6,
      vision: 0xec4899,
      finance: 0xf59e0b,
    };

    ECOSYSTEM_MODULES.forEach((mod, idx) => {
      const angle = (idx / ECOSYSTEM_MODULES.length) * Math.PI * 2;
      const x = Math.cos(angle) * orbitTrackRadius;
      const z = Math.sin(angle) * orbitTrackRadius;
      const y = Math.sin(angle * 2) * 0.7;

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, y, z);
      nodeGroup.userData = { moduleId: mod.id, moduleData: mod };

      const colorVal = nodeColors[mod.id] || 0x5932ea;
      const nodeGeo = new THREE.DodecahedronGeometry(mod.id === 'catalogo' ? 1.05 : 0.8);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: colorVal,
        emissive: colorVal,
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { moduleId: mod.id };
      nodeGroup.add(nodeMesh);
      interactiveMeshes.push(nodeMesh);

      // Ring around node
      const nodeRingGeo = new THREE.TorusGeometry(1.2, 0.03, 12, 36);
      const nodeRingMat = new THREE.MeshBasicMaterial({
        color: colorVal,
        transparent: true,
        opacity: 0.5,
      });
      const nodeRing = new THREE.Mesh(nodeRingGeo, nodeRingMat);
      nodeRing.rotation.x = Math.PI / 3;
      nodeGroup.add(nodeRing);

      satellitePivotGroup.add(nodeGroup);
      nodeMeshes.set(mod.id, nodeGroup);
    });

    nodeMeshesRef.current = nodeMeshes;

    // Subtle particles
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 26;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 26;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7c5cfc,
      size: 0.1,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const moduleId = hit.userData.moduleId;
        const found = ECOSYSTEM_MODULES.find((m) => m.id === moduleId);
        if (found) {
          setActiveModule(found);
          focusNode(found.id);
          if (onSelectModule) onSelectModule(found);
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    // Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      nucleus.rotation.y += delta * 0.4;
      nucleus.rotation.x += delta * 0.2;
      wireframe.rotation.y -= delta * 0.3;
      coreRing.rotation.z += delta * 0.5;

      if (autoRotateRef.current) {
        satellitePivotGroup.rotation.y += delta * 0.12;
      }

      nodeMeshes.forEach((group) => {
        group.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.y += delta * 0.5;
          }
        });
      });

      particles.rotation.y = elapsedTime * 0.015;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraPos.current.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraPos.current.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCameraPos.current.z, 3.5, delta);

      currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.current.x, 4.0, delta);
      currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.current.y, 4.0, delta);
      currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.current.z, 4.0, delta);
      camera.lookAt(currentLookAt.current);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);

      scene.clear();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[440px] sm:h-[520px] rounded-3xl overflow-hidden border border-slate-800 bg-[#0B0F19] shadow-xl">
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none gap-2 z-10">
        <div className="pointer-events-auto flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-700/60 shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-[#5932EA] ring-4 ring-[#5932EA]/30" />
          <span className="text-xs font-bold text-white">
            Ecossistema 360° em 3D
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              autoRotate
                ? 'bg-[#5932EA]/20 border-[#5932EA] text-purple-200'
                : 'bg-slate-900/80 border-slate-700 text-slate-300'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">{autoRotate ? 'Órbita Ativa' : 'Pausada'}</span>
          </button>

          <button
            type="button"
            onClick={() => focusNode('overview')}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Card on Desktop */}
      <div className="absolute top-16 right-4 max-w-xs w-full pointer-events-none z-10 hidden md:block">
        <div className="pointer-events-auto glass-panel p-4 rounded-2xl border border-slate-700/70 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase text-white"
              style={{ backgroundColor: activeModule.color }}
            >
              {activeModule.badge}
            </span>
          </div>

          <h4 className="text-base font-bold text-white mb-1">
            {activeModule.name}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {activeModule.summary}
          </p>

          <div className="text-[11px] text-purple-300 mb-2 font-medium">
            💡 {activeModule.roleInBusiness}
          </div>

          {onSelectModule && (
            <button
              type="button"
              onClick={() => onSelectModule(activeModule)}
              className="w-full py-1.5 px-3 rounded-xl bg-[#5932EA] hover:bg-[#6b44f2] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Ver mais detalhes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Unified Bottom Control Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl z-20 transition-all pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsHudCollapsed(!isHudCollapsed)}
            className="mb-1 px-3 py-1 rounded-full bg-slate-900/95 border border-slate-700 text-[11px] text-slate-300 hover:text-white flex items-center gap-1 shadow-md"
          >
            {isHudCollapsed ? (
              <>
                <ChevronUp className="w-3 h-3 text-purple-400" />
                <span>Mostrar Módulos 360</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 text-purple-400" />
                <span>Recolher</span>
              </>
            )}
          </button>

          <div
            className={`w-full glass-panel rounded-2xl p-2 border border-slate-700 shadow-xl transition-all ${
              isHudCollapsed ? 'hidden' : 'block'
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
              {ECOSYSTEM_MODULES.map((mod) => {
                const isSelected = activeModule.id === mod.id;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => {
                      setActiveModule(mod);
                      focusNode(mod.id);
                      if (onSelectModule) onSelectModule(mod);
                    }}
                    className={`flex flex-col items-start p-2 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-[#5932EA] text-white shadow-md'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-1 w-full mb-0.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: mod.color }}
                      />
                      <span className="text-[10px] font-bold truncate">
                        {mod.name.replace('Evolux ', '')}
                      </span>
                    </div>
                    <span className="text-[9px] opacity-75 line-clamp-1">
                      {mod.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
