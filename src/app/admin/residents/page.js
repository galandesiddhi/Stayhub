import { createClient } from "@/utils/supabase/server";
import { Users, Search } from "lucide-react";
import { AddResidentButton, ResidentActions } from "@/components/admin/ResidentModals";

export const dynamic = "force-dynamic";

export default async function AdminResidents() {
  const supabase = await createClient();
  const { data: residents } = await supabase.from("residents").select("*, properties(property_name)").order("created_at", { ascending: false });
  const { data: properties } = await supabase.from("properties").select("id, property_name");
  const { data: payments } = await supabase.from("payments").select("resident_id, payment_status, amount");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" />
            Residents
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage current and past residents.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search residents..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-64"
            />
          </div>
          <AddResidentButton properties={properties || []} />
        </div>
      </div>

      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
        <div className="w-full">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-4">Resident</th>
                <th className="px-6 py-4">Property & Bed</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Contract End</th>
                <th className="px-6 py-4">Finance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {(!residents || residents.length === 0) && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No residents found.</td>
                </tr>
              )}
              {residents?.map((resident) => (
                <tr key={resident.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">{resident.full_name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Joined: {new Date(resident.joining_date).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-700 dark:text-slate-300">{resident.properties?.property_name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Bed: {resident.bed_number}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{resident.phone_number}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{resident.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(resident.contract_end_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {(() => {
                      const resPayments = payments?.filter(p => p.resident_id === resident.id) || [];
                      const overdue = resPayments.filter(p => p.payment_status === 'Overdue');
                      const pending = resPayments.filter(p => p.payment_status === 'Pending');
                      
                      if (overdue.length > 0) {
                        const amount = overdue.reduce((sum, p) => sum + p.amount, 0);
                        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20">Overdue (₹{amount})</span>;
                      } else if (pending.length > 0) {
                        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">Pending</span>;
                      } else {
                        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">Up to Date</span>;
                      }
                    })()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                      ${resident.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                        'bg-slate-50 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-300 dark:border-white/20'
                      }
                    `}>
                      {resident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ResidentActions resident={resident} properties={properties || []} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
