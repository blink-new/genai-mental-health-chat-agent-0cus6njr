import React from 'react';
import { Bot, User, Brain, Search, Compass, BookOpen, Shield } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const getAgentIcon = () => {
    switch (message.agentType) {
      case 'safety': return <Shield className="w-4 h-4" />;
      case 'information': return <BookOpen className="w-4 h-4" />;
      case 'help-finder': return <Compass className="w-4 h-4" />;
      case 'resource': return <Search className="w-4 h-4" />;
      case 'validation': return <Shield className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getAgentName = () => {
    switch (message.agentType) {
      case 'safety': return 'Sicherheits-Agent';
      case 'information': return 'Info-Agent';
      case 'help-finder': return 'Hilfe-Finder';
      case 'resource': return 'Ressourcen-Agent';
      case 'validation': return 'Validierungs-Agent';
      default: return 'Orchestrator';
    }
  };

  const getAgentColor = () => {
    switch (message.agentType) {
      case 'safety': return 'bg-red-100 text-red-800';
      case 'information': return 'bg-blue-100 text-blue-800';
      case 'help-finder': return 'bg-green-100 text-green-800';
      case 'resource': return 'bg-purple-100 text-purple-800';
      case 'validation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-full">
              {getAgentIcon()}
            </div>
            <Badge variant="secondary" className={getAgentColor()}>
              {getAgentName()}
            </Badge>
          </div>
        )}
        
        <Card className={`p-3 ${
          isUser 
            ? 'bg-blue-600 text-white' 
            : 'bg-white border-gray-200'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          
          {message.resources && message.resources.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs font-medium text-gray-600">
                Empfohlene Ressourcen:
              </p>
              {message.resources.map((resource) => (
                <div key={resource.id} className="bg-gray-50 p-2 rounded text-xs">
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {resource.title}
                  </a>
                  <p className="text-gray-600 mt-1">{resource.summary}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString('de-DE', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      
      {isUser && (
        <div className="bg-gray-200 text-gray-600 p-1.5 rounded-full ml-2 order-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;