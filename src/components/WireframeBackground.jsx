// import { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// window.THREE = THREE;

// import 'vanta/dist/vanta.birds.min';

// function WireframeBackground() {
//   const vantaRef = useRef(null);
//   const [vantaEffect, setVantaEffect] = useState(null);

//   useEffect(() => {
//     if (!vantaEffect && window.VANTA) {
//       setVantaEffect(
//         window.VANTA.BIRDS({
//           el: vantaRef.current,
//           THREE: THREE,
//           mouseControls: true,
//           touchControls: true,
//           gyroControls: false,
//           minHeight: 200.00,
//           minWidth: 200.00,
//           scale: 1.00,
//           scaleMobile: 1.00,
//           backgroundColor: 0xffffff,   // white, matches your site
//           backgroundAlpha: 1,
//           color1: 0x0056b3,             // your brand blue, replacing their red
//           color2: 0x0d1fff,
//           colorMode: 'varianceGradient',
//           quantity: 4.00,               // ← lowered from their demo's 5, lighter on your GPU
//           birdSize: 1.25,
//           wind: 0.3, 
//           wingSpan: 25.00,
//           speedLimit: 4.00,
//           separation: 20.00,
//           alignment: 20.00,
//           cohesion: 20.00
//         })
//       );
//     }
//     return () => {
//       if (vantaEffect) vantaEffect.destroy();
//     };
//   }, [vantaEffect]);

//   return (
//     <div
//       ref={vantaRef}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         zIndex: -1
//       }}
//     />
//   );
// }

// export default WireframeBackground;


import { useCallback, useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

function WireframeBackground() {
  const particlesLoaded = useCallback(async (container) => {
    // optional: console.log("Particles loaded", container);
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: 160, density: { enable: true, area: 800 } },
        color: { value: '#f4f4f4' },
        links: {
          enable: true,
          color: '#f5f5f5',
          distance: 190,
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.6,
          outModes: { default: 'bounce' }
        },
        size: { value: 2 },
        opacity: { value: 0.5 }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' }
        },
        modes: {
          grab: {
            distance: 180,
            links: { opacity: 0.8 }
          }
        }
      },
      detectRetina: true
    }),
    []
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="wireframe-bg"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        }}
      />
    </ParticlesProvider>
  );
}

export default WireframeBackground;