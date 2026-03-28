type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  consent?: boolean;
};

const allowedMethods = ['POST'];

export default async function handler(request: Request): Promise<Response> {
  if (!allowedMethods.includes(request.method)) {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  if (!payload?.name || !payload?.email || !payload?.message) {
    return new Response(JSON.stringify({ error: 'Required fields are missing' }), { status: 400 });
  }

  const insertResponse = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
    method: 'POST',
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      company: payload.company || null,
      phone: payload.phone || null,
      message: payload.message,
      consent: Boolean(payload.consent)
    })
  });

  if (!insertResponse.ok) {
    const errorBody = await insertResponse.text();
    return new Response(JSON.stringify({ error: 'Insert failed', detail: errorBody }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
