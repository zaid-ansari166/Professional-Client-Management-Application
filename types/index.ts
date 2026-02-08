export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  userId: string;
  specialization: string;
  workStyle: string;
  defaultSections: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  userId: string;
  clientName: string;
  projectSummary: string;
  goals: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SummaryData {
  template: Template;
  client: Client;
}
