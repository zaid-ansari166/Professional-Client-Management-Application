import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch template and client in parallel
    const [template, client] = await Promise.all([
      prisma.template.findUnique({
        where: { userId: session.user.id },
      }),
      prisma.client.findUnique({
        where: { id: params.clientId, userId: session.user.id },
      }),
    ]);

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found. Please create your template first.' },
        { status: 404 }
      );
    }

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        summary: {
          template,
          client,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get summary error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
