
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, AlertCircle, Eye, Ruler } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface EducationPanelProps {
  onBack: () => void;
}

const EducationPanel: React.FC<EducationPanelProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-xl font-semibold ml-4">Skin Cancer Detection</h2>
        </div>

        <Tabs defaultValue="abcde" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="abcde">ABCDE Guide</TabsTrigger>
            <TabsTrigger value="tips">Prevention Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="abcde" className="space-y-6">
            {/* ABCDE Overview */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  ABCDE Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  The ABCDE method helps identify potentially dangerous moles and skin lesions. 
                  Check your skin monthly using these criteria:
                </p>
              </CardContent>
            </Card>

            {/* A - Asymmetry */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-red-600">A</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Asymmetry</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      If you draw a line through the middle of the mole, the two halves don't match.
                    </p>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-xs text-red-800">
                        <strong>Warning:</strong> Benign moles are usually symmetrical. 
                        Asymmetrical moles should be examined by a dermatologist.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* B - Border */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-orange-600">B</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Border</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Look for irregular, scalloped, or poorly defined borders.
                    </p>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-xs text-orange-800">
                        <strong>Normal:</strong> Smooth, even borders. 
                        <strong>Concerning:</strong> Ragged, notched, or blurred edges.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* C - Color */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-yellow-600">C</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Color</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Multiple colors or uneven color distribution within the same mole.
                    </p>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        <strong>Watch for:</strong> Shades of brown, black, red, white, or blue within one mole.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* D - Diameter */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Ruler className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Diameter</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Larger than 6mm (about the size of a pencil eraser).
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-800">
                        <strong>Note:</strong> Some melanomas can be smaller than 6mm, so size alone isn't definitive.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* E - Evolution */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Evolution</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Changes in size, shape, color, elevation, or symptoms.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-purple-800">
                        <strong>Monitor:</strong> Itching, tenderness, bleeding, or crusting are warning signs.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            {/* Sun Protection */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Sun Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Use Broad-Spectrum SPF 30+</p>
                    <p className="text-xs text-gray-600">Apply 30 minutes before sun exposure, reapply every 2 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Seek Shade</p>
                    <p className="text-xs text-gray-600">Especially between 10 AM and 4 PM when UV rays are strongest</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Wear Protective Clothing</p>
                    <p className="text-xs text-gray-600">Long sleeves, wide-brimmed hats, and UV-blocking sunglasses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Early Detection */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Early Detection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Monthly Self-Exams</p>
                    <p className="text-xs text-gray-600">Check your entire body monthly using the ABCDE method</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Annual Dermatologist Visits</p>
                    <p className="text-xs text-gray-600">Professional skin exams can catch what you might miss</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Document Changes</p>
                    <p className="text-xs text-gray-600">Take photos of moles to track changes over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Know Your Risk Factors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-medium text-red-800">High Risk</p>
                    <ul className="mt-1 space-y-1 text-red-700">
                      <li>• Fair skin</li>
                      <li>• Many moles</li>
                      <li>• Family history</li>
                      <li>• Previous skin cancer</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-medium text-orange-800">Moderate Risk</p>
                    <ul className="mt-1 space-y-1 text-orange-700">
                      <li>• Sun exposure</li>
                      <li>• Sunburn history</li>
                      <li>• Age over 50</li>
                      <li>• Weakened immune system</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-900 mb-2">Early Detection Saves Lives</h3>
                <p className="text-sm text-blue-800">
                  When caught early, melanoma has a 99% 5-year survival rate. 
                  Regular screening and self-examination are your best defense.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EducationPanel;
