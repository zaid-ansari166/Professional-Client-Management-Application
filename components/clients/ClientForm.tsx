'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import type { Client } from '@/types';

interface ClientFormProps {
  clientId?: string;
  initialData?: Client;
}

export function ClientForm({ clientId, initialData }: ClientFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    clientName: initialData?.clientName || '',
    projectSummary: initialData?.projectSummary || '',
    goals: initialData?.goals || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const url = clientId ? `/api/clients/${clientId}` : '/api/clients';
      const method = clientId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setSuccess(
        clientId ? 'Client updated successfully!' : 'Client created successfully!'
      );
      setTimeout(() => router.push('/clients'), 1500);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Client Name"
        value={formData.clientName}
        onChange={(e) =>
          setFormData({ ...formData, clientName: e.target.value })
        }
        required
        placeholder="e.g., Acme Corporation"
      />
      <Textarea
        label="Project Summary"
        value={formData.projectSummary}
        onChange={(e) =>
          setFormData({ ...formData, projectSummary: e.target.value })
        }
        required
        placeholder="Brief description of the project..."
        rows={4}
      />
      <Textarea
        label="Goals"
        value={formData.goals}
        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
        required
        placeholder="Project goals and objectives..."
        rows={4}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : clientId ? 'Update Client' : 'Create Client'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/clients')}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
