import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, Legend,
} from 'recharts'

export default function MetricRadar({ metric, compare = null }) {
  const data = [
    { axis: 'Speed', value: Number(metric?.speed_kmh) || 0, max: 40 },
    { axis: 'Stamina', value: Number(metric?.stamina_score) || 0, max: 100 },
    { axis: 'Dribbling', value: Number(metric?.dribbling_score) || 0, max: 100 },
    { axis: 'Passing', value: Number(metric?.passing_accuracy) || 0, max: 100 },
    { axis: 'Shooting', value: Number(metric?.shooting_accuracy) || 0, max: 100 },
    { axis: 'Heading', value: Number(metric?.heading_score) || 0, max: 100 },
    { axis: 'Positioning', value: Number(metric?.positioning_score) || 0, max: 100 },
    { axis: 'Teamwork', value: Number(metric?.teamwork_score) || 0, max: 100 },
  ].map((d) => ({ axis: d.axis, value: Math.min(100, (d.value / d.max) * 100) }))

  return (
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="#0E1B3A" strokeOpacity={0.25} />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: '#0B1220' }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar name="Player" dataKey="value" stroke="#C8102E" fill="#C8102E" fillOpacity={0.35} />
        <Tooltip />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}

