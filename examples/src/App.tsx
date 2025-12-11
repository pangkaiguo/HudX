import React, { useState } from 'react';
import BasicLine from './examples/BasicLine';
import BasicBar from './examples/BasicBar';
import BasicPie from './examples/BasicPie';
import LineWithTooltip from './examples/LineWithTooltip';
import BarWithLegend from './examples/BarWithLegend';
import PieWithLegend from './examples/PieWithLegend';
import PerformanceTest from './examples/PerformanceTest';
import ThemeSwitch from './examples/ThemeSwitch';
import CoreAPI from './examples/CoreAPI';
import Animation from './examples/Animation';
import Interaction from './examples/Interaction';
import AdvancedLineChart from './examples/AdvancedLineChart';
import AdvancedBarChart from './examples/AdvancedBarChart';
import AdvancedPieChart from './examples/AdvancedPieChart';
import InteractiveDashboard from './examples/InteractiveDashboard';
import FullFeatureDemo from './examples/FullFeatureDemo';

const examples = [
  { id: 'full-feature', name: '🚀 Full Feature Demo', component: FullFeatureDemo },
  { id: 'dashboard', name: '📊 Interactive Dashboard', component: InteractiveDashboard },
  { id: 'advanced-line', name: '✨ Advanced Line Chart', component: AdvancedLineChart },
  { id: 'advanced-bar', name: '✨ Advanced Bar Chart', component: AdvancedBarChart },
  { id: 'advanced-pie', name: '✨ Advanced Pie Chart', component: AdvancedPieChart },
  { id: 'basic-line', name: 'Basic Line Chart', component: BasicLine },
  { id: 'basic-bar', name: 'Basic Bar Chart', component: BasicBar },
  { id: 'basic-pie', name: 'Basic Pie Chart', component: BasicPie },
  { id: 'line-tooltip', name: 'Line + Tooltip', component: LineWithTooltip },
  { id: 'bar-legend', name: 'Bar + Legend', component: BarWithLegend },
  { id: 'pie-legend', name: 'Pie + Legend', component: PieWithLegend },
  { id: 'theme-switch', name: 'Theme Switch', component: ThemeSwitch },
  { id: 'core-api', name: 'Core API', component: CoreAPI },
  { id: 'animation', name: 'Animation', component: Animation },
  { id: 'interaction', name: 'Interaction', component: Interaction },
  { id: 'performance', name: 'Performance Test', component: PerformanceTest }
];

export default function App() {
  const [activeExample, setActiveExample] = useState('full-feature');

  const ActiveComponent = examples.find(e => e.id === activeExample)?.component || BasicLine;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav style={{
        width: 280,
        borderRight: '1px solid #e0e0e0',
        padding: 20,
        overflowY: 'auto',
        backgroundColor: '#f5f5f5'
      }}>
        <h1 style={{ fontSize: 20, marginBottom: 10, color: '#333' }}>HudX Examples</h1>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>Interactive Charts & Animations</p>
        {examples.map(example => (
          <button
            key={example.id}
            onClick={() => setActiveExample(example.id)}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px 12px',
              marginBottom: 6,
              border: 'none',
              borderRadius: 6,
              backgroundColor: activeExample === example.id ? '#5470c6' : '#fff',
              color: activeExample === example.id ? '#fff' : '#333',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: 13,
              fontWeight: activeExample === example.id ? 600 : 400,
              transition: 'all 0.2s'
            }}
          >
            {example.name}
          </button>
        ))}
      </nav>
      <main style={{ flex: 1, padding: 40, overflowY: 'auto', backgroundColor: '#fff' }}>
        <ActiveComponent />
      </main>
    </div>
  );
}
