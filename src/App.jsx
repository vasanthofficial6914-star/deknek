import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, AlertTriangle, Car, Cloud, 
  Droplets, Eye, Gauge, Map, Menu, Navigation, 
  Shield, Smartphone, Thermometer, User, Zap,
  BarChart3, Settings, Info, Bell, Siren, Wind,
  Heart, ShieldAlert, Bus, School, Bike, ParkingCircle,
  Play, LayoutDashboard, Database, TrendingUp, AlertCircle,
  ChevronRight, ArrowRight, X, Video
} from 'lucide-react';

import JunctionSimulation from './components/JunctionSimulation';

// --- Small UI Components ---

const Pill = ({ type, text }) => (
  <div className={`pill pill-${type.toLowerCase()}`}>
    {text}
  </div>
);

const LiveIndicator = () => (
  <div className="live-indicator">
    <div className="live-dot"></div>
    <span className="text-xs font-black uppercase tracking-[0.2em]">Live</span>
  </div>
);

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center bg-bg-dark/80 backdrop-blur-md border-b border-glass-border">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center relative overflow-hidden">
        <Activity size={20} className="neon-text-blue" />
        <div className="absolute inset-0 bg-neon-blue/5 animate-pulse"></div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-tighter text-white uppercase">Nexus</span>
        <span className="text-[10px] font-bold tracking-[0.3em] text-secondary uppercase">Traffic AI</span>
      </div>
    </div>

    <div className="hidden lg:flex items-center gap-8 uppercase text-[10px] font-extrabold tracking-widest text-secondary">
      <a href="#" className="hover:text-white transition-colors">Home</a>
      <a href="#" className="hover:text-white transition-colors">Dashboard</a>
      <a href="#" className="hover:text-white transition-colors">Digital Twin</a>
      <a href="#" className="hover:text-white transition-colors">Prediction</a>
      <a href="#" className="hover:text-white transition-colors">Emergency</a>
      <a href="#" className="hover:text-white transition-colors">Features</a>
      <a href="#" className="hover:text-white transition-colors text-white">Analytics</a>
    </div>

    <LiveIndicator />
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 px-8 overflow-hidden">
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-8">
           <div className="px-3 py-1 bg-neon-blue/10 border border-neon-blue/20 rounded-full flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-neon-cyan">Smart City Command • V4.2</span>
           </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
          <span className="neon-text-blue italic">AI-Based</span> <br />
          Smart Traffic <br />
          Junction <br />
          <span className="neon-text-purple">Optimization System</span>
        </h1>

        <p className="text-secondary text-lg max-w-lg mb-10 leading-relaxed font-medium">
          A real-time, self-learning traffic command center that orchestrates signals, 
          predicts congestion, and clears emergency corridors using deep reinforcement 
          learning across the entire city grid.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="btn-primary flex items-center gap-2 group">
            <Play size={16} fill="currentColor" />
            Start Monitoring
          </button>
          <button className="px-6 py-2.5 rounded-lg border border-glass-border bg-white/5 font-extrabold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <LayoutDashboard size={16} />
            View Dashboard
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-neon-blue/5 blur-3xl rounded-full"></div>
        <div className="relative glass-card overflow-hidden border-neon-blue/20">
           <div className="p-3 border-b border-glass-border flex justify-between items-center bg-black/20">
             <span className="text-[10px] font-black tracking-widest text-secondary uppercase">Junction-A1 • Live</span>
             <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
               <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
               <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
             </div>
           </div>
           <JunctionSimulation />
        </div>
      </motion.div>
    </div>
  </section>
);

