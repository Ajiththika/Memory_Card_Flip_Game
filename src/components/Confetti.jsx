import React, { useEffect, useState } from 'react';

const Confetti = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
        const newParticles = [];

        for (let i = 0; i < 100; i++) {
            newParticles.push({
                x: Math.random() * 100,
                y: -10 - Math.random() * 20,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                speed: Math.random() * 5 + 2,
                wobble: Math.random() * 10,
                delay: Math.random() * 2,
                id: i
            });
        }
        setParticles(newParticles);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: '-20px',
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        animation: `fall ${p.speed}s linear infinite`,
                        animationDelay: `${p.delay}s`,
                        opacity: 0.8
                    }}
                />
            ))}
            <style>{`
                @keyframes fall {
                    to {
                        transform: translateY(110vh) rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Confetti;
