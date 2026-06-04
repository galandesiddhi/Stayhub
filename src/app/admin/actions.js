"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// --- PROPERTIES ---
export async function createProperty(data) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").insert([data]);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/properties");
  revalidatePath("/admin");
}

export async function updateProperty(id, data) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/properties");
  revalidatePath("/admin");
}

export async function deleteProperty(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/properties");
  revalidatePath("/admin");
}

// --- RESIDENTS ---
export async function createResident(data) {
  const supabase = await createClient();
  const { error } = await supabase.from("residents").insert([data]);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/residents");
  revalidatePath("/admin");
  revalidatePath("/admin/properties"); // Since occupancy might change
}

export async function updateResident(id, data) {
  const supabase = await createClient();
  const { error } = await supabase.from("residents").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/residents");
  revalidatePath("/admin");
  revalidatePath("/admin/properties");
}

export async function vacateResident(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("residents").update({ status: 'Vacated' }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/residents");
  revalidatePath("/admin");
  revalidatePath("/admin/properties");
}

export async function deleteResident(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("residents").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/residents");
  revalidatePath("/admin");
  revalidatePath("/admin/properties");
}

// --- LEADS ---
export async function updateLeadStatus(id, status) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function convertLeadToResident(leadId, residentData) {
  const supabase = await createClient();
  
  // 1. Update lead status
  const { error: leadError } = await supabase.from("leads").update({ status: 'Converted' }).eq("id", leadId);
  if (leadError) throw new Error(leadError.message);

  // 2. Insert resident
  const { error: resError } = await supabase.from("residents").insert([residentData]);
  if (resError) throw new Error(resError.message);

  revalidatePath("/admin/leads");
  revalidatePath("/admin/residents");
  revalidatePath("/admin");
  revalidatePath("/admin/properties");
}

// --- PAYMENTS ---
export async function createPayment(data) {
  const supabase = await createClient();
  const { error } = await supabase.from("payments").insert([data]);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/payments");
  revalidatePath("/admin");
}

export async function updatePaymentStatus(id, status) {
  const supabase = await createClient();
  const { error } = await supabase.from("payments").update({ payment_status: status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/payments");
  revalidatePath("/admin");
}

export async function deletePayment(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("payments").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/payments");
  revalidatePath("/admin");
}

// --- MAINTENANCE ---
export async function createMaintenanceTicket(data) {
  const supabase = await createClient();
  const { error } = await supabase.from("maintenance_requests").insert([data]);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/maintenance");
  revalidatePath("/admin");
}

export async function updateMaintenanceStatus(id, status) {
  const supabase = await createClient();
  const { error } = await supabase.from("maintenance_requests").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/maintenance");
  revalidatePath("/admin");
}

export async function deleteMaintenanceTicket(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("maintenance_requests").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/maintenance");
  revalidatePath("/admin");
}
