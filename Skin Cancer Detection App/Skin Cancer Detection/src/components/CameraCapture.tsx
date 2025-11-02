
import React, { useRef, useState } from 'react';
import { Camera, X, ZapOff, Zap, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface CameraCaptureProps {
  onCapture: (imageUrl: string) => void;
  onBack: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  React.useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsReady(true);
        };
      }
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const imageUrl = canvas.toDataURL('image/jpeg', 0.9);
    
    // Stop camera
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    onCapture(imageUrl);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    setIsReady(false);
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between text-white">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>
          <h2 className="text-lg font-semibold">Skin Scan</h2>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setFlashOn(!flashOn)}
              className="text-white hover:bg-white/20"
            >
              {flashOn ? <Zap className="w-6 h-6" /> : <ZapOff className="w-6 h-6" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleCamera}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Camera View */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      
      {/* Scanning Guide Overlay */}
      {isReady && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            {/* Scanning Frame */}
            <div className="w-64 h-64 border-4 border-white rounded-lg relative">
              <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-blue-400 rounded-tl"></div>
              <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-blue-400 rounded-tr"></div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-blue-400 rounded-bl"></div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-blue-400 rounded-br"></div>
            </div>
            
            {/* Instruction */}
            <Card className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-black/70 border-gray-600">
              <CardContent className="p-3 text-center">
                <p className="text-white text-sm">Position the lesion within the frame</p>
                <p className="text-gray-300 text-xs mt-1">Ensure good lighting and focus</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-center">
          <Button
            onClick={capturePhoto}
            disabled={!isReady}
            className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 text-black border-4 border-gray-300 disabled:opacity-50"
          >
            <Camera className="w-8 h-8" />
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-white text-sm">Tap to capture</p>
          <p className="text-gray-300 text-xs mt-1">Make sure the area is well-lit and in focus</p>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraCapture;
