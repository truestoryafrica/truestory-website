import { randomUUID } from "node:crypto";
import { getDb, isDatabaseConfigured } from "@/lib/db";

export async function getLocalMessages() {
  if (!isDatabaseConfigured()) return [];
  try {
    const sql = getDb();
    const rows = await sql`select * from messages order by received_at desc`;
    return rows.map(mapMessageRow);
  } catch (error) {
    console.error("getLocalMessages failed:", error.message);
    return [];
  }
}

export async function addLocalMessage(input) {
  const sql = getDb();
  const message = {
    id: `msg-${randomUUID()}`,
    name: input.name,
    email: input.email,
    organization: input.organization || "",
    projectType: input.projectType || "Project inquiry",
    budget: input.budget || "",
    subject: input.subject || `${input.projectType || "Project"} inquiry from ${input.name}`,
    message: input.message,
    receivedAt: new Date().toISOString(),
    status: "unread",
    urgent: input.message?.length > 180 || /urgent|soon|asap|deadline/i.test(input.message || "")
  };

  await sql`
    insert into messages (id, name, email, organization, project_type, budget, subject, message, received_at, status, urgent)
    values (${message.id}, ${message.name}, ${message.email}, ${message.organization}, ${message.projectType}, ${message.budget}, ${message.subject}, ${message.message}, ${message.receivedAt}, ${message.status}, ${message.urgent})
  `;

  return message;
}

export async function markMessageHandled(id) {
  const sql = getDb();
  await sql`delete from messages where id = ${id}`;
}

function mapMessageRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    organization: row.organization,
    projectType: row.project_type,
    budget: row.budget,
    subject: row.subject,
    message: row.message,
    receivedAt: row.received_at instanceof Date ? row.received_at.toISOString() : row.received_at,
    status: row.status,
    urgent: row.urgent
  };
}
