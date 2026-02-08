import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ClientList } from '@/components/clients/ClientList';

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Clients</h1>
            <p className="text-gray-600 mt-2">
              Manage your client records and generate summaries
            </p>
          </div>
          <Link href="/clients/new">
            <Button variant="primary">New Client</Button>
          </Link>
        </div>
        <ClientList />
      </div>
    </div>
  );
}
