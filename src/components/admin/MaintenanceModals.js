"use client";

import { useState } from "react";
import { createMaintenanceTicket, updateMaintenanceStatus, deleteMaintenanceTicket } from "@/app/admin/actions";
import { Plus, X, Edit, Trash2, MoreHorizontal, CheckCircle2, AlertCircle } from "lucide-react";

export function CreateTicketButton({ properties, residents }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    property_id: "",
    reported_by: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createMaintenanceTicket({
        ...formData,
        property_id: formData.property_id || null,
        reported_by: formData.reported_by || null,
      });
      setIsOpen(false);
      setFormData({ title: "", description: "", priority: "Medium", status: "Open", property_id: "", reported_by: "" });
    } catch (error) {
      alert("Failed to create ticket: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
        <Plus className="w-4 h-4" />
        New Ticket
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Create Maintenance Ticket</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Issue Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Broken AC in room 102" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select required value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Property (Optional)</label>
                  <select value={formData.property_id} onChange={e => setFormData({...formData, property_id: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select Property...</option>
                    {properties.map(p => <option key={p.id} value={p.id}>{p.property_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Reported By (Optional)</label>
                  <select value={formData.reported_by} onChange={e => setFormData({...formData, reported_by: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select Resident...</option>
                    {residents.map(r => <option key={r.id} value={r.id}>{r.full_name}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                  {loading ? "Creating..." : "Create Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function TicketActions({ ticket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (status) => {
    setLoading(true);
    try {
      await updateMaintenanceStatus(ticket.id, status);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to update status: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    setLoading(true);
    try {
      await deleteMaintenanceTicket(ticket.id);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to delete ticket: " + error.message);
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
            {ticket.status !== 'Resolved' && (
              <button onClick={() => handleStatusChange('Resolved')} disabled={loading} className="w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-emerald-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Resolve Ticket
              </button>
            )}
            {ticket.status !== 'In Progress' && (
              <button onClick={() => handleStatusChange('In Progress')} disabled={loading} className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-indigo-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Set In Progress
              </button>
            )}
            
            <div className="border-t border-slate-200 dark:border-white/10 my-1" />
            
            <button onClick={handleDelete} disabled={loading} className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete Ticket
            </button>
          </div>
        </>
      )}
    </div>
  );
}
