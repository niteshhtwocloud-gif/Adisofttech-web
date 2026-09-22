import {
  LayoutDashboard,
  ListChecks,
  Users,
  Clock,
  CalendarDays,
  Headphones,
  FileBarChart,
  Settings,
  Search,
} from "lucide-react";

const SIDEBAR = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ListChecks, label: "Tasks" },
  { icon: Users, label: "Employees" },
  { icon: Clock, label: "Attendance" },
  { icon: CalendarDays, label: "Leave" },
  { icon: Headphones, label: "Support" },
  { icon: FileBarChart, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const STATS = [
  { label: "Tasks", value: "12", color: "text-blue-600" },
  { label: "Employees", value: "8", color: "text-emerald-500" },
  { label: "Leave Requests", value: "4", color: "text-amber-500" },
  { label: "Support Tickets", value: "3", color: "text-red-500" },
];

const TASK_SUMMARY = [
  { label: "Completed", value: 28, color: "bg-emerald-500" },
  { label: "In Progress", value: 12, color: "bg-blue-500" },
  { label: "Pending", value: 8, color: "bg-amber-400" },
  { label: "Overdue", value: 4, color: "bg-red-500" },
];

const ATTENDANCE = [
  { name: "Rajesh Kumar", time: "Checked in 09:00 AM" },
  { name: "Priya Sharma", time: "Checked in 09:15 AM" },
  { name: "Amit Verma", time: "Checked in 08:30 AM" },
];

const total = TASK_SUMMARY.reduce((sum, s) => sum + s.value, 0);

function buildGradientStops(): string {
  const colorMap: Record<string, string> = {
    "bg-emerald-500": "#10b981",
    "bg-blue-500": "#3b82f6",
    "bg-amber-400": "#fbbf24",
    "bg-red-500": "#ef4444",
  };

  const stops: string[] = [];
  let cumulative = 0;
  for (const s of TASK_SUMMARY) {
    const start = (cumulative / total) * 360;
    cumulative += s.value;
    const end = (cumulative / total) * 360;
    stops.push(`${colorMap[s.color]} ${start}deg ${end}deg`);
  }
  return stops.join(", ");
}

export default function BusinessOSDashboard() {
  const gradientStops = buildGradientStops();

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
        <span className="text-sm font-bold tracking-tight text-slate-800">
          ADISOFT<span className="text-blue-600">TECH</span>
        </span>
        <div className="flex items-center gap-3 text-slate-400">
          <Search className="h-4 w-4" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-blue-100" />
            <span className="hidden text-xs font-medium text-slate-600 sm:inline">Admin</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-40 shrink-0 space-y-1 border-r border-slate-100 p-4 sm:block">
          {SIDEBAR.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${
                item.active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-5 p-5">
          <h3 className="text-base font-bold text-slate-800">Dashboard</h3>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-3 text-center"
              >
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="mt-0.5 text-[10px] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Task summary donut */}
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="mb-3 text-xs font-semibold text-slate-700">Task Summary</p>
              <div className="flex items-center gap-4">
                <div
                  className="h-20 w-20 shrink-0 rounded-full"
                  style={{
                    background: `conic-gradient(${gradientStops})`,
                    WebkitMask: "radial-gradient(farthest-side, transparent 58%, black 59%)",
                    mask: "radial-gradient(farthest-side, transparent 58%, black 59%)",
                  }}
                />
                <div className="space-y-1.5">
                  {TASK_SUMMARY.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-[10px] text-slate-600">
                      <span className={`h-2 w-2 rounded-full ${item.color}`} />
                      {item.label}
                      <span className="ml-auto font-semibold text-slate-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Attendance */}
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="mb-3 text-xs font-semibold text-slate-700">Today&apos;s Attendance</p>
              <div className="space-y-3">
                {ATTENDANCE.map((person) => (
                  <div key={person.name} className="flex items-center gap-2.5">
                    <div className="h-6 w-6 shrink-0 rounded-full bg-blue-100" />
                    <div>
                      <p className="text-[11px] font-medium text-slate-700">{person.name}</p>
                      <p className="text-[9px] text-slate-400">{person.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
