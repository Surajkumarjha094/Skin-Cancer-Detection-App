import React from 'react';
import { ArrowLeft, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScanResult } from '../types/skinScan';

interface ScanHistoryProps {
  scans: ScanResult[];
  onBack: () => void;
  onViewResult: (result: ScanResult) => void;
}

const ScanHistory: React.FC<ScanHistoryProps> = ({ scans, onBack, onViewResult }) => {
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
      case 'low': return 'bg-green-100';
      case 'medium': return 'bg-orange-100';
      case 'high': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const groupScansByDate = (scans: ScanResult[]) => {
    const grouped: { [key: string]: ScanResult[] } = {};
    
    scans.forEach(scan => {
      const dateKey = scan.timestamp.toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(scan);
    });
    
    return grouped;
  };

  const groupedScans = groupScansByDate(scans);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-xl font-semibold ml-4">Scan History</h2>
        </div>

        {/* Stats Overview */}
        <Card className="mb-6 bg-white/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{scans.length}</div>
                <div className="text-xs text-gray-500">Total Scans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {scans.filter(s => s.riskLevel === 'low').length}
                </div>
                <div className="text-xs text-gray-500">Low Risk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {scans.filter(s => s.riskLevel === 'medium').length}
                </div>
                <div className="text-xs text-gray-500">Medium Risk</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan History */}
        {scans.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Scans Yet</h3>
              <p className="text-gray-500 text-sm">
                Your scan history will appear here after you complete your first analysis.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedScans)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([dateKey, dayScans]) => (
                <div key={dateKey}>
                  <h3 className="text-sm font-medium text-gray-600 mb-3 px-2">
                    {new Date(dateKey).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  
                  <div className="space-y-3">
                    {dayScans
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map((scan) => (
                        <Card 
                          key={scan.id}
                          className="cursor-pointer hover:shadow-md transition-shadow bg-white/80 backdrop-blur border-0"
                          onClick={() => onViewResult(scan)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={scan.imageUrl} 
                                  alt="Scan"
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                  <div className="flex items-center space-x-2">
                                    {getRiskIcon(scan.riskLevel)}
                                    <span className={`text-sm font-medium capitalize ${getRiskColor(scan.riskLevel)}`}>
                                      {scan.riskLevel} Risk
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(scan.timestamp)}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBgColor(scan.riskLevel)} ${getRiskColor(scan.riskLevel)}`}>
                                  {scan.confidence}%
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanHistory;
