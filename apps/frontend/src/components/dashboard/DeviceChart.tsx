"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type DeviceData = {
  devices: { device: string; count: number }[]
}


const chartConfig = {
  count: {
    label: "Count",
    color: "#2563eb",
  },
} satisfies ChartConfig

export function DeviceChart({ data }: { data: DeviceData }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data.devices}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="device"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="count" 
          radius={4}
          barSize={25}
          fill="#2563eb"
        />
      </BarChart>
    </ChartContainer>
  )
}