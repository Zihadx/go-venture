export interface AuditLogEntry {
  id: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  category: "booking" | "user" | "package" | "billing" | "review" | "system";
  at: string;
}

const delay = (ms = 250) => new Promise((res) => setTimeout(res, ms));

const RAW_LOG: Omit<AuditLogEntry, "id">[] = [
  { actor: "Ayesha Rahman", actorRole: "Admin", action: "Confirmed booking", target: "BKG-5041", category: "booking", at: daysAgo(0.1) },
  { actor: "Nur Zihad", actorRole: "Super Admin", action: "Suspended user", target: "USR-1032", category: "user", at: daysAgo(0.4) },
  { actor: "Kamal Hossain", actorRole: "Travel Agent", action: "Marked trip ongoing", target: "BKG-5038", category: "booking", at: daysAgo(0.6) },
  { actor: "Ayesha Rahman", actorRole: "Admin", action: "Created coupon", target: "SUMMER25", category: "billing", at: daysAgo(1) },
  { actor: "Farhana Akter", actorRole: "Customer Support", action: "Resolved ticket", target: "TCK-1002", category: "system", at: daysAgo(1.2) },
  { actor: "Nur Zihad", actorRole: "Super Admin", action: "Published package", target: "TRIP-104", category: "package", at: daysAgo(1.5) },
  { actor: "Ayesha Rahman", actorRole: "Admin", action: "Approved review", target: "REV-3012", category: "review", at: daysAgo(2) },
  { actor: "Ayesha Rahman", actorRole: "Admin", action: "Changed role", target: "USR-1008 → Travel Agent", category: "user", at: daysAgo(2.3) },
  { actor: "Kamal Hossain", actorRole: "Travel Agent", action: "Cancelled booking", target: "BKG-5019", category: "booking", at: daysAgo(3) },
  { actor: "Nur Zihad", actorRole: "Super Admin", action: "Archived package", target: "TRIP-108", category: "package", at: daysAgo(3.5) },
  { actor: "Ayesha Rahman", actorRole: "Admin", action: "Approved refund", target: "BKG-5011", category: "billing", at: daysAgo(4) },
  { actor: "Farhana Akter", actorRole: "Customer Support", action: "Hid review", target: "REV-3007", category: "review", at: daysAgo(5) },
];

function daysAgo(n: number): string {
  const d = new Date();
  d.setHours(d.getHours() - n * 24);
  return d.toISOString();
}

const auditLog: AuditLogEntry[] = RAW_LOG.map((entry, i) => ({ id: `LOG-${9000 + i}`, ...entry }));

export async function getAuditLog({ category = "all" }: { category?: string } = {}): Promise<AuditLogEntry[]> {
  await delay();
  const rows = category === "all" ? auditLog : auditLog.filter((l) => l.category === category);
  return [...rows].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}
