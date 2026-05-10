import React, { useEffect, useRef, useState } from 'react';
import { Video, X } from 'lucide-react';

const JunctionSimulation = () => {
  const canvasRef = useRef(null);
  const [trafficLight, setTrafficLight] = useState('NS');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const cars = [];
    const carColors = ['#0ea5e9', '#a855f7', '#22c55e', '#eab308'];
    const vehicleTypes = ['car', 'car', 'car', 'truck', 'bike', 'ambulance'];

    const createCar = (dir) => {
      const type = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
      let color = carColors[Math.floor(Math.random() * carColors.length)];
      let width = 20;
      let height = 10;
      
      if (type === 'truck') {
        width = 35;
        height = 14;
      } else if (type === 'bike') {
        width = 12;
        height = 6;
      } else if (type === 'ambulance') {
        width = 25;
        height = 12;
        color = '#ef4444'; // red
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const roadWidth = 120;
      const margin = 100;

      let x, y, vx, vy;
      switch(dir) {
        case 'N': x = canvasWidth/2 + 25; y = -margin; vx = 0; vy = 2.5; break;
        case 'S': x = canvasWidth/2 - 25; y = canvasHeight + margin; vx = 0; vy = -2.5; break;
        case 'E': x = canvasWidth + margin; y = canvasHeight/2 + 25; vx = -2.5; vy = 0; break;
        case 'W': x = -margin; y = canvasHeight/2 - 25; vx = 2.5; vy = 0; break;
      }

      return { x, y, vx, vy, color, dir, type, width, height, stopped: false };
    };

    const drawRoads = () => {
      const roadWidth = 120;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Base Road
      ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
      ctx.fillRect(0, cy - roadWidth/2, canvas.width, roadWidth);
      ctx.fillRect(cx - roadWidth/2, 0, roadWidth, canvas.height);

      // Markings
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.4)';
      ctx.setLineDash([10, 10]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy);
      ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Borders
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, cy - roadWidth/2, canvas.width, roadWidth);
      ctx.strokeRect(cx - roadWidth/2, 0, roadWidth, canvas.height);
    };

    const drawCentralNode = (time) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pulse = Math.sin(time / 500) * 5 + 40;

      // Outer glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse + 20);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.2)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse + 20, 0, Math.PI * 2);
      ctx.fill();

      // Main Circle
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.fillStyle = '#020617';
      ctx.fill();

      // Text
      ctx.fillStyle = '#0ea5e9';
      ctx.font = '900 12px Outfit';
      ctx.textAlign = 'center';
      ctx.fillText('AI-RL', cx, cy - 2);
      ctx.font = '700 8px Outfit';
      ctx.fillText('CONTROL', cx, cy + 8);
    };

    const drawTrafficSignals = (currentLight) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const offset = 70;

      const signals = [
        { dir: 'N', x: cx + 30, y: cy - offset },
        { dir: 'S', x: cx - 30, y: cy + offset },
        { dir: 'E', x: cx + offset, y: cy + 30 },
        { dir: 'W', x: cx - offset, y: cy - 30 }
      ];

      signals.forEach(sig => {
        let isGreen = false;
        if (currentLight === 'NS' && (sig.dir === 'N' || sig.dir === 'S')) isGreen = true;
        if (currentLight === 'EW' && (sig.dir === 'E' || sig.dir === 'W')) isGreen = true;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)'; // dark bg for signal box
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        if (sig.dir === 'N' || sig.dir === 'S') {
          ctx.fillRect(sig.x - 6, sig.y - 12, 12, 24);
          ctx.strokeRect(sig.x - 6, sig.y - 12, 12, 24);
          // Red
          ctx.fillStyle = isGreen ? '#334155' : '#ef4444';
          ctx.beginPath(); ctx.arc(sig.x, sig.y - 5, 3, 0, Math.PI * 2); ctx.fill();
          if (!isGreen) { ctx.shadowBlur = 10; ctx.shadowColor = '#ef4444'; ctx.fill(); ctx.shadowBlur = 0; }
          // Green
          ctx.fillStyle = isGreen ? '#22c55e' : '#334155';
          ctx.beginPath(); ctx.arc(sig.x, sig.y + 5, 3, 0, Math.PI * 2); ctx.fill();
          if (isGreen) { ctx.shadowBlur = 10; ctx.shadowColor = '#22c55e'; ctx.fill(); ctx.shadowBlur = 0; }
        } else {
          ctx.fillRect(sig.x - 12, sig.y - 6, 24, 12);
          ctx.strokeRect(sig.x - 12, sig.y - 6, 24, 12);
          // Red
          ctx.fillStyle = isGreen ? '#334155' : '#ef4444';
          ctx.beginPath(); ctx.arc(sig.x - 5, sig.y, 3, 0, Math.PI * 2); ctx.fill();
          if (!isGreen) { ctx.shadowBlur = 10; ctx.shadowColor = '#ef4444'; ctx.fill(); ctx.shadowBlur = 0; }
          // Green
          ctx.fillStyle = isGreen ? '#22c55e' : '#334155';
          ctx.beginPath(); ctx.arc(sig.x + 5, sig.y, 3, 0, Math.PI * 2); ctx.fill();
          if (isGreen) { ctx.shadowBlur = 10; ctx.shadowColor = '#22c55e'; ctx.fill(); ctx.shadowBlur = 0; }
        }
      });
    };

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRoads();

      const currentLight = (Math.floor(time / 4000) % 2 === 0) ? 'NS' : 'EW';
      setTrafficLight(currentLight);

      if (Math.random() < 0.04) {
        const dirs = ['N', 'S', 'E', 'W'];
        cars.push(createCar(dirs[Math.floor(Math.random() * dirs.length)]));
      }

      for (let i = cars.length - 1; i >= 0; i--) {
        const car = cars[i];
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const stopDist = 80;

        let shouldStop = false;
        if (currentLight === 'EW' && (car.dir === 'N' || car.dir === 'S')) {
          if (car.dir === 'N' && car.y < cy - stopDist && car.y > cy - stopDist - 20) shouldStop = true;
          if (car.dir === 'S' && car.y > cy + stopDist && car.y < cy + stopDist + 20) shouldStop = true;
        }
        if (currentLight === 'NS' && (car.dir === 'E' || car.dir === 'W')) {
          if (car.dir === 'E' && car.x > cx + stopDist && car.x < cx + stopDist + 20) shouldStop = true;
          if (car.dir === 'W' && car.x < cx - stopDist && car.x > cx - stopDist - 20) shouldStop = true;
        }

        // Simple car following
        for (let j = 0; j < cars.length; j++) {
          if (i === j) continue;
          const other = cars[j];
          if (car.dir === other.dir) {
            const d = (car.width + other.width) / 2 + 10;
            if (car.dir === 'N' && other.y > car.y && other.y - car.y < d) shouldStop = true;
            if (car.dir === 'S' && other.y < car.y && car.y - other.y < d) shouldStop = true;
            if (car.dir === 'E' && other.x < car.x && car.x - other.x < d) shouldStop = true;
            if (car.dir === 'W' && other.x > car.x && other.x - car.x < d) shouldStop = true;
          }
        }

        if (!shouldStop) {
          car.x += car.vx;
          car.y += car.vy;
        }

        ctx.save();
        ctx.translate(car.x, car.y);
        if (car.dir === 'N' || car.dir === 'S') ctx.rotate(Math.PI / 2);
        
        // Car Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = car.color;
        ctx.fillStyle = car.color;
        
        if (car.type === 'bike') {
          ctx.beginPath();
          ctx.ellipse(0, 0, car.width/2, car.height/2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-car.width/2, -car.height/2, car.width, car.height);
        }
        
        if (car.type === 'ambulance') {
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          ctx.fillText('A', 0, 1);
          
          // Flashing lights
          if (Math.floor(time / 200) % 2 === 0) {
            ctx.fillStyle = '#3b82f6'; // blue light
            ctx.fillRect(car.width/2 - 6, -car.height/2, 4, car.height/2);
          } else {
            ctx.fillStyle = '#ffffff'; // white light
            ctx.fillRect(car.width/2 - 6, 0, 4, car.height/2);
          }
        }
        
        ctx.restore();

        if (car.x < -200 || car.x > canvas.width + 200 || car.y < -200 || car.y > canvas.height + 200) {
          cars.splice(i, 1);
        }
      }

      drawCentralNode(time);
      drawTrafficSignals(currentLight);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef} 
        width={1200} 
        height={600} 
        className="w-full h-full object-cover"
      />

      {/* Camera Button Overlay */}
      <button 
        onClick={() => setShowCamera(true)}
        className="absolute top-4 right-4 bg-black/60 border border-neon-cyan/50 text-neon-cyan px-3 py-2 rounded-lg hover:bg-neon-cyan/20 transition-all flex items-center gap-2 group z-10"
      >
        <Video size={16} className="group-hover:animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest">View Camera</span>
      </button>

      {/* Camera Modal */}
      {showCamera && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col border border-neon-cyan/30 rounded-lg overflow-hidden">
          <div className="w-full p-3 flex justify-between items-center bg-black border-b border-glass-border">
             <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2 py-1 bg-red-500/10 border border-red-500/30 rounded">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Live REC</span>
                </div>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">CAM-07 • Junction A1</span>
             </div>
             <button onClick={() => setShowCamera(false)} className="text-secondary hover:text-white transition-colors bg-white/5 p-1 rounded">
               <X size={16} />
             </button>
          </div>
          
          <div className="w-full flex-1 relative bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
             {/* Simulated Camera Feed Background */}
             <div 
                className="absolute inset-0 bg-cover bg-center opacity-80 filter grayscale contrast-125 brightness-75"
                style={{ backgroundImage: `url('/traffic_cam.png')` }}
             ></div>
             
             {/* AI Vision Overlays */}
             <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-[35%] left-[20%] w-[100px] h-[70px] border-2 border-neon-green/80 bg-neon-green/10 flex items-end">
                   <span className="bg-neon-green text-black text-[9px] font-bold px-1.5 py-0.5 absolute -top-5 left-0">CAR • 98%</span>
                </div>
                <div className="absolute top-[40%] left-[60%] w-[150px] h-[90px] border-2 border-neon-purple/80 bg-neon-purple/10 flex items-end">
                   <span className="bg-neon-purple text-white text-[9px] font-bold px-1.5 py-0.5 absolute -top-5 left-0">TRUCK • 94%</span>
                </div>
                <div className="absolute top-[65%] left-[45%] w-[40px] h-[60px] border-2 border-neon-yellow/80 bg-neon-yellow/10 flex items-end">
                   <span className="bg-neon-yellow text-black text-[9px] font-bold px-1.5 py-0.5 absolute -top-5 left-0">PERSON • 87%</span>
                </div>
                
                {/* Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-full h-px bg-neon-cyan absolute"></div>
                  <div className="w-px h-full bg-neon-cyan absolute"></div>
                  <div className="w-24 h-24 border-2 border-neon-cyan rounded-full"></div>
                </div>
             </div>
             
             {/* Telemetry Data */}
             <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-[10px] font-mono text-neon-cyan/80 z-20 shadow-black drop-shadow-md">
                <span>FPS: 29.97</span>
                <span>RES: 4K UHD AI-ENHANCED</span>
                <span>MODEL: YOLO-V9 TENSORRT</span>
             </div>
             <div className="absolute top-4 right-4 flex flex-col gap-1 text-[10px] font-mono text-neon-cyan/80 text-right z-20 shadow-black drop-shadow-md">
                <span>ZOOM: 1.0X</span>
                <span>LATENCY: 12ms</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JunctionSimulation;
