import { useEffect, useRef } from 'react';

interface SandwormTrailProps {
    variant?: 'desktop-horizontal' | 'mobile-vertical';
}

const SandwormTrail = ({ variant = 'desktop-horizontal' }: SandwormTrailProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

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
        window.addEventListener('resize', setCanvasSize);

        // --- CONFIGURATION ---
        const WORM_SIZE = 100; // Even bigger
        const SEGMENT_COUNT = 120; // MASSIVE WORM
        const THUMPER_X_RATIO = 0.85;

        // --- STATE ---
        let time = 0;
        const isMobile = variant === 'mobile-vertical';
        
        // Mobile config overrides
        const wormSize = isMobile ? 40 : WORM_SIZE; // Smaller on mobile
        const segmentCount = isMobile ? 60 : SEGMENT_COUNT; // Fewer segments on mobile
        
        // Initial positions based on variant
        let wormX = isMobile ? canvas.width / 2 : -1000;
        // Start from top (0) on mobile, center on desktop
        let wormY = isMobile ? -200 : canvas.height / 2;
        
        let thumperActive = true;
        let thumperScale = 1; 
        let thumperFallY = 0; 
        
        // Animation State Machine
        type WormState = 'APPROACH' | 'EMERGE' | 'DEVOUR' | 'LEAVE';
        let currentState: WormState = 'APPROACH';
        let stateTimer = 0;
        
        // Visual State
        let wormOpacity = 0; 
        let mouthOpen = 0;
        let headLift = 0;

        // Worm segments (trail)
        const segments: { x: number; y: number; size: number }[] = [];
        // Initialize segments off-screen
        for(let i=0; i<segmentCount; i++) {
            if (isMobile) {
                segments.push({ x: canvas.width/2, y: -500 - i*10, size: wormSize });
            } else {
                segments.push({ x: -1000 - i*15, y: canvas.height/2, size: wormSize });
            }
        }

        // Thumper Rings
        const rings: { r: number; opacity: number }[] = [];

        // PRE-RENDER TEETH PATTERN (huge performance boost!)
        const teethCanvas = document.createElement('canvas');
        const maxMouthSize = wormSize * 1.2;
        teethCanvas.width = maxMouthSize * 2;
        teethCanvas.height = maxMouthSize * 2;
        const teethCtx = teethCanvas.getContext('2d')!;
        
        // Draw teeth pattern once
        teethCtx.translate(maxMouthSize, maxMouthSize);
        const ringCount = 5;
        for(let r = 0; r < ringCount; r++) {
            const ringRadius = maxMouthSize * (1 - r * 0.15);
            const teethCount = 20 - r * 2;
            
            for(let t = 0; t < teethCount; t++) {
                const angle = (t / teethCount) * Math.PI * 2;
                const tx = Math.cos(angle) * ringRadius;
                const ty = Math.sin(angle) * ringRadius;
                
                teethCtx.save();
                teethCtx.translate(tx, ty);
                teethCtx.rotate(angle + Math.PI / 2);
                
                teethCtx.beginPath();
                teethCtx.moveTo(0, 0);
                teethCtx.lineTo(-3, -10);
                teethCtx.lineTo(3, -10);
                teethCtx.closePath();
                teethCtx.fillStyle = 'rgba(240, 240, 255, 1)';
                teethCtx.fill();
                teethCtx.restore();
            }
        }

        // Frame skipping for smoother performance
        // let frameCount = 0;

        const animate = () => {
            time += 0.05;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const thumperX = isMobile ? canvas.width / 2 : canvas.width * THUMPER_X_RATIO;
            // Place thumper near the bottom of the tall canvas on mobile (above Contact)
            // User requested to move it up even more ("entre contact et la fin de projets")
            const thumperY = isMobile ? canvas.height - 1500 : canvas.height / 2;

            // --- STATE LOGIC ---
            let speed = 0;

            switch (currentState) {
                case 'APPROACH':
                    speed = isMobile ? 2.0 : 3.5; // Even slower on mobile
                    wormOpacity = 0.1;
                    mouthOpen = 0;
                    headLift = 0;
                    
                    // Keep going until we reach the thumper position
                    // const distToThumper = isMobile ? (wormY - thumperY) : (thumperX - wormX);
                    const hasReached = isMobile ? (wormY >= thumperY) : (wormX >= thumperX);

                    if (hasReached) {
                        currentState = 'EMERGE';
                        stateTimer = 0;
                    }
                    break;

                case 'EMERGE':
                    speed = 0; // FULL STOP at thumper
                    stateTimer += 0.02;
                    
                    // Rise and Open mouth while stopped
                    wormOpacity = Math.min(1, wormOpacity + 0.02);
                    mouthOpen = Math.min(1, mouthOpen + 0.015); // Slow open
                    headLift = Math.min(70, headLift + 0.5); // Rise higher
                    
                    // When mouth is fully open, start devouring
                    if (mouthOpen > 0.95) {
                        currentState = 'DEVOUR';
                        stateTimer = 0;
                    }
                    break;

                case 'DEVOUR':
                    stateTimer += 0.02;
                    
                    // Stay completely still for 2 seconds
                    speed = 0;
                    
                    // Keep mouth open
                    mouthOpen = 1.0;
                    
                    // Animate thumper falling into mouth
                    if (thumperActive && stateTimer < 1.5) {
                        // Scale down and move up (falling into mouth)
                        thumperScale = Math.max(0.1, 1 - stateTimer * 0.6);
                        thumperFallY = stateTimer * -30; // Move up into mouth
                    } else if (thumperActive) {
                        thumperActive = false; // Disappear
                    }
                    
                    // After 2 seconds, start leaving
                    if (stateTimer > 2) {
                        currentState = 'LEAVE';
                    }
                    break;

                case 'LEAVE':
                    speed = isMobile ? 1.0 : 1.5; // Slower exit
                    wormOpacity = Math.max(0.1, wormOpacity - 0.005); 
                    mouthOpen = Math.max(0, mouthOpen - 0.02); 
                    headLift = Math.max(0, headLift - 0.5); 

                    const isGone = isMobile ? (wormY > canvas.height + 200) : (wormX > canvas.width + 1000);

                    if (isGone) {
                        if (isMobile) {
                            wormY = -200;
                            wormX = canvas.width / 2;
                        } else {
                            wormX = -1000;
                        }
                        
                        currentState = 'APPROACH';
                        thumperActive = true;
                        thumperScale = 1;
                        thumperFallY = 0;
                        // Reset segments
                        for(let i=0; i<segmentCount; i++) {
                            if (isMobile) {
                                segments[i] = { x: canvas.width/2, y: -200 - i*10, size: wormSize };
                            } else {
                                segments[i] = { x: -1000 - i*15, y: canvas.height/2, size: wormSize };
                            }
                        }
                    }
                    break;
            }

            // --- UPDATE POSITION ---
            if (isMobile) {
                wormY += speed;
                // Sine wave movement (Horizontal for vertical worm)
                const waveAmp = (currentState === 'EMERGE' || currentState === 'DEVOUR') ? 2 : 15;
                const waveX = Math.sin(time * 0.5) * waveAmp + Math.sin(time * 0.2) * (waveAmp/2);
                wormX = canvas.width / 2 + waveX; // No head lift on X axis for now
            } else {
                wormX += speed;
                // Sine wave movement (Vertical for horizontal worm)
                const waveAmp = (currentState === 'EMERGE' || currentState === 'DEVOUR') ? 2 : 40;
                const waveY = Math.sin(time * 0.5) * waveAmp + Math.sin(time * 0.2) * (waveAmp/2);
                wormY = canvas.height / 2 + waveY - headLift;
            }

            // Update Segments (only if worm is moving)
            if (speed > 0) {
                segments.unshift({ x: wormX, y: wormY, size: wormSize });
                if (segments.length > segmentCount) segments.pop();
            }


            // --- 1. DRAW SAND WAVES ---
            // Sand Waves
            ctx.beginPath();
            for (let side = -1; side <= 1; side += 2) {
                for (let i = 0; i < segments.length; i += 3) {
                    const s = segments[i];
                    // Wave offset direction depends on orientation
                    const waveOffset = s.size * 1.2 * side;
                    
                    let waveX, waveY;
                    if (isMobile) {
                        waveX = s.x + waveOffset;
                        waveY = s.y - 10;
                    } else {
                        waveX = s.x - 20;
                        waveY = s.y + waveOffset;
                    }
                    
                    if (i === 0) ctx.moveTo(waveX, waveY);
                    else ctx.lineTo(waveX, waveY);
                }
            }
            ctx.strokeStyle = `rgba(160, 82, 45, ${0.3 + wormOpacity * 0.2})`;
            ctx.lineWidth = 3;
            ctx.stroke();


            // --- 2. DRAW WORM BODY ---
            for (let i = segments.length - 1; i >= 0; i--) {
                const s = segments[i];
                const indexRatio = i / segmentCount;
                const size = s.size * (1 - indexRatio * 0.3); // Very thick body

                const segOpacity = wormOpacity * (1 - indexRatio * 0.2);
                if (segOpacity < 0.05) continue;

                ctx.beginPath();
                ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
                
                const gradient = ctx.createLinearGradient(s.x, s.y - size, s.x, s.y + size);
                gradient.addColorStop(0, `rgba(60, 30, 10, ${segOpacity})`);
                gradient.addColorStop(0.5, `rgba(100, 50, 20, ${segOpacity})`);
                gradient.addColorStop(1, `rgba(40, 20, 5, ${segOpacity})`);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                ctx.strokeStyle = `rgba(30, 15, 5, ${segOpacity * 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Draw Head (Circular Mouth)
            const headX = wormX;
            const headY = wormY;
            const headSize = wormSize;
            
            if (wormOpacity > 0.1) {
                ctx.save();
                ctx.translate(headX, headY);
                if (isMobile) ctx.rotate(Math.PI / 2); // Rotate head 90deg for vertical movement
                
                // Outer Skin Ring
                ctx.beginPath();
                ctx.arc(0, 0, headSize * 1.1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(42, 26, 16, ${wormOpacity})`;
                ctx.fill();

                if (mouthOpen > 0.05) {
                    const maxRadius = headSize;
                    const currentRadius = maxRadius * mouthOpen;

                    // Black Void Center
                    ctx.beginPath();
                    ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
                    ctx.fillStyle = 'black';
                    ctx.fill();

                    // Draw pre-rendered teeth (MUCH faster!)
                    ctx.save();
                    const scale = currentRadius / maxMouthSize;
                    ctx.scale(scale, scale);
                    ctx.globalAlpha = wormOpacity;
                    ctx.drawImage(teethCanvas, -maxMouthSize, -maxMouthSize);
                    ctx.restore();
                    
                    // Deep Throat Glow
                    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius * 0.5);
                    glow.addColorStop(0, `rgba(255, 100, 0, ${wormOpacity * 0.8})`);
                    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    ctx.fillStyle = glow;
                    ctx.fill();

                } else {
                    // Closed Head (Round)
                    ctx.beginPath();
                    ctx.arc(0, 0, headSize, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(42, 26, 16, ${wormOpacity})`;
                    ctx.fill();
                }
                ctx.restore();
            }


            // --- 3. DRAW THUMPER (on top) ---
            if (thumperActive) {
                ctx.save();
                ctx.translate(thumperX, thumperY + thumperFallY);
                const baseScale = isMobile ? 0.6 : 1.0;
                ctx.scale(thumperScale * baseScale, thumperScale * baseScale);
                
                // Legs
                ctx.strokeStyle = '#2a1a10';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(0, 50);
                ctx.lineTo(-20, 80);
                ctx.moveTo(0, 50);
                ctx.lineTo(20, 80);
                ctx.stroke();

                // Body
                ctx.fillStyle = '#4a3b2a'; 
                ctx.fillRect(-8, -60, 16, 110);
                
                // Details
                ctx.fillStyle = '#1a1008';
                ctx.fillRect(-10, -20, 20, 10);
                ctx.fillRect(-10, 20, 20, 10);

                // Hammer
                const thumpCycle = Math.sin(time * 0.8);
                const hammerY = -80 + (thumpCycle > 0.8 ? -30 : 0);
                
                ctx.fillStyle = '#6d4c41';
                ctx.beginPath();
                ctx.roundRect(-25, hammerY, 50, 25, 5);
                ctx.fill();

                // Rings
                if (thumpCycle > 0.95 && Math.random() > 0.7) {
                    rings.push({ r: 20, opacity: 0.8 });
                }

                ctx.lineWidth = 2;
                for (let i = rings.length - 1; i >= 0; i--) {
                    const ring = rings[i];
                    ring.r += 3;
                    ring.opacity -= 0.015;
                    
                    ctx.beginPath();
                    ctx.ellipse(0, 70, ring.r, ring.r * 0.3, 0, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(217, 119, 6, ${ring.opacity})`;
                    ctx.stroke();

                    if (ring.opacity <= 0) rings.splice(i, 1);
                }
                
                ctx.restore(); // Close thumper transform
            }

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-multiply"
        />
    );
};

export default SandwormTrail;
