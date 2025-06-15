import {
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  CircleDollarSign,
} from "lucide-react"; // Use lucide-react icons
import {
  BarChart,
  PieChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const barChartConfig = {
  desktop: {
    label: "New Landlords",
    color: "hsl(221.2 83.2% 53.3%)", // Changed to a primary blue color
    icon: Users,
  },
  mobile: {
    label: "Reports Filed",
    color: "oklch(88.2% 0.059 254.128)", // Changed to a lighter blue color
    icon: AlertTriangle,
  },
} satisfies ChartConfig;

const pieChartData = [
  { name: "Approved", value: 400, fill: "var(--color-approved)" },
  { name: "Pending", value: 300, fill: "var(--color-pending)" },
  { name: "Rejected", value: 200, fill: "var(--color-rejected)" },
];

const pieChartConfig = {
  approved: {
    label: "Approved",
    color: "hsl(142.1 70.6% 45.3%)", // Emerald green
    icon: TrendingUp,
  },
  pending: {
    label: "Pending",
    color: "oklch(90.5% 0.093 164.15)", // Lighter emerald green
    icon: Clock,
  },
  rejected: {
    label: "Rejected",
    color: "hsl(142.1 70.6% 30.3%)", // Darker emerald green
    icon: AlertTriangle,
  },
} satisfies ChartConfig;

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back, Admin!
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Landlords"
          value="1,250"
          icon={<Users className="size-5 text-blue-500" />}
          description="Registered landlords"
        />
        <DashboardCard
          title="Pending Listings"
          value="75"
          icon={<Clock className="size-5 text-yellow-500" />}
          description="Listings awaiting approval"
        />
        <DashboardCard
          title="Active Subscriptions"
          value="850"
          icon={<CircleDollarSign className="size-5 text-green-500" />}
          description="Currently active plans"
        />
        <DashboardCard
          title="Open Reports"
          value="12"
          icon={<AlertTriangle className="size-5 text-red-500" />}
          description="Unresolved user reports"
        />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Monthly Activity
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              New landlords and reports filed in the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={barChartConfig}
              className="h-[300px] w-full"
            >
              <BarChart accessibilityLayer data={barChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <RechartsTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <RechartsLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="desktop"
                  stackId="a"
                  fill="var(--color-desktop)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="mobile"
                  stackId="a"
                  fill="var(--color-mobile)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Listing Status
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              Breakdown of property listing statuses.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={pieChartConfig}
              className="mx-auto aspect-square h-[250px]"
            >
              <PieChart>
                <RechartsTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsLegend
                  content={<ChartLegendContent nameKey="name" />}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}) {
  return (
    <Card className="border border-zinc-200 duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {value}
        </div>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
