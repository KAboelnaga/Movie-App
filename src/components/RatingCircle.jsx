import { motion as Motion } from "motion/react";

export default function RatingCircle({ percent, size = 50, strokeWidth = 4 }) {
    if (percent === undefined || percent === null || percent <= 0) return null;

    const clamped = Math.max(0, Math.min(100, Math.round(percent)));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clamped / 100) * circumference;
    const hue = (clamped / 100) * 120;
    const color = `hsl(${hue}, 75%, 45%)`;

    return (
        <div
            className="position-relative d-inline-flex align-items-center justify-content-center rounded-circle"
            style={{ width: size, height: size, backgroundColor: 'rgba(20, 20, 20, 0.85)' }}
        >
            <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={strokeWidth}/>
                <Motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </svg>
            <span className="text-white inter-700" style={{ fontSize: size * 0.32, lineHeight: 1 }}>
                {clamped}<span style={{ fontSize: size * 0.18 }}>%</span>
            </span>
        </div>
    );
}
