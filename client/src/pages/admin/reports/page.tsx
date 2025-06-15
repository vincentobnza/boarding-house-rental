import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const reportData = [
  { type: "Listings", total: 7000, new: 900, active: 100 },
  { type: "Landlords", total: 8000, new: 700, verified: 40 },
  { type: "Tenants", total: 35000, new: 7500, activeSearches: 150 },
  {
    type: "Bookings",
    total: 80000,
    completed: 600,
    pending: 10005,
    cancelled: 50000,
  },
  { type: "Revenue", total: 15000, subscriptions: 10000, commissions: 5000 },
];

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(221.2 83.2% 53.3%)", // Blue
  },
  new: {
    label: "New",
    color: "hsl(215.4 80.6% 65.1%)", // Lighter Blue
  },
  active: {
    label: "Active",
    color: "hsl(217.2 91.2% 59.8%)", // Another shade of Blue
  },
  verified: {
    label: "Verified",
    color: "hsl(218 85% 62%)", // Yet another shade of Blue
  },
  activeSearches: {
    label: "Active Searches",
    color: "hsl(225 90% 68%)", // Blue variant
  },
  completed: {
    label: "Completed",
    color: "hsl(222 88% 55%)", // Blue variant
  },
  pending: {
    label: "Pending",
    color: "hsl(214 72% 72%)", // Lighter Blue variant
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(208 55% 85%)", // Very light Blue
  },
  subscriptions: {
    label: "Subscriptions",
    color: "hsl(224 92% 50%)", // Darker Blue
  },
  commissions: {
    label: "Commissions",
    color: "hsl(235 82% 52%)", // Darker Blue variant
  },
};

export default function ReportsPage() {
  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-6 p-6">
      <h2 className="text-2xl font-bold">Reports Overview</h2>
      <p className="text-gray-600">
        This page will contain various reports related to the platform's
        performance, user activity, and other relevant metrics.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Platform Metrics Summary</CardTitle>
          <CardDescription>
            A quick overview of key platform data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart accessibilityLayer data={reportData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="type"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label || value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="total" fill="var(--color-total)" radius={4} />
              <Bar dataKey="new" fill="var(--color-new)" radius={4} />
              {/* Add more bars as needed, e.g., for 'active', 'verified' etc. ensuring they are in chartConfig */}
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="text-muted-foreground leading-none">
            Showing summary data for various platform aspects.
          </div>
        </CardFooter>
      </Card>

      {/* You can add more charts or report sections here */}
    </div>
  );
}
