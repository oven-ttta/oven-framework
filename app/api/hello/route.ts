// API Route: /api/hello
// Next.js-style route handlers

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get('name') || 'World';

  return Response.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    method: 'GET',
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return Response.json({
    message: 'Data received successfully',
    data: body,
    timestamp: new Date().toISOString(),
    method: 'POST',
  });
}
