import React from 'react';
import { AlertTriangle, Ship, Layers, Target, Eye, Radio } from 'lucide-react';

const Sidebar = ({ alerts, onAlertClick, layers, toggleLayer }) => {
  return (
    <aside className="w-80 h-full bg-[#161b22] border-r border-[#30363d] flex flex-col z-20 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-[#30363d] bg-[#0d1117]">
        <h1 className="text-xl font-bold tracking-wider text-white flex items-center gap-3">
          <Ship className="text-[#58a6ff]" size={24} />
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">VIGIE</span>
          <span className="text-gray-400">TAMATAVE</span>
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono">System Online • Monitoring</p>
        </div>
      </div>

      {/* Intelligence Feed */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 sticky top-0 bg-[#161b22]/95 backdrop-blur z-10 border-b border-[#30363d]/50 flex justify-between items-center">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Radio size={14} className="text-[#da3633] animate-pulse" />
            Live Feed
          </h2>
          <span className="text-[10px] bg-[#da3633]/10 text-[#da3633] px-1.5 py-0.5 rounded border border-[#da3633]/20">
            {alerts.length} Active
          </span>
        </div>

        <div className="divide-y divide-[#30363d]/50">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onAlertClick(alert)}
              className="p-4 hover:bg-[#0d1117] cursor-pointer transition-all group border-l-2 border-transparent hover:border-[#da3633]"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#da3633] font-mono text-xs font-bold flex items-center gap-2 bg-[#da3633]/10 px-2 py-0.5 rounded">
                  <AlertTriangle size={10} />
                  ALERT #{alert.id}
                </span>
                <span className="text-gray-600 text-[10px] font-mono">T-minus 2m</span>
              </div>

              <h3 className="text-gray-200 font-bold text-sm mb-1 group-hover:text-white flex items-center gap-2">
                <Target size={14} className="text-gray-500 group-hover:text-[#da3633]" />
                Dark Vessel Detected
              </h3>

              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="bg-[#0d1117] p-1.5 rounded border border-[#30363d] text-gray-400">
                  <span className="block text-[9px] uppercase text-gray-600 mb-0.5">Confidence</span>
                  <span className="text-green-400 font-mono font-bold">{alert.confidence}% AI MATCH</span>
                </div>
                <div className="bg-[#0d1117] p-1.5 rounded border border-[#30363d] text-gray-400">
                  <span className="block text-[9px] uppercase text-gray-600 mb-0.5">Speed</span>
                  <span className="text-white font-mono">{alert.speed} kn</span>
                </div>
              </div>
            </div>
          ))}

          {/* Dummy past logs */}
           <div className="p-4 opacity-40 hover:opacity-60 transition-opacity">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-500 font-mono text-xs">LOG #8471</span>
                <span className="text-gray-600 text-[10px]">2h ago</span>
              </div>
              <h3 className="text-gray-400 font-medium text-sm">Routine Patrol - Zone B</h3>
              <p className="text-gray-500 text-xs mt-1">Status: Normal • No anomalies</p>
            </div>
        </div>
      </div>

      {/* Data Layers */}
      <div className="p-5 border-t border-[#30363d] bg-[#0d1117]">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Layers size={14} className="text-[#58a6ff]" />
          Active Layers
        </h2>
        <div className="space-y-3">
          {Object.entries(layers).map(([key, active]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group select-none">
              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${active ? 'bg-[#58a6ff] border-[#58a6ff]' : 'bg-transparent border-gray-600 group-hover:border-gray-500'}`}>
                {active && <Eye size={10} className="text-[#0d1117]" />}
              </div>
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggleLayer(key)}
                className="hidden"
              />
              <span className={`text-sm ${active ? 'text-white' : 'text-gray-500'} group-hover:text-gray-300 transition-colors capitalize`}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
