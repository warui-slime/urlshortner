'use client';

import { ClicksChart } from "./ClicksChart";
import { DeviceChart } from "./DeviceChart";




type AnalyticsData = {
  devices: { device: string; count: number }[],
  timeSeries: { date: string; clicks: number }[];

};



export function AnalyticsCharts({ data }: { data: AnalyticsData }) {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <ClicksChart data={data}/>
      <DeviceChart data={data}/>
    </div>
  );
}


