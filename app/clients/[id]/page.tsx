'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ClientForm } from '@/components/clients/ClientForm';
import type { Client } from '@/types';

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchClient();
  }, [params.id]);

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/clients/${params.id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to fetch client');
        return;
      }

      setClient(data.client);
    } catch (error) {
      setError('An error occurred while fetching client');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this client?')) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/clients/${params.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete client');
        return;
      }

      router.push('/clients');
    } catch (error) {
      alert('An error occurred while deleting client');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-gray-600">Loading client...</p>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Client not found'}</p>
          <Button onClick={() => router.push('/clients')}>
            Back to Clients
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {client.clientName}
            </h1>
            <p className="text-gray-600 mt-2">Client Details</p>
          </div>
          <div className="flex gap-2">
            {!isEditing && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </Button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <Card>
            <ClientForm clientId={client.id} initialData={client} />
            <div className="mt-4">
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
                className="w-full"
              >
                Cancel Editing
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <h2 className="text-lg font-semibold mb-2">Project Summary</h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {client.projectSummary}
              </p>
            </Card>
            <Card>
              <h2 className="text-lg font-semibold mb-2">Goals</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{client.goals}</p>
            </Card>
            <Card>
              <h2 className="text-lg font-semibold mb-4">Actions</h2>
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  onClick={() => router.push(`/summary/${client.id}`)}
                  className="flex-1"
                >
                  View Summary
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => router.push('/clients')}
                  className="flex-1"
                >
                  Back to List
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
