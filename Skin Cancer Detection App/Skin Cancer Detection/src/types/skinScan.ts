
export interface ScanResult {
  id: string;
  imageUrl: string;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  timestamp: Date;
  analysis: {
    asymmetry: number;
    border: number;
    color: number;
    diameter: number;
    evolution: number;
  };
  recommendations: string[];
}
