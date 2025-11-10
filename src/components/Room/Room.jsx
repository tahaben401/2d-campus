import React from 'react';

const Room = ({ x, y, width, height, roomKey }) => {
  return (
    <rect
      key={roomKey}
      x={x}
      y={y}
      width={width}
      height={height}
      fill="none"
      stroke="gray"
      strokeWidth="2"
      className="hover:fill-cyan-100 dark:hover:fill-cyan-900/30 transition-colors cursor-pointer"
    />
  );
};

export default Room;