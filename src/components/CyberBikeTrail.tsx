import React, { useEffect, useRef } from 'react';

interface CyberBikeTrailProps {
    variant?: 'desktop-horizontal' | 'mobile-vertical';
}

const CyberBikeTrail: React.FC<CyberBikeTrailProps> = ({ variant = 'desktop-horizontal' }) => {
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

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(setCanvasSize, 200);
        };
        window.addEventListener('resize', handleResize);

        const isMobile = variant === 'mobile-vertical';

        // simple light cycle state
        let time = 0;
        const trail: { x: number, y: number, alpha: number }[] = [];
        
        // Initial bike position
        let x = isMobile ? canvas.width / 2 : canvas.width + 100;
        let y = isMobile ? -100 : canvas.height / 2;

        let animationFrameId: number;
        
        const render = () => {
            time += 0.05;
            
            ctx.fillStyle = 'rgba(9, 9, 11, 0.1)'; // deep fade
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const speed = isMobile ? 3 : 5;
            
            if (isMobile) {
                y += speed;
                x = canvas.width / 2 + Math.sin(time) * 100;
                if (y > canvas.height + 200) {
                    y = -200;
                    trail.length = 0;
                }
            } else {
                x -= speed; // Move right to left
                y = canvas.height / 2 + Math.cos(time) * 150;
                if (x < -200) {
                    x = canvas.width + 200;
                    trail.length = 0;
                }
            }

            trail.unshift({ x, y, alpha: 1 });
            if (trail.length > (isMobile ? 30 : 60)) trail.pop();

            // Draw Trail
            if (trail.length > 1) {
                ctx.beginPath();
                ctx.moveTo(trail[0].x, trail[0].y);
                for (let i = 1; i < trail.length; i++) {
                    ctx.lineTo(trail[i].x, trail[i].y);
                }
                ctx.strokeStyle = '#D946EF'; // Softer pink
                ctx.lineWidth = isMobile ? 2 : 4; // Thinner trail
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.shadowColor = '#D946EF';
                ctx.shadowBlur = 10;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // Draw Bike 'Head'
            ctx.beginPath();
            ctx.arc(x, y, isMobile ? 8 : 16, 0, Math.PI * 2); // Doubled size
            ctx.fillStyle = '#FBBF24'; // Cyber Yellow
            ctx.fill();

            // Inner core
            ctx.beginPath();
            ctx.arc(x, y, isMobile ? 4 : 8, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-70"
        />
    );
};

export default CyberBikeTrail;
