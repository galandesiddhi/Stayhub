import { createClient } from "@/utils/supabase/server";
import { Wrench, Search, Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { CreateTicketButton, TicketActions } from "@/components/admin/MaintenanceModals";

export const dynamic = "force-dynamic";

export default async function AdminMaintenance() {
  const supabase = await createClient();
  const { data: tickets } = await supabase.from("maintenance_requests").select("*, properties(property_name), residents(full_name, bed_number)").order("created_at", { ascending: false });
  const { data: properties } = await supabase.from("properties").select("id, property_name");
  const { data: residents } = await supabase.from("residents").select("id, full_name");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-indigo-500" />
            Maintenance
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage service requests and repairs.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-64"
            />
          </div>
          <CreateTicketButton properties={properties || []} residents={residents || []} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kanban Columns */}
        {['Open', 'In Progress', 'Resolved'].map((status) => {
          const columnTickets = tickets?.filter(t => t.status === status) || [];
          
          let headerColor = 'text-slate-700 dark:text-slate-300';
          let bgColor = 'bg-slate-100 dark:bg-white/5';
          let icon = <AlertCircle className="w-4 h-4 text-rose-500" />;
          
          if (status === 'In Progress') {
            icon = <Clock className="w-4 h-4 text-amber-500" />;
          } else if (status === 'Resolved') {
            icon = <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
          }

          return (
            <div key={status} className={`${bgColor} rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex flex-col max-h-[calc(100vh-12rem)]`}>
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className={`font-semibold flex items-center gap-2 ${headerColor}`}>
                  {icon} {status}
                </h3>
                <span className="bg-white dark:bg-[#111111] px-2 py-0.5 rounded-full text-xs font-medium border border-slate-200 dark:border-white/10">
                  {columnTickets.length}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {columnTickets.map(ticket => (
                  <div key={ticket.id} className="bg-white dark:bg-[#111111] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        {ticket.issue_type}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{new Date(ticket.created_at).toLocaleDateString()}</span>
                        <TicketActions ticket={ticket} />
                      </div>
                    </div>
                    <p className="text-sm text-slate-900 dark:text-white font-medium mb-3 line-clamp-2">
                      {ticket.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{ticket.properties?.property_name}</span>
                      <span>Bed {ticket.residents?.bed_number}</span>
                    </div>
                  </div>
                ))}
                {columnTickets.length === 0 && (
                  <div className="text-center py-8 text-sm text-slate-500 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                    No tickets
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
