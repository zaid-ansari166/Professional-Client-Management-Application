'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import type { Template } from '@/types';

const workStyleOptions = [
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'On-site', label: 'On-site' },
];

export function TemplateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [existingTemplate, setExistingTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState({
    specialization: '',
    workStyle: '',
    defaultSections: '',
  });

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await fetch('/api/template');
      const data = await res.json();
      if (data.template) {
        setExistingTemplate(data.template);
        setFormData({
          specialization: data.template.specialization,
          workStyle: data.template.workStyle,
          defaultSections: data.template.defaultSections,
        });
      }
    } catch (error) {
      console.error('Error fetching template:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const method = existingTemplate ? 'PUT' : 'POST';
      const res = await fetch('/api/template', {
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
        existingTemplate ? 'Template updated successfully!' : 'Template created successfully!'
      );
      setExistingTemplate(data.template);
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
        label="Specialization"
        value={formData.specialization}
        onChange={(e) =>
          setFormData({ ...formData, specialization: e.target.value })
        }
        required
        placeholder="e.g., Full-Stack Developer, UI/UX Designer"
      />
      <Select
        label="Work Style"
        value={formData.workStyle}
        onChange={(e) =>
          setFormData({ ...formData, workStyle: e.target.value })
        }
        options={workStyleOptions}
        required
      />
      <Textarea
        label="Default Sections"
        value={formData.defaultSections}
        onChange={(e) =>
          setFormData({ ...formData, defaultSections: e.target.value })
        }
        required
        placeholder="e.g., Introduction, Technical Stack, Timeline, Deliverables"
        rows={6}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? 'Saving...'
          : existingTemplate
          ? 'Update Template'
          : 'Create Template'}
      </Button>
    </form>
  );
}
