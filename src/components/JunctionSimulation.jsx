import React, { useEffect, useRef, useState } from 'react';

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

    const createCar = (dir) => {
      const color = carColors[Math.floor(Math.random() * carColors.length)];
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

      return { x, y, vx, vy, color, dir, width: 20, height: 10, stopped: false };
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
            const d = 35;
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
        ctx.fillRect(-car.width/2, -car.height/2, car.width, car.height);
        
        ctx.restore();

        if (car.x < -200 || car.x > canvas.width + 200 || car.y < -200 || car.y > canvas.height + 200) {
          cars.splice(i, 1);
        }
      }

      drawCentralNode(time);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={1200} 
      height={600} 
      className="w-full h-full object-cover"
    />
  );
};

export default JunctionSimulation;
