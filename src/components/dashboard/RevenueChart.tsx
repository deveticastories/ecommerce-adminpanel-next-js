"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RevenuePoint } from "@/types";
import { Colors } from "@/utils/Colors";
import { inr, inrCompact } from "@/utils/Format";

/** 30-day revenue area chart with a plum gradient fill. */
export default function RevenueChart({ data, className }: { data: RevenuePoint[]; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Revenue &amp; Orders Velocity</CardTitle>
        <CardDescription>Past 30 days, cancelled orders excluded</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={Colors.chart.revenue} stopOpacity={0.32} />
                <stop offset="100%" stopColor={Colors.chart.revenue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={Colors.chart.grid} />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} stroke={Colors.chart.axis} />
            <YAxis tick={{ fontSize: 11 }} stroke={Colors.chart.axis} tickFormatter={inrCompact} />
            <Tooltip formatter={(v) => inr(Number(v))} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke={Colors.chart.revenue}
              strokeWidth={2}
              fill="url(#revenueFill)"
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
