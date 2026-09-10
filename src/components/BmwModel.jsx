// src/components/BmwModel.jsx
import React from 'react';

export default function BmwModel() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <model-viewer
        src="/yamaha_yzf-r1_race_tech_black.glb"  
        alt="Yamaha R1 3D Model"
        auto-rotate
        camera-controls
        shadow-intensity="2"
        exposure="1"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      ></model-viewer>
    </div>
  );
} 