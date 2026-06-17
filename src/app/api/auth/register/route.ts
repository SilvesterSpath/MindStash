import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const BCRYPT_ROUNDS = 12;

interface RegisterBody {
  name?: unknown;
  email?: unknown;
  password?: unknown;
  confirmPassword?: unknown;
}

function parseRegisterBody(body: RegisterBody) {
  const { name, email, password, confirmPassword } = body;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    return { error: 'Invalid request body' as const };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName || !trimmedEmail || !password) {
    return { error: 'Name, email, and password are required' as const };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' as const };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' as const };
  }

  return {
    data: {
      name: trimmedName,
      email: trimmedEmail,
      password,
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterBody;
    const parsed = parseRegisterBody(body);

    if ('error' in parsed) {
      return NextResponse.json({ success: false, error: parsed.error }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, BCRYPT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 },
    );
  }
}
