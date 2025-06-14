import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Users, Clock, AlertTriangle, UserPlus } from "lucide-react"; // Use lucide-react icons

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Landlords",
        data: [12, 19, 10, 15, 22, 30],
        backgroundColor: "#4f46e5",
      },
      {
        label: "Reports Filed",
        data: [5, 9, 3, 6, 8, 4],
        backgroundColor: "#f97316",
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const pieData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Listing Status",
        data: [65, 25, 10],
        backgroundColor: ["#22c55e", "#f97316", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-sm text-zinc-500">Overview for the past 6 months</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Landlords"
          value="1200"
          icon={<Users className="text-indigo-600 w-6 h-6" />}
        />
        <DashboardCard
          title="Pending Listings"
          value="85"
          icon={<Clock className="text-orange-500 w-6 h-6" />}
        />
        <DashboardCard
          title="Total Reports"
          value="45"
          icon={<AlertTriangle className="text-red-500 w-6 h-6" />}
        />
        <DashboardCard
          title="New Signups"
          value="230"
          icon={<UserPlus className="text-green-500 w-6 h-6" />}
        />
      </div>

      {/* Charts side by side */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pie Chart */}
        <div className="flex-1 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Listing Status Breakdown
          </h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
        {/* Bar Chart */}
        <div className="flex-1 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Activity Summary</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-sm flex items-center gap-4">
      <div>{icon}</div>
      <div>
        <h4 className="text-sm text-zinc-500">{title}</h4>
        <p className="text-xl font-semibold text-zinc-800">{value}</p>
      </div>
    </div>
  );
}
