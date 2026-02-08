import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to ClientHub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your clients, templates, and projects all in one place
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/signup">
              <Button variant="primary" className="text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="secondary" className="text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Create Your Template</h3>
            <p className="text-gray-600">
              Set up your professional profile with specialization and work style
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Manage Clients</h3>
            <p className="text-gray-600">
              Track multiple clients with project summaries and goals
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Generate Summaries</h3>
            <p className="text-gray-600">
              Combine your template with client info for professional documents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
