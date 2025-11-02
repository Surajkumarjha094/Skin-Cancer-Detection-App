import React from 'react';
import { ArrowLeft, Camera, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { ScanResult } from '../types/skinScan';

interface AnalysisResultsProps {
  result: ScanResult | null;
  isAnalyzing: boolean;
  onBack: () => void;
  onNewScan: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  result, 
  isAnalyzing, 
  onBack, 
  onNewScan 
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-orange-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-50 border-green-200';
      case 'medium': return 'bg-orange-50 border-orange-200';
      case 'high': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'medium': return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'high': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      default: return <Clock className="w-6 h-6 text-gray-600" />;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
        <div className="max-w-md mx-auto pt-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h2 className="text-xl font-semibold ml-4">Analyzing Image</h2>
          </div>

          {/* Analysis Animation */}
          <Card className="mb-6 bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress</h3>
              <p className="text-gray-600 mb-6">Our advanced neural network is examining your image...</p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Asymmetry Analysis</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Border Examination</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Color Variation</span>
                  <div className="w-4 h-4 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Diameter Assessment</span>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Evolution Patterns</span>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <p className="text-sm text-blue-800">
                <strong>Did you know?</strong> Early detection of melanoma has a 99% 5-year survival rate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-xl font-semibold ml-4">Analysis Results</h2>
        </div>

        {/* Risk Assessment */}
        <Card className={`mb-6 ${getRiskBgColor(result.riskLevel)} border-2`}>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {getRiskIcon(result.riskLevel)}
              <div className="ml-3">
                <h3 className={`text-xl font-bold ${getRiskColor(result.riskLevel)} capitalize`}>
                  {result.riskLevel} Risk
                </h3>
                <p className="text-sm text-gray-600">
                  Confidence: {result.confidence}%
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              {result.riskLevel === 'low' && (
                <p className="text-sm text-gray-700">
                  The analyzed lesion shows characteristics consistent with benign (non-cancerous) tissue. Continue regular self-monitoring.
                </p>
              )}
              {result.riskLevel === 'medium' && (
                <p className="text-sm text-gray-700">
                  Some features require attention. We recommend consulting with a dermatologist for professional evaluation.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ABCDE Analysis */}
        <Card className="mb-6 bg-white/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">ABCDE Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Asymmetry</span>
                <span className="text-sm text-gray-600">{result.analysis.asymmetry}%</span>
              </div>
              <Progress value={result.analysis.asymmetry} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Border Irregularity</span>
                <span className="text-sm text-gray-600">{result.analysis.border}%</span>
              </div>
              <Progress value={result.analysis.border} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Color Variation</span>
                <span className="text-sm text-gray-600">{result.analysis.color}%</span>
              </div>
              <Progress value={result.analysis.color} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Diameter</span>
                <span className="text-sm text-gray-600">{result.analysis.diameter}%</span>
              </div>
              <Progress value={result.analysis.diameter} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Evolution Risk</span>
                <span className="text-sm text-gray-600">{result.analysis.evolution}%</span>
              </div>
              <Progress value={result.analysis.evolution} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mb-6 bg-white/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3 mb-6">
          <Button 
            onClick={onNewScan}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            <Camera className="w-5 h-5 mr-2" />
            Scan Another Lesion
          </Button>
          
          {result.riskLevel !== 'low' && (
            <Button 
              variant="outline"
              className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 py-3 rounded-xl"
            >
              Find Dermatologist Nearby
            </Button>
          )}
        </div>

        {/* Medical Disclaimer */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-800 font-medium">Important Notice</p>
                <p className="text-xs text-amber-700 mt-1">
                  This analysis is for informational purposes only and should not replace professional medical advice. 
                  Always consult with a qualified dermatologist for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisResults;
