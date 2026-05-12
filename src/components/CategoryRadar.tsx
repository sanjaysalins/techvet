import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface Datum {
  category: string;
  score: number;
  count: number;
}

export default function CategoryRadar({ data }: { data: Datum[] }) {
  if (data.length < 3) {
    return (
      <div className="text-sm text-slate-500 dark:text-slate-400 italic text-center py-12">
        Add technologies in at least 3 categories to display the radar chart.
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="#94a3b8" strokeOpacity={0.4} />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: 'currentColor', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 3]}
          tick={{ fill: 'currentColor', fontSize: 10 }}
          stroke="#94a3b8"
        />
        <Radar
          name="Avg tier"
          dataKey="score"
          stroke="#10B981"
          fill="#10B981"
          fillOpacity={0.35}
        />
        <Tooltip
          formatter={(v: number) => v.toFixed(2)}
          contentStyle={{
            background: 'rgba(15,23,42,0.92)',
            border: 'none',
            borderRadius: 8,
            color: 'white',
            fontSize: 12,
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
