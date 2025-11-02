
import React, { useState } from 'react';
import { Camera, History, BookOpen, Activity } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import CameraCapture from '../components/CameraCapture';
import AnalysisResults from '../components/AnalysisResults';
import ScanHistory from '../components/ScanHistory';
import EducationPanel from '../components/EducationPanel';
import { ScanResult } from '../types/skinScan';

type ViewType = 'home' | 'camera' | 'analysis' | 'history' | 'education';

const SkinCancerDetection = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartScan = () => {
    setCurrentView('camera');
  };

  const handleCapture = (imageUrl: string) => {
    setIsAnalyzing(true);
    setCurrentView('analysis');
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: ScanResult = {
        id: Date.now().toString(),
        imageUrl,
        riskLevel: Math.random() > 0.7 ? 'medium' : 'low',
        confidence: Math.floor(Math.random() * 20) + 80,
        timestamp: new Date(),
        analysis: {
          asymmetry: Math.floor(Math.random() * 40) + 10,
          border: Math.floor(Math.random() * 30) + 15,
          color: Math.floor(Math.random() * 35) + 20,
          diameter: Math.floor(Math.random() * 25) + 10,
          evolution: Math.floor(Math.random() * 20) + 5,
        },
        recommendations: [
          'Continue regular self-monitoring',
          'Schedule routine dermatology check-up',
          'Use broad-spectrum SPF 30+ sunscreen daily',
          'Avoid peak sun hours (10 AM - 4 PM)',
        ],
      };
      
      setCurrentScan(mockResult);
      setScans(prev => [mockResult, ...prev]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleViewResult = (result: ScanResult) => {
    setCurrentScan(result);
    setCurrentView('analysis');
  };

  const handleBack = () => {
    setCurrentView('home');
    setCurrentScan(null);
  };

  const handleNewScan = () => {
    setCurrentView('camera');
    setCurrentScan(null);
  };

  if (currentView === 'camera') {
    return <CameraCapture onCapture={handleCapture} onBack={handleBack} />;
  }

  if (currentView === 'analysis') {
    return (
      <AnalysisResults
        result={currentScan}
        isAnalyzing={isAnalyzing}
        onBack={handleBack}
        onNewScan={handleNewScan}
      />
    );
  }

  if (currentView === 'history') {
    return (
      <ScanHistory
        scans={scans}
        onBack={handleBack}
        onViewResult={handleViewResult}
      />
    );
  }

  if (currentView === 'education') {
    return <EducationPanel onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SkinScan AI</h1>
          <p className="text-gray-600">AI-powered skin cancer detection</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{scans.length}</div>
              <div className="text-sm text-gray-500">Total Scans</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {scans.filter(s => s.riskLevel === 'low').length}
              </div>
              <div className="text-sm text-gray-500">Low Risk</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="space-y-4 mb-8">
          <Button
            onClick={handleStartScan}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl text-lg font-semibold"
          >
            <Camera className="w-6 h-6 mr-3" />
            Start Skin Scan
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentView('history')}
              className="py-4 rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <History className="w-5 h-5 mr-2" />
              History
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setCurrentView('education')}
              className="py-4 rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Learn
            </Button>
          </div>
        </div>

        {/* Recent Scans */}
        {scans.length > 0 && (
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scans.slice(0, 3).map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleViewResult(scan)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={scan.imageUrl}
                        alt="Scan"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium capitalize text-gray-900">
                          {scan.riskLevel} Risk
                        </p>
                        <p className="text-xs text-gray-500">
                          {scan.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{scan.confidence}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">Early Detection Saves Lives</p>
                <p className="text-xs text-amber-700 mt-1">
                  Regular skin monitoring can detect melanoma early when it's 99% treatable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkinCancerDetection;
