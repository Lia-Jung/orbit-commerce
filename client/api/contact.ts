export const config = {
  runtime: 'nodejs'
};

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  consent?: boolean;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    res.status(500).json({ error: 'Server not configured' });
    return;
  }

  const payload = req.body as ContactPayload;
  if (!payload?.name || !payload?.email || !payload?.message) {
    res.status(400).json({ error: 'Required fields are missing' });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  let insertResponse: Response;
  try {
    insertResponse = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
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
      }),
      signal: controller.signal
    });
  } catch (error) {
    clearTimeout(timeout);
    res.status(504).json({ error: 'Upstream timeout', detail: error instanceof Error ? error.message : 'fetch failed' });
    return;
  } finally {
    clearTimeout(timeout);
  }

  if (!insertResponse.ok) {
    const errorBody = await insertResponse.text();
    res.status(500).json({ error: 'Insert failed', detail: errorBody });
    return;
  }

  res.status(200).json({ ok: true });
}
