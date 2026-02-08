import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h2 className="text-xl font-semibold mb-2">Your Template</h2>
            <p className="text-gray-600 mb-4">
              Create or edit your professional template
            </p>
            <Link href="/template">
              <Button variant="primary" className="w-full">
                Manage Template
              </Button>
            </Link>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-2">Clients</h2>
            <p className="text-gray-600 mb-4">
              View and manage your client records
            </p>
            <Link href="/clients">
              <Button variant="primary" className="w-full">
                View Clients
              </Button>
            </Link>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-2">Quick Start</h2>
            <p className="text-gray-600 mb-4">
              1. Create your template
              <br />
              2. Add clients
              <br />
              3. Generate summaries
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
