import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, Phone, Heart, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import MessageBubble from './MessageBubble';
import CrisisModal from './CrisisModal';
import GDPRBanner from './GDPRBanner';
import { Message, AgentStatus } from '../types/chat';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hallo! Ich bin dein digitaler Begleiter von Between The Lines. Ich kann dir dabei helfen, Informationen über mentale Gesundheit zu finden oder passende Unterstützung in deiner Nähe zu entdecken. Wie kann ich dir heute helfen?',
      sender: 'agent',
      timestamp: new Date(),
      agentType: 'orchestrator'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('idle');
  const [gdprAccepted, setGdprAccepted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const crisisKeywords = [
    'umbringen', 'kann nicht mehr', 'möchte nicht mehr leben', 
    'selbstmord', 'suizid', 'töten', 'sterben will'
  ];

  const detectCrisis = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const simulateAgentResponse = async (userMessage: string) => {
    setIsTyping(true);
    setAgentStatus('processing');

    // Crisis detection
    if (detectCrisis(userMessage)) {
      setShowCrisisModal(true);
      setIsTyping(false);
      setAgentStatus('crisis');
      return;
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate different agent responses based on message content
    let response = '';
    let agentType: 'orchestrator' | 'information' | 'help-finder' | 'resource' = 'orchestrator';

    if (userMessage.toLowerCase().includes('hilfe') || userMessage.toLowerCase().includes('unterstützung')) {
      agentType = 'help-finder';
      response = 'Ich verstehe, dass du nach Hilfe suchst. Um dir die passende Unterstützung zu empfehlen, möchte ich dir ein paar Fragen stellen. Wie lange fühlst du dich schon so? Beeinträchtigt das deinen Alltag?';
    } else if (userMessage.toLowerCase().includes('depression') || userMessage.toLowerCase().includes('angst')) {
      agentType = 'information';
      response = 'Das sind wichtige Themen. Depression und Angststörungen sind häufige psychische Erkrankungen, die gut behandelbar sind. Möchtest du mehr über die Symptome erfahren oder suchst du nach konkreter Hilfe?';
    } else {
      response = 'Danke für deine Nachricht. Ich bin hier, um dir zu helfen. Kannst du mir etwas mehr darüber erzählen, womit du dich beschäftigst?';
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: 'agent',
      timestamp: new Date(),
      agentType
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
    setAgentStatus('idle');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !gdprAccepted) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageContent = inputValue;
    setInputValue('');

    await simulateAgentResponse(messageContent);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getAgentStatusColor = () => {
    switch (agentStatus) {
      case 'processing': return 'bg-blue-500';
      case 'crisis': return 'bg-red-500';
      case 'idle': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (!gdprAccepted) {
    return <GDPRBanner onAccept={() => setGdprAccepted(true)} />;
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Between The Lines</h1>
              <p className="text-blue-100 text-sm">Dein digitaler Begleiter für mentale Gesundheit</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getAgentStatusColor()}`}></div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Shield className="w-3 h-3 mr-1" />
              Sicher & Vertraulich
            </Badge>
          </div>
        </div>
      </div>

      {/* Emergency Alert */}
      <Alert className="m-4 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Notfall?</strong> Bei akuten Krisen: Telefonseelsorge 0800 111 0 111 oder Notruf 112
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2 text-red-700 border-red-300 hover:bg-red-100"
            onClick={() => setShowCrisisModal(true)}
          >
            <Phone className="w-3 h-3 mr-1" />
            Hilfe
          </Button>
        </AlertDescription>
      </Alert>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm">Agent antwortet...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-gray-50 p-4">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Schreibe deine Nachricht..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Dieser Chat-Agent ersetzt keine professionelle Beratung oder Therapie.
        </p>
      </div>

      <CrisisModal 
        isOpen={showCrisisModal} 
        onClose={() => setShowCrisisModal(false)} 
      />
    </div>
  );
};

export default ChatInterface;