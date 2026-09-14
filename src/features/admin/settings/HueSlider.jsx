import { useRef, useCallback, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
function hslToHex(h, s = 75, l = 55) {
	const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0');
	};
	return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hexToHue(hex) {
	if (!hex || !hex.startsWith('#')) return 24;
	const clean = hex.replace('#', '');
	const full =
		clean.length === 3
			? clean.split('').map((c) => c + c).join('')
			: clean;
	const r = parseInt(full.substring(0, 2), 16) / 255;
	const g = parseInt(full.substring(2, 4), 16) / 255;
	const b = parseInt(full.substring(4, 6), 16) / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	if (max === min) return 0;

	let hue;
	const d = max - min;
	if (max === r) hue = ((g - b) / d) % 6;
	else if (max === g) hue = (b - r) / d + 2;
	else hue = (r - g) / d + 4;
	hue = Math.round(hue * 60);
	if (hue < 0) hue += 360;
	return hue;
}

export default function HueSlider({ value, onChange }) {
	const [hue, setHue] = useState(() => hexToHue(value));
	const trackRef = useRef(null);
	const isDraggingRef = useRef(false);
	useEffect(() => {
		setHue(hexToHue(value));
	}, [value]);

	const updateFromClientX = useCallback(
		(clientX) => {
			const track = trackRef.current;
			if (!track) return;

			const rect = track.getBoundingClientRect();
			const ratio = Math.min(
				Math.max((clientX - rect.left) / rect.width, 0),
				1
			);
			const newHue = Math.round(ratio * 360);
			setHue(newHue);

			const hex = hslToHex(newHue);
			onChange(hex);
		},
		[onChange]
	);

	const handlePointerDown = (e) => {
		isDraggingRef.current = true;
		e.currentTarget.setPointerCapture?.(e.pointerId);
		updateFromClientX(e.clientX);
	};

	const handlePointerMove = (e) => {
		if (!isDraggingRef.current) return;
		updateFromClientX(e.clientX);
	};

	const handlePointerUp = (e) => {
		isDraggingRef.current = false;
		e.currentTarget.releasePointerCapture?.(e.pointerId);
	};
	const positionPct = (hue / 360) * 100;

	return (
		<Box ref={trackRef} position="relative" w="full" h="14px" borderRadius="full" cursor="pointer" 
		touchAction="none" userSelect="none" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}	
		sx={{
				background:
					'linear-gradient(to right, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)',
			}}
		>
			<Box 
			position="absolute" top="50%" left={`${positionPct}%`} transform="translate(-50%, -50%)"
			w="20px" h="20px" borderRadius="full" border="3px solid" borderColor="white"
			boxShadow="0 1px 4px rgba(0,0,0,0.25)" bg={value}pointerEvents="none"
			/>
		</Box>
	);
}

export { hslToHex, hexToHue };