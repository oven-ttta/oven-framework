// API Route: /api/users/[id]
// Get, update, delete a specific user

const users = new Map([
  ['1', { id: '1', name: 'Alice', email: 'alice@example.com' }],
  ['2', { id: '2', name: 'Bob', email: 'bob@example.com' }],
  ['3', { id: '3', name: 'Charlie', email: 'charlie@example.com' }],
]);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users.get(params.id);

  if (!user) {
    return Response.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return Response.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users.get(params.id);

  if (!user) {
    return Response.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const updatedUser = {
    ...user,
    ...body,
    id: params.id, // Prevent ID change
  };

  users.set(params.id, updatedUser);

  return Response.json({
    message: 'User updated',
    user: updatedUser,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!users.has(params.id)) {
    return Response.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  users.delete(params.id);

  return Response.json({
    message: 'User deleted',
    id: params.id,
  });
}
