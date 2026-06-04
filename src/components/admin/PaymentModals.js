"use client";

import { useState } from "react";
import { createPayment, updatePaymentStatus, deletePayment } from "@/app/admin/actions";
import { Plus, X, Edit, Trash2, MoreHorizontal, CheckCircle2 } from "lucide-react";

export function AddPaymentButton({ residents }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    resident_id: "",
    amount: "",
    payment_type: "Rent",
    payment_status: "Paid",
    due_date: new Date().toISOString().split('T')[0],
    paid_date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPayment({
        ...formData,
        amount: parseFloat(formData.amount),
        paid_date: formData.payment_status === 'Paid' ? formData.paid_date : null
      });
      setIsOpen(false);
      setFormData({
        resident_id: "", amount: "", payment_type: "Rent", payment_status: "Paid",
        due_date: new Date().toISOString().split('T')[0], paid_date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      alert("Failed to record payment: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
        <Plus className="w-4 h-4" />
        Record Payment
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Record Payment</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Resident</label>
                <select required value={formData.resident_id} onChange={e => setFormData({...formData, resident_id: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select Resident...</option>
                  {residents.map(r => <option key={r.id} value={r.id}>{r.full_name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                  <input required type="number" min="0" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select required value={formData.payment_type} onChange={e => setFormData({...formData, payment_type: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="Rent">Rent</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select required value={formData.payment_status} onChange={e => setFormData({...formData, payment_status: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <input required type="date" value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                  {loading ? "Saving..." : "Record Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function PaymentActions({ payment }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (status) => {
    setLoading(true);
    try {
      await updatePaymentStatus(payment.id, status);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to update status: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this payment record?")) return;
    setLoading(true);
    try {
      await deletePayment(payment.id);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to delete payment: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/10">
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#111111] rounded-xl shadow-lg border border-slate-200 dark:border-white/10 z-50 overflow-hidden py-1">
            {payment.payment_status !== 'Paid' && (
              <button onClick={() => handleStatusChange('Paid')} disabled={loading} className="w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-emerald-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Mark as Paid
              </button>
            )}
            {payment.payment_status !== 'Pending' && (
              <button onClick={() => handleStatusChange('Pending')} disabled={loading} className="w-full text-left px-4 py-2.5 text-sm hover:bg-amber-50 dark:hover:bg-amber-500/10 text-amber-600 flex items-center gap-2">
                <Edit className="w-4 h-4" /> Mark as Pending
              </button>
            )}
            
            <div className="border-t border-slate-200 dark:border-white/10 my-1" />
            
            <button onClick={handleDelete} disabled={loading} className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete Record
            </button>
          </div>
        </>
      )}
    </div>
  );
}
