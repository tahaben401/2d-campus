import { useRef, useEffect, useState } from 'react';


// Minimal pan & zoom hook for an SVG container
export default function usePanZoom(initialZoom = 1) {
const containerRef = useRef(null);
const [zoom, setZoom] = useState(initialZoom);
const [offset, setOffset] = useState({ x: 0, y: 0 });
const dragging = useRef(false);
const last = useRef({ x: 0, y: 0 });


useEffect(() => {
const el = containerRef.current;
if (!el) return;


const onWheel = (e) => {
e.preventDefault();
const delta = -e.deltaY * 0.001;
setZoom((z) => Math.min(3, Math.max(0.5, +(z + delta).toFixed(2))));
};


const onMouseDown = (e) => {
dragging.current = true;
last.current = { x: e.clientX, y: e.clientY };
el.style.cursor = 'grabbing';
};


const onMouseMove = (e) => {
if (!dragging.current) return;
const dx = e.clientX - last.current.x;
const dy = e.clientY - last.current.y;
last.current = { x: e.clientX, y: e.clientY };
setOffset(o => ({ x: o.x + dx, y: o.y + dy }));
};


const onMouseUp = () => {
dragging.current = false;
el.style.cursor = 'grab';
};


el.addEventListener('wheel', onWheel, { passive: false });
el.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);


el.style.cursor = 'grab';


return () => {
el.removeEventListener('wheel', onWheel);
el.removeEventListener('mousedown', onMouseDown);
window.removeEventListener('mousemove', onMouseMove);
window.removeEventListener('mouseup', onMouseUp);
};
}, []);


return { containerRef, zoom, setZoom, offset, setOffset };
}