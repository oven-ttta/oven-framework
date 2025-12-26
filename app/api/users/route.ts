// API Route: /api/users
// List and create users

const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com' },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '10');

  return Response.json({
    users: users.slice(0, limit),
    total: users.length,
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  const newUser = {
    id: String(users.length + 1),
    name: body.name || 'Unknown',
    email: body.email || 'unknown@example.com',
  };

  users.push(newUser);

  return Response.json({
    message: 'User created',
    user: newUser,
  }, { status: 201 });
}
