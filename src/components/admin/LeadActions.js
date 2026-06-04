"use client";

import { useState } from "react";
import { updateLeadStatus, deleteLead, convertLeadToResident } from "@/app/admin/actions";
import { MoreHorizontal, UserCheck, Trash2, Edit, X } from "lucide-react";

export function LeadActions({ lead, properties }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [residentData, setResidentData] = useState({
    full_name: lead.full_name,
    phone_number: lead.phone_number,
    email: lead.email,
    emergency_contact: "",
    property_id: "",
    bed_number: "",
    joining_date: lead.move_in_date || new Date().toISOString().split('T')[0],
    contract_end_date: "",
    deposit_amount: "",
    status: "Active"
  });

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      await updateLeadStatus(lead.id, newStatus);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to update status: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    setLoading(true);
    try {
      await deleteLead(lead.id);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to delete lead: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await convertLeadToResident(lead.id, {
        ...residentData,
        deposit_amount: parseFloat(residentData.deposit_amount)
      });
      setIsConvertOpen(false);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to convert lead: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ["New", "Contacted", "Visit Scheduled", "Visited", "Lost"];

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/10">
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#111111] rounded-xl shadow-lg border border-slate-200 dark:border-white/10 z-50 overflow-hidden py-1">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Update Status</div>
            {statusOptions.map(status => (
              <button key={status} onClick={() => handleStatusChange(status)} disabled={loading} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/5 ${lead.status === status ? 'font-bold text-indigo-600' : ''}`}>
                {status}
              </button>
            ))}
            
            <div className="border-t border-slate-200 dark:border-white/10 my-1" />
            
            <button onClick={() => { setIsConvertOpen(true); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-emerald-600 flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Convert to Resident
            </button>
            <button onClick={handleDelete} className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete Lead
            </button>
          </div>
        </>
      )}

      {isConvertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm text-left">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold">Convert Lead to Resident</h2>
                <p className="text-sm text-slate-500 mt-1">Move <strong>{lead.full_name}</strong> into a property.</p>
              </div>
              <button onClick={() => setIsConvertOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleConvert} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input required type="text" value={residentData.full_name} onChange={e => setResidentData({...residentData, full_name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input required type="email" value={residentData.email} onChange={e => setResidentData({...residentData, email: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input required type="text" value={residentData.phone_number} onChange={e => setResidentData({...residentData, phone_number: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Contact</label>
                  <input required type="text" value={residentData.emergency_contact} onChange={e => setResidentData({...residentData, emergency_contact: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-white/10 my-4 pt-4">
                <h3 className="font-semibold text-sm mb-3">Accommodation & Contract</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Property</label>
                    <select required value={residentData.property_id} onChange={e => setResidentData({...residentData, property_id: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select Property...</option>
                      {properties.map(p => <option key={p.id} value={p.id}>{p.property_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bed Number</label>
                    <input type="text" value={residentData.bed_number} onChange={e => setResidentData({...residentData, bed_number: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Joining Date</label>
                    <input required type="date" value={residentData.joining_date} onChange={e => setResidentData({...residentData, joining_date: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contract End</label>
                    <input required type="date" value={residentData.contract_end_date} onChange={e => setResidentData({...residentData, contract_end_date: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Deposit (₹)</label>
                    <input required type="number" min="0" value={residentData.deposit_amount} onChange={e => setResidentData({...residentData, deposit_amount: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsConvertOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                  {loading ? "Converting..." : "Convert to Resident"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
