"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", newLandlords: 12, activeListings: 30 },
  { month: "February", newLandlords: 15, activeListings: 35 },
  { month: "March", newLandlords: 10, activeListings: 40 },
  { month: "April", newLandlords: 18, activeListings: 42 },
  { month: "May", newLandlords: 22, activeListings: 50 },
  { month: "June", newLandlords: 20, activeListings: 55 },
];

const chartConfig = {
  newLandlords: {
    label: "New Landlords",
    color: "hsl(221.2 83.2% 53.3%)", // Blue color for newLandlords
  },
  activeListings: {
    label: "Active Listings",
    color: "hsl(215.4 80.6% 65.1%)", // Lighter blue for activeListings
  },
};

export default function RegisteredLandlordPage() {
  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-6 p-6">
      <h2 className="text-2xl font-bold">Registered Landlords Overview</h2>
      <Card>
        <CardHeader>
          <CardTitle>Landlord Activity</CardTitle>
          <CardDescription>
            Showing new landlord registrations and active listings for the last
            6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="newLandlords"
                type="natural"
                fill="var(--color-newLandlords)"
                fillOpacity={0.4}
                stroke="var(--color-newLandlords)"
                stackId="a"
              />
              <Area
                dataKey="activeListings"
                type="natural"
                fill="var(--color-activeListings)"
                fillOpacity={0.4}
                stroke="var(--color-activeListings)"
                stackId="b" // Different stackId for separate areas if not stacked
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                New landlords trending up{" "}
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                January - June 2025
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
