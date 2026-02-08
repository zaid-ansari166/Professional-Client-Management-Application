import { Card } from '@/components/ui/Card';
import { TemplateForm } from '@/components/template/TemplateForm';

export default function TemplatePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Template</h1>
          <p className="text-gray-600 mt-2">
            Create or update your professional template. This will be combined with
            client information to generate summaries.
          </p>
        </div>
        <Card>
          <TemplateForm />
        </Card>
      </div>
    </div>
  );
}