const StatsBar = () => {
  const stats = [
    { label: "Uptime", value: "98.7%", color: "green" },
    { label: "Vehicles/Day", value: "1.2M", color: "blue" },
    { label: "Wait Time", value: "-34%", color: "purple" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-8 mb-20">
      {stats.map((s, i) => (
        <div key={i} className="glass-card p-6 flex flex-col items-center justify-center relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className={`text-4xl font-black mb-1 neon-text-${s.color}`}>{s.value}</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">{s.label}</span>
        </div>
      ))}
    </div>
  );
};

const TrafficCard = ({ direction, vehicles, density, wait, status }) => {
  const statusConfig = {
    HEAVY: { color: '#ef4444', label: 'HEAVY' },
    MODERATE: { color: '#eab308', label: 'MODERATE' },
    SMOOTH: { color: '#22c55e', label: 'SMOOTH' }
  };
  const config = statusConfig[status] || statusConfig.SMOOTH;

  return (
    <div className="glass-card p-6 relative transition-all duration-300" 
         style={{ border: `1px solid ${config.color}55`, boxShadow: `0 0 20px ${config.color}15` }}>
      <div className="absolute top-0 left-0 w-full h-[2px]" 
           style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}></div>
      
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">{direction}</span>
        <div className="px-3 py-1 rounded-full border" 
             style={{ borderColor: `${config.color}44`, backgroundColor: `${config.color}11` }}>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: config.color }}>{config.label}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center border" 
             style={{ backgroundColor: `${config.color}08`, borderColor: `${config.color}22` }}>
          <Car size={24} style={{ color: config.color }} strokeWidth={2.5} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black tracking-tighter text-white">{vehicles}</span>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">vehicles</span>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-secondary mb-2">
            <span>Density</span>
            <span style={{ color: config.color }}>{density}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${density}%` }}
              className="h-full"
              style={{ backgroundColor: config.color, boxShadow: `0 0 10px ${config.color}` }}
            ></motion.div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-glass-border">
          <div className="flex items-center gap-2">
             <div className="w-5 h-5 rounded-full flex items-center justify-center border border-secondary/20">
                <Activity size={10} className="text-secondary" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Wait</span>
          </div>
          <span className="text-lg font-black text-white">{wait}s</span>
        </div>
      </div>
    </div>
  );
};

const PredictionEngine = () => (
  <section className="px-8 py-20 relative">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-glass-border"></div>
          <span className="text-[10px] font-black tracking-[0.4em] text-neon-cyan uppercase">Module 02</span>
          <div className="h-px w-12 bg-glass-border"></div>
        </div>
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 text-center">Traffic Prediction Engine</h2>
        <p className="text-secondary font-medium text-center">Transformer-based forecasting model anticipates congestion 30 minutes ahead.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2 block">Congestion Forecast</span>
              <span className="text-2xl font-black neon-text-blue">Next 24 minutes</span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan"></div>
                <span className="text-[10px] font-black uppercase text-secondary">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neon-purple"></div>
                <span className="text-[10px] font-black uppercase text-secondary">Predicted</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full relative">
            <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map(val => (
                <line key={val} x1="50" y1={300 - val * 2.5} x2="1000" y2={300 - val * 2.5} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              
              {/* Predicted Area (Purple) */}
              <path 
                d="M50 200 Q 150 180, 250 220 T 450 150 T 650 100 T 850 120 L 1000 120 L 1000 300 L 50 300 Z" 
                fill="url(#purpleGradient)" 
                opacity="0.3"
              />
              <path 
                d="M50 200 Q 150 180, 250 220 T 450 150 T 650 100 T 850 120 L 1000 120" 
                fill="none" 
                stroke="var(--neon-purple)" 
                strokeWidth="2" 
                strokeDasharray="5,5"
              />

              {/* Current Area (Cyan) */}
              <path 
                d="M50 250 Q 150 230, 250 180 T 450 220 T 650 260 T 850 230 L 1000 220 L 1000 300 L 50 300 Z" 
                fill="url(#cyanGradient)" 
                opacity="0.4"
              />
              <path 
                d="M50 250 Q 150 230, 250 180 T 450 220 T 650 260 T 850 230 L 1000 220" 
                fill="none" 
                stroke="var(--neon-cyan)" 
                strokeWidth="3"
              />

              <defs>
                <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--neon-cyan)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--neon-purple)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] font-black text-secondary py-1">
              <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
            </div>
            <div className="absolute bottom-[-20px] left-0 w-full flex justify-between text-[10px] font-black text-secondary px-12">
              {Array.from({length: 13}).map((_, i) => <span key={i}>{i*2}m</span>)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 border-neon-red/30 relative overflow-hidden bg-neon-red/5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="neon-text-red" size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest neon-text-red">AI Alert</span>
            </div>
            <h3 className="text-xl font-black mb-2">Heavy traffic expected in 10 minutes</h3>
            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Origin: M.G. Road → Junction A1 • Confidence 92%</p>
            <div className="absolute top-0 right-0 w-16 h-16 bg-neon-red/10 blur-2xl"></div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Navigation className="text-secondary" size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Alternate Routes</span>
            </div>
            <div className="space-y-4">
              {[
                { name: "Route Beta – via Sector 9", time: "-6 min", color: "neon-green" },
                { name: "Route Gamma – Ring Rd", time: "-4 min", color: "neon-green" },
                { name: "Route Delta – Old Bypass", time: "-2 min", color: "neon-yellow" }
              ].map((route, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded bg-white/5 border border-glass-border">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary">{route.name}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest text-${route.color}`}>{route.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-secondary" size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Model Accuracy</span>
            </div>
            <span className="text-xl font-black neon-text-blue">94.8%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const EmergencyCorridor = () => (
  <section className="px-8 py-20 bg-black/40 relative">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-glass-border"></div>
          <span className="text-[10px] font-black tracking-[0.4em] text-neon-cyan uppercase">Module 04</span>
          <div className="h-px w-12 bg-glass-border"></div>
        </div>
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 text-center">Emergency Green Corridor</h2>
        <p className="text-secondary font-medium text-center">The instant an ambulance is detected, every signal on its path turns green.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Emergency Route • Live</span>
          </div>
          
          <div className="relative h-40 flex items-center justify-between px-12">
            <div className="absolute left-12 right-12 h-0.5 bg-glass-border border-dashed border-t-2"></div>
            {[1, 2, 3, 4].map(id => (
              <div key={id} className="relative flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-green shadow-[0_0_10px_var(--neon-green)] mb-2"></div>
                <span className="text-[8px] font-black text-secondary">SID-{id}</span>
              </div>
            ))}
            
            <motion.div 
              animate={{ left: ["-20%", "120%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute z-10"
            >
              <div className="flex flex-col items-center">
                <div className="p-2 rounded bg-neon-red/20 border border-neon-red/50">
                  <Siren className="text-neon-red" size={20} />
                </div>
                <span className="text-[8px] font-black text-neon-red mt-1 whitespace-nowrap">EMERGENCY UNIT-07</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded bg-white/5 border border-glass-border flex flex-col items-center">
              <span className="text-3xl font-black neon-text-green">7</span>
              <span className="text-[8px] font-black uppercase text-secondary">Signals Cleared</span>
            </div>
            <div className="p-4 rounded bg-white/5 border border-glass-border flex flex-col items-center">
              <span className="text-3xl font-black neon-text-blue">2:18</span>
              <span className="text-[8px] font-black uppercase text-secondary">Travel Time</span>
            </div>
            <div className="p-4 rounded bg-white/5 border border-glass-border flex flex-col items-center">
              <span className="text-3xl font-black neon-text-purple">4:42</span>
              <span className="text-[8px] font-black uppercase text-secondary">Est. Arrival</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 border-neon-red/30 relative overflow-hidden bg-neon-red/5">
             <div className="flex items-center gap-2 mb-6">
                <Siren className="neon-text-red" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest neon-text-red">Emergency Active</span>
             </div>
             <h3 className="text-2xl font-black mb-2">Green corridor engaged</h3>
             <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6">Route: West Gate → Central Plaza → City Hospital</p>
             <div className="flex justify-between text-[8px] font-black text-secondary uppercase tracking-widest">
                <span>Received 12s ago</span>
                <span>Priority P1</span>
             </div>
          </div>

          <div className="glass-card p-6">
             <div className="flex items-center gap-2 mb-6">
                <ShieldAlert className="text-secondary" size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Recent Incidents</span>
             </div>
             <div className="space-y-4">
                {[
                  { msg: "Ambulance corridor – cleared in 3m12s", time: "08:41", color: "neon-green" },
                  { msg: "Fire engine – Sector 5", time: "07:22", color: "neon-red" },
                  { msg: "Police escort – VIP convoy", time: "06:05", color: "secondary" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}`}></div>
                    <span className="text-[10px] font-bold text-white/40">{item.time}</span>
                    <span className="text-[10px] font-bold text-secondary">{item.msg}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);


const Dashboard = () => {
  const [timer, setTimer] = useState(15);
  const [direction, setDirection] = useState("East");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => (t <= 1 ? 45 : t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-8 py-20 relative overflow-hidden">
      <div className="scanline"></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-glass-border"></div>
            <span className="text-[10px] font-black tracking-[0.4em] text-neon-cyan uppercase">Module 01</span>
            <div className="h-px w-12 bg-glass-border"></div>
          </div>
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-4 text-center">Live Traffic Dashboard</h2>
          <p className="text-secondary font-medium tracking-wide text-center">Real-time telemetry from every road sensor at the junction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <TrafficCard direction="North Road" vehicles={188} density={25} wait={63} status="SMOOTH" />
          <TrafficCard direction="South Road" vehicles={144} density={74} wait={54} status="HEAVY" />
          <TrafficCard direction="East Road" vehicles={168} density={88} wait={63} status="HEAVY" />
          <TrafficCard direction="West Road" vehicles={30} density={59} wait={55} status="MODERATE" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Signal Timer */}
          <div className="glass-card p-8 flex flex-col relative min-h-[460px]">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-12">AI Signal Timer</span>
            
            <div className="flex flex-col items-center flex-1 justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-4">Active Direction</span>
              <span className="text-5xl font-black neon-text-green uppercase mb-12 tracking-tight">{direction}</span>

              <div className="circular-timer relative mb-12">
                <svg className="timer-svg w-56 h-56" viewBox="0 0 100 100">
                  <circle className="timer-circle-bg" cx="50" cy="50" r="45" strokeWidth="5" />
                  <circle 
                    className="timer-circle-progress" 
                    cx="50" cy="50" r="45" 
                    strokeWidth="5"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * timer / 45)}
                    style={{ stroke: 'var(--neon-green)', filter: 'drop-shadow(0 0 10px var(--neon-green))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl font-black tracking-tighter neon-text-green">{timer}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">RL agent optimizing every 1.0s</span>
            </div>
          </div>

          {/* Emergency Alert (Active) */}
          <div className="glass-card p-8 flex flex-col relative min-h-[460px] border-neon-red/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-12">Emergency Alert</div>
             <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-neon-red animate-ping"></div>
             
             <div className="flex flex-col flex-1 justify-center">
               <div className="flex items-center gap-6 mb-10">
                 <div className="w-20 h-20 rounded-2xl bg-neon-red/10 border border-neon-red/30 flex items-center justify-center flex-shrink-0">
                    <Siren size={40} className="text-neon-red" strokeWidth={2.5} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-neon-red uppercase tracking-tight mb-2">Ambulance Inbound</h3>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-relaxed">ETA 42s • Corridor activated on West → Central</p>
                 </div>
               </div>

               <div className="space-y-4 pt-6 border-t border-glass-border">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-secondary">
                     <span>Signals overridden</span>
                     <span className="text-neon-red font-bold">7</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-secondary">
                     <span>Time saved</span>
                     <span className="text-neon-green font-bold">2m 18s</span>
                  </div>
               </div>
             </div>
          </div>

          {/* Pollution & Mood */}
          <div className="glass-card p-8 min-h-[460px] relative">
             <div className="flex justify-between items-center mb-16">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Pollution (AQI)</span>
               <Wind size={18} className="text-secondary opacity-50" />
             </div>

             <div className="flex items-baseline gap-2 mb-8">
                <span className="text-7xl font-black tracking-tighter neon-text-green">46</span>
                <span className="text-sm font-black text-secondary tracking-widest uppercase">µg/m³</span>
             </div>

             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-24 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "46%" }}
                  className="h-full bg-neon-green shadow-[0_0_20px_var(--neon-green)]"
                ></motion.div>
             </div>

             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-8 block">Traffic Mood</span>
             <div className="flex items-center justify-center gap-6 bg-neon-red/10 border border-neon-red/40 py-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-neon-red/5 animate-pulse"></div>
                <AlertTriangle size={28} className="neon-text-red relative z-10" />
                <span className="text-2xl font-black uppercase tracking-[0.2em] neon-text-red relative z-10">Frustrated</span>
                <AlertTriangle size={28} className="neon-text-red relative z-10" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Capabilities = () => {
  const [activeModal, setActiveModal] = useState(null);

  const items = [
    { icon: <Activity size={24} />, title: "Self-Learning Traffic AI", desc: "Reinforcement learning agent that improves with every junction cycle.", color: "purple" },
    { icon: <TrendingUp size={24} />, title: "AI Congestion Prediction", desc: "30-min ahead forecasting with 94%+ accuracy.", color: "blue" },
    { icon: <Wind size={24} />, title: "Smart Pollution Monitoring", desc: "Real-time AQI mapping linked to signal timing.", color: "green" },
    { icon: <Cloud size={24} />, title: "Rain Mode Traffic Control", desc: "Automatic timing adjustment in adverse weather.", color: "cyan" },
    { icon: <AlertCircle size={24} />, title: "Accident Detection", desc: "CV-based crash detection with auto-dispatch.", color: "red" },
    { icon: <Eye size={24} />, title: "Illegal Parking Detection", desc: "ANPR-powered violation alerts in seconds.", color: "secondary" },
    { icon: <Bus size={24} />, title: "School & Bus Priority", desc: "Dedicated green windows for school buses.", color: "green" },
    { icon: <User size={24} />, title: "Smart Pedestrian Safety", desc: "Adaptive crosswalks that wait for the slowest walker.", color: "blue", status: "ONLINE" },
    { icon: <Shield size={24} />, title: "Helmet & Seatbelt Detection", desc: "AI vision flags violations and issues e-challans.", color: "purple" }
  ];

  const getModalContent = (item) => {
    switch(item.title) {
      case "Self-Learning Traffic AI":
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-neon-purple">Past Traffic History</h4>
            <div className="h-40 bg-white/5 border border-glass-border flex items-end justify-between p-4 rounded-xl">
               {[40, 70, 50, 90, 60, 30, 80].map((h, i) => (
                 <motion.div initial={{height: 0}} animate={{height: `${h}%`}} key={i} className="w-8 bg-neon-purple/80 rounded-t" />
               ))}
            </div>
            <p className="text-sm text-secondary font-medium">Historical analysis of Sector-7 shows a 34% reduction in congestion over the last 30 days due to RL-based continuous signal optimization.</p>
          </div>
        );
      case "AI Congestion Prediction":
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-neon-blue">Current vs Predicted</h4>
            <div className="flex gap-4">
               <div className="flex-1 p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-xl">
                 <span className="text-[10px] font-black uppercase text-secondary block mb-2">Current Load</span>
                 <span className="text-3xl font-black text-neon-blue">62%</span>
               </div>
               <div className="flex-1 p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-xl">
                 <span className="text-[10px] font-black uppercase text-secondary block mb-2">Predicted (+30m)</span>
                 <span className="text-3xl font-black text-neon-purple">89%</span>
               </div>
            </div>
            <p className="text-sm text-secondary font-medium">Heavy traffic expected on West Road. AI suggests proactively rerouting 15% of approaching vehicles to prevent gridlock.</p>
          </div>
        );
      case "Smart Pollution Monitoring":
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-neon-green">AQI Density Mapping</h4>
            <div className="h-40 bg-[url('/traffic_cam.png')] bg-cover bg-center rounded-xl relative overflow-hidden flex items-center justify-center filter sepia opacity-80 border border-neon-green/30">
               <div className="absolute inset-0 bg-neon-green/20 mix-blend-color"></div>
               <span className="bg-black/90 px-4 py-2 rounded text-neon-green font-black border border-neon-green/50 z-10 shadow-[0_0_15px_rgba(34,197,94,0.4)]">AQI: 142 (UNHEALTHY)</span>
            </div>
            <p className="text-sm text-secondary font-medium">Traffic-prone layers detected. Actively extending green lights on main arteries to disperse idle vehicles and reduce localized emissions.</p>
          </div>
        );
      case "Rain Mode Traffic Control":
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-neon-cyan">Adverse Weather Protocol</h4>
            <div className="flex justify-between items-center p-6 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl">
              <div>
                <span className="block text-[10px] font-black text-secondary uppercase mb-1">Status</span>
                <span className="text-xl font-black text-neon-cyan">HEAVY RAIN DETECTED</span>
              </div>
              <Cloud size={40} className="text-neon-cyan animate-pulse" />
            </div>
            <ul className="text-sm text-secondary font-medium space-y-3 bg-white/5 p-4 rounded-xl border border-glass-border">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></div> Increased following distance parameters</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></div> +15% duration applied to yellow lights</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></div> Lowered speed limit thresholds to 40km/h</li>
            </ul>
          </div>
        );
      case "Accident Detection":
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-neon-red">Incident Response</h4>
            <div className="aspect-video bg-[url('https://images.unsplash.com/photo-1542128962-9d50ad7bf014?auto=format&fit=crop&q=80')] bg-cover bg-center border-2 border-neon-red/50 rounded-xl relative overflow-hidden filter grayscale contrast-125">
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-neon-red rounded-full animate-ping"></div>
               <span className="absolute top-2 left-2 bg-neon-red text-white text-[10px] font-black px-2 py-1 rounded">CRASH DETECTED</span>
            </div>
            <p className="text-sm text-secondary font-medium">Traffic immediately diverted away from Sector 4 collision zone. EMS dispatched automatically. Expected clearance in 45m.</p>
          </div>
        );
      case "Illegal Parking Detection":
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-secondary">Violation Enforcement</h4>
            <div className="flex gap-4 items-center p-4 bg-white/5 border border-glass-border rounded-xl">
               <div className="w-20 h-10 bg-[#eab308] border-2 border-black flex items-center justify-center font-mono text-sm text-black font-black rounded">MH12-XX</div>
               <div className="flex-1">
                  <span className="text-[10px] text-neon-yellow font-black uppercase block mb-1">Ticket Issued Automatically</span>
                  <span className="text-xs text-secondary">Blocking active lane, causing 12% flow reduction. Tow truck alerted.</span>
               </div>
            </div>
          </div>
        );
      case "School & Bus Priority":
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-neon-green">Transit Priority Active</h4>
            <div className="p-6 border border-neon-green/30 bg-neon-green/5 rounded-xl flex items-center justify-between">
               <div>
                 <span className="block text-[10px] uppercase font-black text-secondary mb-1">School Bus Route 4A</span>
                 <span className="text-2xl font-black text-neon-green">Green Wave Engaged</span>
               </div>
               <Bus size={40} className="text-neon-green drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            </div>
          </div>
        );
      case "Smart Pedestrian Safety":
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-neon-blue">Adaptive Crosswalks</h4>
            <div className="p-6 border border-neon-blue/30 bg-neon-blue/5 rounded-xl">
               <div className="h-3 w-full bg-black rounded-full overflow-hidden mb-4 relative">
                  <motion.div animate={{width: ["0%", "100%"]}} transition={{duration: 5, repeat: Infinity}} className="absolute left-0 top-0 h-full bg-neon-blue" />
               </div>
               <p className="text-sm text-secondary font-bold">Extending pedestrian walk phase by +4.0s for an elderly citizen detected crossing at Junction A1.</p>
            </div>
          </div>
        );
      case "Helmet & Seatbelt Detection":
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-neon-purple">Vision AI Enforcement</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-xl text-center border border-glass-border">
                <span className="block text-4xl font-black text-neon-purple mb-2">142</span>
                <span className="text-[10px] uppercase tracking-widest text-secondary font-black">No Helmet<br/>Detected Today</span>
              </div>
              <div className="p-6 bg-white/5 rounded-xl text-center border border-glass-border">
                <span className="block text-4xl font-black text-neon-purple mb-2">89</span>
                <span className="text-[10px] uppercase tracking-widest text-secondary font-black">No Seatbelt<br/>Detected Today</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="px-8 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-glass-border"></div>
            <span className="text-[10px] font-black tracking-[0.4em] text-neon-cyan uppercase">Module 05</span>
            <div className="h-px w-12 bg-glass-border"></div>
          </div>
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 text-center">Smart City Capabilities</h2>
          <p className="text-secondary font-medium text-center">A unified intelligence layer covering every aspect of urban mobility.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setActiveModal(item)}
              className={`glass-card p-8 group hover:border-neon-${item.color}/50 transition-all cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]`}
            >
              <div className={`w-12 h-12 rounded-xl bg-neon-${item.color}/10 border border-neon-${item.color}/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <div className={`neon-text-${item.color}`}>{item.icon}</div>
              </div>
              <h3 className="text-lg font-black mb-3 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-secondary text-sm font-medium leading-relaxed mb-4">{item.desc}</p>
              {item.status && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></div>
                  <span className="text-[8px] font-black tracking-widest text-neon-cyan uppercase">{item.status}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-bg-dark border border-glass-border rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <div className={`h-1 w-full bg-neon-${activeModal.color}`}></div>
              <div className="p-6 border-b border-glass-border flex justify-between items-center bg-white/5">
                 <div className="flex items-center gap-3">
                   <div className={`text-neon-${activeModal.color}`}>{activeModal.icon}</div>
                   <h3 className="text-lg font-black text-white">{activeModal.title}</h3>
                 </div>
                 <button onClick={() => setActiveModal(null)} className="text-secondary hover:text-white transition-colors">
                   <X size={20} />
                 </button>
              </div>
              <div className="p-8">
                {getModalContent(activeModal)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const CityWideAnalytics = () => (
  <section className="px-8 py-20 bg-black/40 relative">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-glass-border"></div>
          <span className="text-[10px] font-black tracking-[0.4em] text-neon-cyan uppercase">Module 06</span>
          <div className="h-px w-12 bg-glass-border"></div>
        </div>
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 text-center">City-Wide Analytics</h2>
        <p className="text-secondary font-medium text-center">Aggregated impact metrics streamed from 248 intersections.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Vehicles Monitored", value: "1.24M", icon: <Car size={20} />, color: "blue" },
          { label: "Fuel Saved Today", value: "38,420 L", icon: <Droplets size={20} />, color: "green" },
          { label: "Average Wait Time", value: "-34%", icon: <Activity size={20} />, color: "purple" },
          { label: "Pollution Reduction", icon: <Wind size={20} />, value: "-27%", color: "cyan" }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className={`text-neon-${stat.color}`}>{stat.icon}</div>
              <span className="text-[8px] font-black tracking-widest text-neon-cyan uppercase">Live</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-3xl font-black mb-1 neon-text-${stat.color}`}>{stat.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2 block">Daily Vehicles</span>
          <span className="text-2xl font-black neon-text-blue mb-8 block">Last 7 days</span>
          
          <div className="h-64 flex items-end justify-between gap-4 px-4 relative">
             {/* Grid Lines */}
             <div className="absolute inset-0 flex flex-col justify-between py-1 opacity-10 pointer-events-none">
                {[...Array(5)].map((_, i) => <div key={i} className="h-px w-full bg-white"></div>)}
             </div>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const heights = [60, 85, 70, 90, 110, 80, 50];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 relative z-10">
                  <div 
                    className="w-full bg-gradient-to-t from-neon-blue/40 to-neon-cyan rounded-t transition-all hover:scale-x-105"
                    style={{ height: `${heights[i]}%` }}
                  ></div>
                  <span className="text-[8px] font-black text-secondary">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2 block">Avg Wait Time (s)</span>
          <span className="text-2xl font-black neon-text-green mb-8 block">Today</span>
          
          <div className="h-64 w-full relative px-8">
             {/* Grid */}
             <div className="absolute inset-0 grid grid-cols-6 opacity-5 pointer-events-none">
                {[...Array(7)].map((_, i) => <div key={i} className="border-r border-white h-full"></div>)}
             </div>
             <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                {[...Array(5)].map((_, i) => <div key={i} className="border-b border-white w-full"></div>)}
             </div>

            <svg className="w-full h-full relative z-10" viewBox="0 0 1000 300" preserveAspectRatio="none">
              <path 
                d="M0 250 Q 100 240, 200 220 T 400 280 T 600 150 T 800 200 T 1000 120" 
                fill="none" 
                stroke="var(--neon-green)" 
                strokeWidth="4"
                className="drop-shadow-[0_0_8px_var(--neon-green)]"
              />
              {[0, 200, 400, 600, 800, 1000].map((x, i) => {
                const y = [250, 220, 280, 150, 200, 120][i];
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="8" fill="var(--bg-dark)" stroke="var(--neon-green)" strokeWidth="3" />
                    <circle cx={x} cy={y} r="4" fill="var(--neon-green)" />
                  </g>
                );
              })}
            </svg>
            
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px] font-black text-secondary">
              <span>60</span><span>45</span><span>30</span><span>15</span><span>0</span>
            </div>
            
            <div className="absolute bottom-[-20px] left-8 right-8 flex justify-between text-[8px] font-black text-secondary">
              {["00", "04", "08", "12", "16", "20", "23"].map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
const DigitalTwinHeatmap = () => (
  <section className="px-8 py-20 max-w-7xl mx-auto">
     <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card overflow-hidden">
           <div className="p-4 border-b border-glass-border flex justify-between items-center bg-black/20">
             <div className="flex items-center gap-3">
               <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Digital Twin • Sector-7</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_var(--neon-green)]"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neon-green">Synced</span>
             </div>
           </div>
           <div className="aspect-video bg-black/40 relative flex items-center justify-center overflow-hidden p-12">
              <div className="absolute inset-0 grid-bg opacity-20"></div>
              <JunctionSimulation />
           </div>
        </div>

        <div className="glass-card p-8">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-8">Congestion Heatmap</h3>
           
           <div className="heatmap-grid mb-12">
              {Array.from({ length: 64 }).map((_, i) => {
                let type = "low";
                if (i > 20 && i < 40) type = "med";
                if (i === 35) type = "high";
                return <div key={i} className={`heatmap-cell ${type}`}></div>;
              })}
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                 <span className="text-secondary">Active signals</span>
                 <span className="text-neon-green">12</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                 <span className="text-secondary">AI overrides / min</span>
                 <span className="text-neon-purple">48</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                 <span className="text-secondary">Avg throughput</span>
                 <span className="text-neon-cyan">412 v/h</span>
              </div>
           </div>
        </div>
     </div>
  </section>
);

const Footer = () => (
  <footer className="px-8 pt-20 pb-12 border-t border-glass-border bg-bg-dark relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"></div>
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
      <div className="md:col-span-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center">
            <Activity size={20} className="neon-text-blue" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tighter text-white uppercase">Nexus Traffic AI</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-secondary uppercase">Smart City • Command</span>
          </div>
        </div>
        <p className="text-secondary text-sm font-medium leading-relaxed mb-8 max-w-sm">
          An AI Traffic Management System orchestrating signals across the city — saving fuel, time, and lives, one intersection at a time.
        </p>
        <div className="flex gap-4">
          {['github', 'twitter', 'linkedin'].map(social => (
            <div key={social} className="w-10 h-10 rounded-lg bg-white/5 border border-glass-border flex items-center justify-center hover:bg-neon-blue/10 hover:border-neon-blue/30 transition-all cursor-pointer">
              {social === 'github' && <Database size={18} className="text-secondary" />}
              {social === 'twitter' && <Zap size={18} className="text-secondary" />}
              {social === 'linkedin' && <Activity size={18} className="text-secondary" />}
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-3">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Modules</h4>
        <ul className="space-y-4">
          {['Live Dashboard', 'Digital Twin', 'Prediction', 'Emergency Corridor', 'Analytics'].map(link => (
            <li key={link}>
              <a href="#" className={`text-xs font-bold uppercase tracking-widest transition-colors ${link === 'Prediction' ? 'neon-text-blue' : 'text-secondary hover:text-white'}`}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Contact</h4>
        <ul className="space-y-6">
          <li className="flex items-center gap-4 group cursor-pointer">
            <div className="w-8 h-8 rounded bg-white/5 border border-glass-border flex items-center justify-center group-hover:border-neon-blue/30">
               <Bell size={14} className="text-neon-cyan" />
            </div>
            <span className="text-xs font-bold text-secondary group-hover:text-white transition-colors">traffic.control@gov.city.in</span>
          </li>
          <li className="flex items-center gap-4 group cursor-pointer">
            <div className="w-8 h-8 rounded bg-white/5 border border-glass-border flex items-center justify-center group-hover:border-neon-green/30">
               <Smartphone size={14} className="text-neon-green" />
            </div>
            <span className="text-xs font-bold text-secondary group-hover:text-white transition-colors">1800-GOV-TRAFFIC</span>
          </li>
          <li className="flex items-center gap-4 group cursor-pointer">
            <div className="w-8 h-8 rounded bg-white/5 border border-glass-border flex items-center justify-center group-hover:border-neon-purple/30">
               <Map size={14} className="text-neon-purple" />
            </div>
            <span className="text-xs font-bold text-secondary group-hover:text-white transition-colors">Ministry of Urban Transport, Gov HQ</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto pt-8 border-t border-glass-border flex flex-col md:flex-row justify-center items-center">
      <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">© 2026 Nexus Traffic AI • All systems nominal</span>
    </div>
  </footer>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-bg-dark relative overflow-hidden">
        <div className="grid-bg opacity-50"></div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-2xl border border-neon-blue/30 flex items-center justify-center mb-8 bg-neon-blue/5">
            <Activity className="text-neon-cyan animate-pulse" size={48} />
          </div>
          <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-neon-cyan"
            ></motion.div>
          </div>
          <span className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-neon-cyan animate-pulse">Initializing Neural Core...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white font-['Outfit'] selection:bg-neon-blue/30">
      <div className="grid-bg"></div>
      <Navbar />
      <Hero />
      <StatsBar />
      <Dashboard />
      <PredictionEngine />
      <DigitalTwinHeatmap />
      <EmergencyCorridor />
      <Capabilities />
      <CityWideAnalytics />
      <Footer />
    </div>
  );
}

export default App;
