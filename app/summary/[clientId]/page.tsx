'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { SummaryView } from '@/components/summary/SummaryView';
import type { Template, Client } from '@/types';

export default function SummaryPage({
  params,
}: {
  params: { clientId: string };
}) {
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSummary();
  }, [params.clientId]);

  const fetchSummary = async () => {
    try {
      const res = await fetch(`/api/summary/${params.clientId}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to fetch summary');
        return;
      }

      setTemplate(data.summary.template);
      setClient(data.summary.client);
    } catch (error) {
      setError('An error occurred while fetching summary');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-gray-600">Loading summary...</p>
      </div>
    );
  }

  if (error || !template || !client) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Summary not available'}</p>
          {error?.includes('Template not found') && (
            <p className="text-gray-600 mb-4">
              Please create your template first before viewing summaries.
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push('/template')}>
              Go to Template
            </Button>
            <Button variant="secondary" onClick={() => router.push('/clients')}>
              Back to Clients
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Summary</h1>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => router.push(`/clients/${client.id}`)}
            >
              Edit Client
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push('/clients')}
            >
              Back to Clients
            </Button>
          </div>
        </div>
        <SummaryView template={template} client={client} />
      </div>
    </div>
  );
}
