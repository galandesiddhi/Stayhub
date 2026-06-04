import { createClient } from "@/utils/supabase/server";
import { Users, Mailbox, Building2, CreditCard, Wrench, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch KPIs
  const { count: totalLeads } = await supabase.from("leads").select("*", { count: "exact", head: true });
  const { count: newLeads } = await supabase.from("leads").select("*", { count: "exact", head: true }).eq('status', 'New');
  const { count: activeResidents } = await supabase.from("residents").select("*", { count: "exact", head: true }).eq('status', 'Active');
  
  // Fetch Properties to calculate beds
  const { data: properties } = await supabase.from("properties").select("total_beds, monthly_rent");
  const totalBeds = properties?.reduce((sum, p) => sum + (p.total_beds || 0), 0) || 0;
  const occupiedBeds = activeResidents || 0;
  const vacantBeds = Math.max(0, totalBeds - occupiedBeds);

  // Payments
  const { data: payments } = await supabase.from("payments").select("amount, payment_status");
  const monthlyRevenue = payments?.filter(p => p.payment_status === 'Paid').reduce((sum, p) => sum + p.amount, 0) || 0;
  const pendingPayments = payments?.filter(p => p.payment_status === 'Pending').length || 0;

  // Maintenance
  const { count: openMaintenance } = await supabase.from("maintenance_requests").select("*", { count: "exact", head: true }).neq('status', 'Resolved');

  const stats = [
    { name: "Total Leads", value: totalLeads || 0, icon: Mailbox, trend: "+12%", trendUp: true },
    { name: "New Leads", value: newLeads || 0, icon: Mailbox, color: "text-blue-600 dark:text-blue-400" },
    { name: "Active Residents", value: activeResidents || 0, icon: Users, color: "text-indigo-600 dark:text-indigo-400" },
    { name: "Occupied Beds", value: occupiedBeds, icon: Building2 },
    { name: "Vacant Beds", value: vacantBeds, icon: Building2, color: "text-amber-600 dark:text-amber-400" },
    { name: "Monthly Revenue", value: `₹${monthlyRevenue.toLocaleString()}`, icon: CreditCard, color: "text-emerald-600 dark:text-emerald-400", trend: "+8%", trendUp: true },
    { name: "Pending Payments", value: pendingPayments, icon: CreditCard, color: "text-rose-600 dark:text-rose-400" },
    { name: "Open Maintenance", value: openMaintenance || 0, icon: Wrench, color: "text-orange-600 dark:text-orange-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
                <p className="text-3xl font-semibold mt-2 text-slate-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-slate-50 dark:bg-white/5 ${stat.color || 'text-slate-600 dark:text-slate-300'}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            {stat.trend && (
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight className={`w-4 h-4 mr-1 ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`} />
                <span className={stat.trendUp ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-rose-600 dark:text-rose-400 font-medium'}>
                  {stat.trend}
                </span>
                <span className="text-slate-400 ml-2">vs last month</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
           <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>
           <p className="text-sm text-slate-500 dark:text-slate-400">Detailed leads table can be found in the Leads tab.</p>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
           <h3 className="text-lg font-semibold mb-4">Upcoming Due Payments</h3>
           <p className="text-sm text-slate-500 dark:text-slate-400">Detailed payments tracking can be found in the Payments tab.</p>
        </div>
      </div>
    </div>
  );
}
