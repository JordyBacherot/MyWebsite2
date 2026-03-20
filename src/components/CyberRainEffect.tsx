import React, { useEffect, useRef } from 'react';

const CyberRainEffect: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            x: number;
            y: number;
            velocity: number;
            length: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.velocity = Math.random() * 8 + 4;
                this.length = Math.random() * 40 + 20;
                const colors = ['#00F0FF', '#FBBF24', '#D946EF'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.y += this.velocity;
                if (this.y > canvas!.height) {
                    this.y = -this.length;
                    this.x = Math.random() * canvas!.width;
                    this.velocity = Math.random() * 8 + 4;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.length);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.5;
                ctx.lineCap = 'round';
                ctx.globalAlpha = 0.5;
                ctx.stroke();
            }
        }

        const particles: Particle[] = Array.from({ length: 80 }, () => new Particle());

        const render = () => {
            ctx.fillStyle = 'rgba(9, 9, 11, 0.2)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 w-full h-full pointer-events-none opacity-15 mix-blend-screen"
        />
    );
};

export default CyberRainEffect;
