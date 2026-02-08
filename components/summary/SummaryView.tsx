import { Card } from '@/components/ui/Card';
import type { Template, Client } from '@/types';

interface SummaryViewProps {
  template: Template;
  client: Client;
}

export function SummaryView({ template, client }: SummaryViewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Project Summary: {client.clientName}
          </h1>
          <p className="text-gray-600 mt-1">
            Prepared by {template.specialization}
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Professional Profile
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div>
                <span className="font-medium text-gray-700">Specialization:</span>
                <span className="ml-2 text-gray-900">{template.specialization}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Work Style:</span>
                <span className="ml-2 text-gray-900">{template.workStyle}</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Project Overview
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">
                {client.projectSummary}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Goals & Objectives
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{client.goals}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Proposed Sections
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">
                {template.defaultSections}
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Generated on {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </Card>
    </div>
  );
}
