import { useEffect, useRef } from 'react';
import { useUniverse } from '../contexts/UniverseContext';

interface Particle {
    x: number;
    y: number;
    size: number;
    opacity: number;
    angle: number; // Angle relative to storm center
    radius: number; // Distance from storm center
    speed: number; // Orbital speed
    stormId: number;
    turbulenceOffset: number;
}

interface Storm {
    x: number;
    y: number;
    radius: number;
    strength: number;
    speedX: number;
    speedY: number;
}

const SandstormEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { universe } = useUniverse();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true }); // Optimized context
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        setCanvasSize();

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(setCanvasSize, 200);
        };
        window.addEventListener('resize', handleResize);

        // --- PRE-RENDER PARTICLE SPRITE ---
        // Creating a glowing dot once and reusing it is much faster than shadowBlur
        const spriteSize = 32;
        const halfSprite = spriteSize / 2;
        const particleCanvas = document.createElement('canvas');
        particleCanvas.width = spriteSize;
        particleCanvas.height = spriteSize;
        const pCtx = particleCanvas.getContext('2d')!;

        // Draw glowing dot
        const gradient = pCtx.createRadialGradient(halfSprite, halfSprite, 0, halfSprite, halfSprite, halfSprite);
        const isCyber = universe === 'cyberpunk';
        gradient.addColorStop(0, isCyber ? 'rgba(253, 224, 71, 1)' : 'rgba(255, 140, 40, 1)'); // Core
        gradient.addColorStop(0.4, isCyber ? 'rgba(253, 224, 71, 0.5)' : 'rgba(255, 100, 20, 0.5)'); // Glow
        gradient.addColorStop(1, isCyber ? 'rgba(253, 224, 71, 0)' : 'rgba(255, 100, 20, 0)'); // Fade

        pCtx.fillStyle = gradient;
        pCtx.fillRect(0, 0, spriteSize, spriteSize);

        // Create 3-4 localized mini-storms
        const stormCount = Math.floor(Math.random() * 2) + 3;
        const storms: Storm[] = [];

        for (let i = 0; i < stormCount; i++) {
            storms.push({
                x: (canvas.width / stormCount) * i + Math.random() * (canvas.width / stormCount),
                y: Math.random() * (canvas.height * 0.7),
                radius: 150 + Math.random() * 100,
                strength: 0.2 + Math.random() * 0.3,
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.05
            });
        }

        // Create particles
        const isMobile = window.innerWidth < 768;
        const particlesPerStorm = isMobile ? 6 : 25; // Drastically reduced on mobile (was 0)
        const particles: Particle[] = [];

        storms.forEach((storm, stormId) => {
            for (let i = 0; i < particlesPerStorm; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * storm.radius;

                particles.push({
                    x: storm.x + Math.cos(angle) * distance,
                    y: storm.y + Math.sin(angle) * distance,
                    size: Math.random() * 2.5 + 0.5,
                    opacity: Math.random() * 0.6 + 0.3,
                    angle: angle,
                    radius: distance,
                    speed: (Math.random() * 0.002 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
                    stormId,
                    turbulenceOffset: Math.random() * 100
                });
            }
        });

        // Animation loop
        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            time += 0.005;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update storms
            for (let i = 0; i < storms.length; i++) {
                const storm = storms[i];
                storm.x += Math.sin(time * 0.1) * 0.05 + storm.speedX;
                storm.y += Math.cos(time * 0.08) * 0.05 + storm.speedY;

                if (storm.x < -200) storm.x = canvas.width + 200;
                if (storm.x > canvas.width + 200) storm.x = -200;
                if (storm.y < -200) storm.y = canvas.height + 200;
                if (storm.y > canvas.height * 0.8) storm.y = -200;
            }

            // Batch drawing - no state changes inside loop
            // We use the pre-rendered sprite

            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                const storm = storms[particle.stormId];

                // 1. ORBITAL MOVEMENT
                particle.angle += particle.speed;

                const breathing = Math.sin(time * 0.5 + particle.turbulenceOffset) * 20;
                const currentRadius = particle.radius + breathing;

                const targetX = storm.x + Math.cos(particle.angle) * currentRadius;
                const targetY = storm.y + Math.sin(particle.angle) * currentRadius;

                // 2. TURBULENCE
                const turbulenceX = Math.sin(time * 0.5 + particle.turbulenceOffset) * 10;
                const turbulenceY = Math.cos(time * 0.3 + particle.turbulenceOffset) * 10;

                // 3. MOVE PARTICLE
                const lerpFactor = 0.02;
                particle.x += (targetX + turbulenceX - particle.x) * lerpFactor;
                particle.y += (targetY + turbulenceY - particle.y) * lerpFactor;

                // Draw particle using sprite
                // Calculate size and opacity
                // We can scale the sprite

                const drawSize = particle.size * 4; // Scale up because sprite includes glow

                ctx.globalAlpha = particle.opacity;
                ctx.drawImage(
                    particleCanvas,
                    particle.x - drawSize / 2,
                    particle.y - drawSize / 2,
                    drawSize,
                    drawSize
                );
            }
            ctx.globalAlpha = 1.0; // Reset alpha

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [universe]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default SandstormEffect;
