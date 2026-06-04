import { createClient } from "@/utils/supabase/server";
import { Building2, Users, IndianRupee } from "lucide-react";
import { AddPropertyButton, PropertyActions } from "@/components/admin/PropertyModals";

export const dynamic = "force-dynamic";

export default async function AdminProperties() {
  const supabase = await createClient();
  const { data: properties } = await supabase.from("properties").select("*").order("created_at", { ascending: true });
  const { data: residents } = await supabase.from("residents").select("property_id").eq("status", "Active");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-500" />
            Properties
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your flats and monitor occupancy.</p>
        </div>
        <AddPropertyButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property) => {
          const occupiedBeds = residents?.filter(r => r.property_id === property.id).length || 0;
          const occupancyRate = Math.round((occupiedBeds / property.total_beds) * 100) || 0;
          const currentRevenue = occupiedBeds * (property.monthly_rent || 0);

          return (
            <div key={property.id} className="bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{property.property_name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{property.address}</p>
                </div>
                <PropertyActions property={property} />
              </div>

              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-3">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Occupancy
                  </p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">
                    {occupiedBeds} <span className="text-sm font-normal text-slate-500">/ {property.total_beds}</span>
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-3">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5" /> Revenue
                  </p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">
                    ₹{currentRevenue.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-slate-500 dark:text-slate-400">Occupancy Rate</span>
                  <span className={occupancyRate > 80 ? 'text-emerald-600' : 'text-amber-600'}>{occupancyRate}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${occupancyRate > 80 ? 'bg-emerald-500' : occupancyRate > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
