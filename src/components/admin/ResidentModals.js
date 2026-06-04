"use client";

import { useState } from "react";
import { createResident, updateResident, vacateResident, deleteResident } from "@/app/admin/actions";
import { UserPlus, X, Edit, UserMinus, MoreHorizontal, Trash2 } from "lucide-react";

export function AddResidentButton({ properties }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    emergency_contact: "",
    property_id: "",
    bed_number: "",
    joining_date: new Date().toISOString().split('T')[0],
    contract_end_date: "",
    deposit_amount: "",
    status: "Active"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createResident({
        ...formData,
        deposit_amount: parseFloat(formData.deposit_amount)
      });
      setIsOpen(false);
      setFormData({
        full_name: "", phone_number: "", email: "", emergency_contact: "",
        property_id: "", bed_number: "", joining_date: new Date().toISOString().split('T')[0],
        contract_end_date: "", deposit_amount: "", status: "Active"
      });
    } catch (error) {
      alert("Failed to add resident: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
        <UserPlus className="w-4 h-4" />
        Add Resident
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Add Resident</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input required type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input required type="text" value={formData.phone_number} onChange={e => setFormData({...formData, phone_number: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Contact</label>
                  <input required type="text" value={formData.emergency_contact} onChange={e => setFormData({...formData, emergency_contact: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-white/10 my-4 pt-4">
                <h3 className="font-semibold text-sm mb-3">Accommodation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Property</label>
                    <select required value={formData.property_id} onChange={e => setFormData({...formData, property_id: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select Property...</option>
                      {properties.map(p => <option key={p.id} value={p.id}>{p.property_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bed Number</label>
                    <input type="text" value={formData.bed_number} onChange={e => setFormData({...formData, bed_number: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. 101-A" />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-white/10 my-4 pt-4">
                <h3 className="font-semibold text-sm mb-3">Contract & Finance</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Joining Date</label>
                    <input required type="date" value={formData.joining_date} onChange={e => setFormData({...formData, joining_date: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contract End</label>
                    <input required type="date" value={formData.contract_end_date} onChange={e => setFormData({...formData, contract_end_date: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Deposit (₹)</label>
                    <input required type="number" min="0" value={formData.deposit_amount} onChange={e => setFormData({...formData, deposit_amount: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                  {loading ? "Saving..." : "Add Resident"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function ResidentActions({ resident, properties }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isVacateOpen, setIsVacateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: resident.full_name,
    phone_number: resident.phone_number,
    email: resident.email,
    emergency_contact: resident.emergency_contact,
    property_id: resident.property_id || "",
    bed_number: resident.bed_number || "",
    contract_end_date: resident.contract_end_date,
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateResident(resident.id, formData);
      setIsEditOpen(false);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to update resident: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVacate = async () => {
    setLoading(true);
    try {
      await vacateResident(resident.id);
      setIsVacateOpen(false);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to vacate resident: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resident? This will also delete all their payments and maintenance tickets.")) return;
    setLoading(true);
    try {
      await deleteResident(resident.id);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to delete resident: " + error.message);
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
            <button onClick={() => { setIsEditOpen(true); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2">
              <Edit className="w-4 h-4 text-slate-400" /> Edit Details
            </button>
            {resident.status === 'Active' && (
              <button onClick={() => { setIsVacateOpen(true); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 flex items-center gap-2">
                <UserMinus className="w-4 h-4" /> Mark as Vacated
              </button>
            )}
            
            <div className="border-t border-slate-200 dark:border-white/10 my-1" />
            
            <button onClick={handleDelete} disabled={loading} className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete Resident
            </button>
          </div>
        </>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Edit Resident</h2>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input required type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input required type="text" value={formData.phone_number} onChange={e => setFormData({...formData, phone_number: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Contact</label>
                  <input required type="text" value={formData.emergency_contact} onChange={e => setFormData({...formData, emergency_contact: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-white/10 my-4 pt-4">
                <h3 className="font-semibold text-sm mb-3">Accommodation & Contract</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Property</label>
                    <select value={formData.property_id} onChange={e => setFormData({...formData, property_id: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">None</option>
                      {properties.map(p => <option key={p.id} value={p.id}>{p.property_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bed Number</label>
                    <input type="text" value={formData.bed_number} onChange={e => setFormData({...formData, bed_number: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contract End</label>
                    <input required type="date" value={formData.contract_end_date} onChange={e => setFormData({...formData, contract_end_date: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isVacateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold mb-2">Vacate Resident</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Are you sure you want to mark <strong>{resident.full_name}</strong> as vacated? Their bed will be freed up.</p>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsVacateOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg">Cancel</button>
              <button onClick={handleVacate} disabled={loading} className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 disabled:opacity-50">
                {loading ? "Processing..." : "Vacate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
