import Link from 'next/link';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Card } from '@/components/ui/Card';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">
            Sign up to get started with your profile
          </p>
        </div>
        <Card>
          <SignUpForm />
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
