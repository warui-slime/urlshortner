'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';

type ClicksData = {
  timeSeries: { date: string; clicks: number }[];
};

const chartConfig = {
  clicks: {
    label: "Total Clicks",
    color: "#2563eb",
  },
} satisfies ChartConfig

export function ClicksChart({ data }: { data: ClicksData }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
    <BarChart accessibilityLayer data={data.timeSeries}>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="date"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      <ChartLegend content={<ChartLegendContent />} />
      <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} barSize={25} />
    </BarChart>
  </ChartContainer>
  );
}


