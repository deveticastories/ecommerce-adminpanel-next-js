"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AudiencePoint } from "@/types";
import { Colors } from "@/utils/Colors";
import { inr, inrCompact } from "@/utils/Format";

/** Revenue split across Ladies / Girls / Boys / Kids Neutral in champagne bars. */
export default function AudienceChart({ data }: { data: AudiencePoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Audience</CardTitle>
        <CardDescription>30-day revenue mix</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={Colors.chart.grid} />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke={Colors.chart.axis} />
            <YAxis tick={{ fontSize: 11 }} stroke={Colors.chart.axis} tickFormatter={inrCompact} />
            <Tooltip formatter={(v) => inr(Number(v))} cursor={{ fill: Colors.light.muted, opacity: 0.6 }} />
            <Bar dataKey="revenue" name="Revenue" fill={Colors.chart.audience} radius={[6, 6, 0, 0]} animationDuration={900} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
