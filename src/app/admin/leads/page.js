import { createClient } from "@/utils/supabase/server";
import { Mailbox, Search, MoreHorizontal, CheckCircle2, XCircle } from "lucide-react";
import { LeadActions } from "@/components/admin/LeadActions";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {
  const supabase = await createClient();
  const { data: leads } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  const { data: properties } = await supabase.from("properties").select("id, property_name");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Mailbox className="w-6 h-6 text-indigo-500" />
            Leads
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and track inquiries from the website.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Room Pref</th>
                <th className="px-6 py-4">Move-in Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {leads?.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No leads found.</td>
                </tr>
              )}
              {leads?.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">{lead.full_name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{new Date(lead.created_at).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{lead.email}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lead.phone_number}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 dark:bg-white/10 text-xs font-medium">
                      {lead.message ? "Specified in notes" : "Not specified"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {lead.move_in_date ? new Date(lead.move_in_date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                      ${lead.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' : 
                        lead.status === 'Converted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                        lead.status === 'Lost' ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' :
                        'bg-slate-50 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-300 dark:border-white/20'
                      }
                    `}>
                      {lead.status === 'Converted' ? <CheckCircle2 className="w-3 h-3" /> : lead.status === 'Lost' ? <XCircle className="w-3 h-3" /> : null}
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <LeadActions lead={lead} properties={properties || []} />
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
