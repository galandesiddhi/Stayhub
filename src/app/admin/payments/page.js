import { createClient } from "@/utils/supabase/server";
import { CreditCard, IndianRupee, Search, Filter } from "lucide-react";
import { AddPaymentButton, PaymentActions } from "@/components/admin/PaymentModals";

export const dynamic = "force-dynamic";

export default async function AdminPayments() {
  const supabase = await createClient();
  const { data: payments } = await supabase.from("payments").select("*, residents(full_name, properties(property_name))").order("created_at", { ascending: false });
  const { data: residents } = await supabase.from("residents").select("id, full_name");

  // Calculate some stats
  const totalCollected = payments?.filter(p => p.payment_status === 'Paid').reduce((sum, p) => sum + p.amount, 0) || 0;
  const totalPending = payments?.filter(p => p.payment_status === 'Pending' || p.payment_status === 'Overdue').reduce((sum, p) => sum + p.amount, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-indigo-500" />
            Payments
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track deposits, rent, and installments.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <AddPaymentButton residents={residents || []} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-[#111111] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Collected</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{totalCollected.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending & Overdue</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{totalPending.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search payments..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-4">Resident</th>
                <th className="px-6 py-4">Payment Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {(!payments || payments.length === 0) && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No payments found.</td>
                </tr>
              )}
              {payments?.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">{payment.residents?.full_name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{payment.residents?.properties?.property_name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{payment.payment_type}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    ₹{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(payment.due_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                      ${payment.payment_status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                        payment.payment_status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' :
                        'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
                      }
                    `}>
                      {payment.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <PaymentActions payment={payment} />
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
