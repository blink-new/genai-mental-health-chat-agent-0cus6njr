import React from 'react';
import { Phone, AlertTriangle, ExternalLink, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  const emergencyContacts = [
    {
      name: 'Telefonseelsorge',
      phone: '0800 111 0 111',
      description: 'Kostenlos, anonym, rund um die Uhr',
      available: '24/7'
    },
    {
      name: 'Telefonseelsorge',
      phone: '0800 111 0 222',
      description: 'Alternative Nummer',
      available: '24/7'
    },
    {
      name: 'Nummer gegen Kummer (Jugendliche)',
      phone: '116 111',
      description: 'Speziell für Kinder und Jugendliche',
      available: 'Mo-Sa 14-20 Uhr'
    },
    {
      name: 'Notruf',
      phone: '112',
      description: 'Bei akuter Lebensgefahr',
      available: '24/7'
    }
  ];

  const onlineResources = [
    {
      name: 'Online-Beratung der Telefonseelsorge',
      url: 'https://online.telefonseelsorge.de',
      description: 'Chat- und E-Mail-Beratung'
    },
    {
      name: 'Nummer gegen Kummer Online',
      url: 'https://www.nummergegenkummer.de',
      description: 'Online-Beratung für Jugendliche'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span>Akute Krise - Sofortige Hilfe</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium mb-2">
              Du bist nicht allein. Es gibt Menschen, die dir helfen möchten.
            </p>
            <p className="text-red-700 text-sm">
              Bei Gedanken an Selbstverletzung oder Suizid wende dich bitte sofort an eine der unten stehenden Hilfsangebote.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Telefonische Hilfe
            </h3>
            <div className="grid gap-3">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                      <div className="flex items-center space-x-4">
                        <a 
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="text-blue-600 font-mono font-medium hover:underline"
                        >
                          {contact.phone}
                        </a>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {contact.available}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`tel:${contact.phone.replace(/\s/g, '')}`)}
                      className="ml-2"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-green-600" />
              Online-Beratung
            </h3>
            <div className="grid gap-3">
              {onlineResources.map((resource, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{resource.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                      className="ml-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Wichtige Hinweise:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Alle Gespräche sind vertraulich und kostenlos</li>
              <li>• Du musst deinen Namen nicht nennen</li>
              <li>• Die Berater sind speziell ausgebildet</li>
              <li>• Es ist mutig, sich Hilfe zu holen</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Schließen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrisisModal;