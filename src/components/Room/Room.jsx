import React, { useState } from 'react';
import { roomStatusColors } from '../../constants/roomStatus';

const Room = ({ x, y, width, height, roomNumber, apiRoom, onClick, onHover, isHighlighted }) => {
    const [isHovered, setIsHovered] = useState(false);

    const status = apiRoom?.etat || 'default';
    const fill = roomStatusColors[status] || roomStatusColors.default;

    // Enhanced stroke styling
    const getStroke = () => {
        if (isHighlighted) return '#06b6d4';
        if (isHovered) return '#0f172a';
        return '#334155';
    };

    const getStrokeWidth = () => {
        if (isHighlighted) return 3;
        if (isHovered) return 2.5;
        return 1.5;
    };

    // Get a slightly darker shade for the gradient effect
    const getDarkerFill = (color) => {
        // Simple darkening by reducing brightness
        const darkenAmount = 20;
        const hex = color.replace('#', '');
        const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - darkenAmount);
        const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - darkenAmount);
        const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - darkenAmount);
        return `rgb(${r}, ${g}, ${b})`;
    };

    // Get glow color based on status
    const getGlowColor = () => {
        switch (status) {
            case 'Occupée':
                return 'rgba(239, 68, 68, 0.5)';
            case 'Disponible':
                return 'rgba(34, 197, 94, 0.5)';
            case 'En maintenance':
                return 'rgba(250, 204, 21, 0.5)';
            default:
                return 'rgba(148, 163, 184, 0.3)';
        }
    };

    const textFill = status === 'En maintenance' ? '#78350f' : '#ffffff';
    const gradientId = `room-gradient-${roomNumber}`;
    const glowId = `room-glow-${roomNumber}`;

    return (
        <g
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => {
                setIsHovered(true);
                onHover && onHover(e);
            }}
            onMouseLeave={(e) => {
                setIsHovered(false);
                onHover && onHover(e);
            }}
            onClick={onClick}
        >
            {/* Gradient and Filter Definitions */}
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={fill} />
                    <stop offset="100%" stopColor={getDarkerFill(fill)} />
                </linearGradient>
                <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Glow effect on hover */}
            {isHovered && (
                <rect
                    x={x - 4}
                    y={y - 4}
                    width={width + 8}
                    height={height + 8}
                    rx={10}
                    ry={10}
                    fill="none"
                    stroke={getGlowColor()}
                    strokeWidth={4}
                    opacity={0.6}
                    style={{
                        filter: `blur(4px)`,
                    }}
                />
            )}

            {/* Main room rectangle with gradient */}
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={8}
                ry={8}
                fill={`url(#${gradientId})`}
                stroke={getStroke()}
                strokeWidth={getStrokeWidth()}
                style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: `${x + width / 2}px ${y + height / 2}px`,
                    filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                }}
            />

            {/* Inner highlight for 3D effect */}
            <rect
                x={x + 2}
                y={y + 2}
                width={width - 4}
                height={height / 3}
                rx={6}
                ry={6}
                fill="rgba(255, 255, 255, 0.15)"
                style={{ pointerEvents: 'none' }}
            />

            {/* Room number text with shadow */}
            <text
                x={x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={Math.min(14, Math.floor(Math.min(width, height) / 2.2))}
                fontWeight={700}
                fill={textFill}
                style={{
                    pointerEvents: 'none',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    opacity: 1,
                }}
            >
                {roomNumber}
            </text>

            {/* Status indicator dot in corner */}
            {status !== 'default' && (
                <g>
                    <circle
                        cx={x + width - 8}
                        cy={y + 8}
                        r={4}
                        fill="#ffffff"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' }}
                    />
                    <circle
                        cx={x + width - 8}
                        cy={y + 8}
                        r={2.5}
                        fill={getGlowColor().replace('0.5)', '1)')}
                    />
                </g>
            )}
        </g>
    );
};

export default Room;