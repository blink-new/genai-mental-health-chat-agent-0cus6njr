export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentType?: 'orchestrator' | 'information' | 'help-finder' | 'resource' | 'safety' | 'validation';
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'podcast' | 'contact';
  summary: string;
  topics: string[];
}

export interface HelpOption {
  id: string;
  name: string;
  type: 'online' | 'local';
  description: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  city?: string;
  ageRange: string;
  topics: string[];
  compassLevel: 1 | 2 | 3 | 4;
}

export type AgentStatus = 'idle' | 'processing' | 'crisis' | 'error';

export interface CompassDialogue {
  currentStep: number;
  responses: Record<string, string>;
  recommendedLevel?: number;
}