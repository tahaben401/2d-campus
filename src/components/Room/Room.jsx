import React from 'react';
import { roomStatusColors } from '../../constants/roomStatus';


const Room = ({ x, y, width, height, roomNumber, apiRoom, onClick, onHover, isHighlighted }) => {
const status = apiRoom?.etat || 'default';
const fill = roomStatusColors[status] || roomStatusColors.default;
const stroke = isHighlighted ? '#06b6d4' : '#0f172a';
const textFill = '#071024';


return (
            <g>
            <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={6}
            ry={6}
            fill={fill}
            stroke={stroke}
            strokeWidth={isHighlighted ? 3 : 1.5}
            className="cursor-pointer transition-all"
            onClick={onClick}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            />
            <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={Math.min(14, Math.floor(Math.min(width, height) / 2))}
            fontWeight={700}
            fill={textFill}
            style={{ pointerEvents: 'none' }}
            >
            {roomNumber}
            </text>
            </g>
);
};


export default Room;