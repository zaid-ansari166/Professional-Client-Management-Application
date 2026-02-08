'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Client } from '@/types';

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {client.clientName}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {client.projectSummary}
      </p>
      <div className="flex gap-2">
        <Link href={`/clients/${client.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
        </Link>
        <Link href={`/summary/${client.id}`} className="flex-1">
          <Button variant="primary" className="w-full">
            View Summary
          </Button>
        </Link>
      </div>
    </Card>
  );
}
