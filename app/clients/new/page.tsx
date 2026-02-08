import { Card } from '@/components/ui/Card';
import { ClientForm } from '@/components/clients/ClientForm';

export default function NewClientPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">New Client</h1>
          <p className="text-gray-600 mt-2">
            Add a new client to your portfolio
          </p>
        </div>
        <Card>
          <ClientForm />
        </Card>
      </div>
    </div>
  );
}
