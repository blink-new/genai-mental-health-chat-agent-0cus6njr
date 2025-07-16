import React, { useState } from 'react';
import { Shield, Check, X, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface GDPRBannerProps {
  onAccept: () => void;
}

const GDPRBanner: React.FC<GDPRBannerProps> = ({ onAccept }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const canProceed = acceptedTerms && acceptedPrivacy;

  const handleAccept = () => {
    if (canProceed) {
      onAccept();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="bg-blue-600 text-white p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Between The Lines
          </h1>
          <p className="text-gray-600">
            Dein digitaler Begleiter für mentale Gesundheit
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">
              Datenschutz und Sicherheit
            </h2>
            <p className="text-blue-800 text-sm">
              Deine Privatsphäre ist uns wichtig. Bevor du unseren Chat-Service nutzt, 
              möchten wir dich über unseren Umgang mit deinen Daten informieren.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor="terms" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Ich akzeptiere die Nutzungsbedingungen
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Dieser Service ersetzt keine professionelle Beratung oder Therapie.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="privacy"
                checked={acceptedPrivacy}
                onCheckedChange={(checked) => setAcceptedPrivacy(checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor="privacy" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Ich stimme der Datenschutzerklärung zu
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Deine Nachrichten werden verschlüsselt übertragen und nicht dauerhaft gespeichert.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Was wir sammeln:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Deine Chat-Nachrichten (nur für die aktuelle Sitzung)</li>
              <li>• Deine Stadt (nur wenn du nach lokaler Hilfe suchst)</li>
              <li>• Technische Daten (IP-Adresse, Browser-Typ)</li>
            </ul>
            
            <h3 className="font-medium text-gray-900 mb-2 mt-4">Was wir NICHT tun:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Deine Identität speichern oder verfolgen</li>
              <li>• Gespräche dauerhaft aufbewahren</li>
              <li>• Daten an Dritte weitergeben</li>
            </ul>
          </div>

          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Info className="w-4 h-4 mr-2" />
                Detaillierte Datenschutzinformationen
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Datenschutzerklärung - Between The Lines</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <section>
                  <h3 className="font-semibold mb-2">1. Verantwortlicher</h3>
                  <p>Between The Lines NGO<br />
                  [Adresse wird hier eingefügt]<br />
                  E-Mail: datenschutz@betweenthelines.de</p>
                </section>
                
                <section>
                  <h3 className="font-semibold mb-2">2. Datenverarbeitung</h3>
                  <p>Wir verarbeiten deine Daten ausschließlich zum Zweck der Bereitstellung unseres Chat-Services. Die Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</p>
                </section>
                
                <section>
                  <h3 className="font-semibold mb-2">3. Speicherdauer</h3>
                  <p>Chat-Nachrichten werden nur für die Dauer der aktuellen Sitzung gespeichert und danach automatisch gelöscht. Technische Logs werden maximal 7 Tage aufbewahrt.</p>
                </section>
                
                <section>
                  <h3 className="font-semibold mb-2">4. Deine Rechte</h3>
                  <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Du kannst deine Einwilligung jederzeit widerrufen.</p>
                </section>
                
                <section>
                  <h3 className="font-semibold mb-2">5. Sicherheit</h3>
                  <p>Alle Daten werden verschlüsselt übertragen (TLS) und auf sicheren Servern in Deutschland verarbeitet.</p>
                </section>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex space-x-3">
            <Button 
              onClick={handleAccept}
              disabled={!canProceed}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Chat starten
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="px-6"
            >
              <X className="w-4 h-4 mr-2" />
              Abbrechen
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Bei Fragen zum Datenschutz: datenschutz@betweenthelines.de
          </p>
        </div>
      </Card>
    </div>
  );
};

export default GDPRBanner;