import { useEffect, useRef } from 'react';

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Create 3-4 localized mini-storms
        const stormCount = Math.floor(Math.random() * 2) + 3;
        const storms: Storm[] = [];

        for (let i = 0; i < stormCount; i++) {
            storms.push({
                x: (canvas.width / stormCount) * i + Math.random() * (canvas.width / stormCount),
                y: Math.random() * (canvas.height * 0.7),
                radius: 150 + Math.random() * 100, // Slightly larger radius for looser groups
                strength: 0.2 + Math.random() * 0.3,
                // VERY SLOW storm movement
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.05
            });
        }

        // Create particles
        const particlesPerStorm = 40;
        const particles: Particle[] = [];

        storms.forEach((storm, stormId) => {
            for (let i = 0; i < particlesPerStorm; i++) {
                // Initialize in a cloud around the storm center
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * storm.radius;

                particles.push({
                    x: storm.x + Math.cos(angle) * distance,
                    y: storm.y + Math.sin(angle) * distance,
                    size: Math.random() * 2.5 + 0.5,
                    opacity: Math.random() * 0.6 + 0.3,
                    angle: angle, // Current orbital angle
                    radius: distance, // Current orbital radius
                    speed: (Math.random() * 0.002 + 0.001) * (Math.random() < 0.5 ? 1 : -1), // Very slow orbital speed, random direction
                    stormId,
                    turbulenceOffset: Math.random() * 100
                });
            }
        });

        // Animation loop
        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            // ULTRA SLOW time increment
            time += 0.005;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Separation parameters
            const minSeparation = 25;
            const separationForce = 0.02; // Gentle repulsion

            // Update storms
            storms.forEach((storm) => {
                // Storms drift very slowly
                storm.x += Math.sin(time * 0.1) * 0.05 + storm.speedX;
                storm.y += Math.cos(time * 0.08) * 0.05 + storm.speedY;

                // Wrap storms
                if (storm.x < -200) storm.x = canvas.width + 200;
                if (storm.x > canvas.width + 200) storm.x = -200;
                if (storm.y < -200) storm.y = canvas.height + 200;
                if (storm.y > canvas.height * 0.8) storm.y = -200;
            });

            particles.forEach((particle, index) => {
                const storm = storms[particle.stormId];

                // 1. ORBITAL MOVEMENT (The core "Group" logic)
                // Instead of following velocity vectors, particles orbit their storm center
                // This guarantees they stay in a group but never form lines

                // Update angle based on orbital speed
                particle.angle += particle.speed;

                // Add some breathing to the radius (in and out movement)
                const breathing = Math.sin(time * 0.5 + particle.turbulenceOffset) * 20;
                const currentRadius = particle.radius + breathing;

                // Calculate target position based on orbit
                const targetX = storm.x + Math.cos(particle.angle) * currentRadius;
                const targetY = storm.y + Math.sin(particle.angle) * currentRadius;

                // 2. TURBULENCE (Organic noise)
                const turbulenceX = Math.sin(time * 0.5 + particle.turbulenceOffset) * 10;
                const turbulenceY = Math.cos(time * 0.3 + particle.turbulenceOffset) * 10;

                // 3. SEPARATION (Prevent clumping)
                let sepX = 0;
                let sepY = 0;

                for (let j = 0; j < particles.length; j++) {
                    if (index === j) continue;
                    const other = particles[j];
                    if (other.stormId !== particle.stormId) continue;

                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < minSeparation && dist > 0) {
                        const force = (minSeparation - dist) / minSeparation;
                        sepX += (dx / dist) * force * separationForce * 50; // Scale up for position update
                        sepY += (dy / dist) * force * separationForce * 50;
                    }
                }

                // 4. MOVE PARTICLE
                // We interpolate current position towards target orbital position
                // This creates a smooth, "floaty" following effect
                const lerpFactor = 0.02; // Very low for sluggish, heavy feel

                particle.x += (targetX + turbulenceX + sepX - particle.x) * lerpFactor;
                particle.y += (targetY + turbulenceY + sepY - particle.y) * lerpFactor;

                // Draw particle
                const colorVariation = Math.sin(time + particle.turbulenceOffset) * 20;
                const r = 235 + colorVariation;
                const g = 90 + colorVariation;
                const b = 50 + colorVariation * 0.5;

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // No trails needed for very slow movement (they would just be dots)
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default SandstormEffect;
