
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, LogOut, Thermometer, Weight, Ruler, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [healthData, setHealthData] = useState({
    temperature: '',
    weight: '',
    height: '',
    complaint: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    toast({
      title: "Data Berhasil Disimpan! 🎉",
      description: "Guru akan melihat data kesehatan kamu hari ini",
    });
    
    // Reset form
    setHealthData({
      temperature: '',
      weight: '',
      height: '',
      complaint: ''
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout Berhasil 👋",
      description: "Sampai jumpa lagi!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">Halo, {user?.name}! 👋</h1>
                <p className="text-sm text-gray-600">Kelas {user?.class} - Dashboard Siswa</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Message */}
          <Card className="mb-8 bg-gradient-to-r from-blue-100 to-green-100 border-2 border-blue-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                Selamat Datang di Portal Kesehatan! 🌟
              </h2>
              <p className="text-blue-700">
                Yuk, catat kondisi kesehatan kamu hari ini! Jangan lupa untuk jujur ya, 
                supaya guru bisa membantu kalau kamu merasa tidak enak badan.
              </p>
            </CardContent>
          </Card>

          {/* Health Data Form */}
          <Card className="kid-friendly-shadow border-2 border-green-100">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700 flex items-center">
                <Thermometer className="w-6 h-6 mr-2" />
                Catat Kesehatan Harian
              </CardTitle>
              <CardDescription>
                Isi data kesehatan kamu hari ini dengan lengkap dan jujur
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature" className="text-lg font-semibold flex items-center">
                      <Thermometer className="w-5 h-5 mr-2 text-red-500" />
                      Suhu Tubuh (°C)
                    </Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="36.5"
                      value={healthData.temperature}
                      onChange={(e) => setHealthData({...healthData, temperature: e.target.value})}
                      required
                      className="text-lg border-2 focus:border-green-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-lg font-semibold flex items-center">
                      <Weight className="w-5 h-5 mr-2 text-blue-500" />
                      Berat Badan (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="30.5"
                      value={healthData.weight}
                      onChange={(e) => setHealthData({...healthData, weight: e.target.value})}
                      required
                      className="text-lg border-2 focus:border-green-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-lg font-semibold flex items-center">
                      <Ruler className="w-5 h-5 mr-2 text-purple-500" />
                      Tinggi Badan (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="120"
                      value={healthData.height}
                      onChange={(e) => setHealthData({...healthData, height: e.target.value})}
                      required
                      className="text-lg border-2 focus:border-green-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complaint" className="text-lg font-semibold flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                    Keluhan Kesehatan (jika ada)
                  </Label>
                  <Textarea
                    id="complaint"
                    placeholder="Ceritakan jika ada yang tidak enak badan, misalnya: pusing, mual, batuk, pilek, sakit perut, dll. Kalau tidak ada keluhan, tulis 'Tidak ada keluhan' ya!"
                    value={healthData.complaint}
                    onChange={(e) => setHealthData({...healthData, complaint: e.target.value})}
                    required
                    className="text-lg border-2 focus:border-green-400 min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg text-xl font-semibold"
                >
                  💾 Simpan Data Kesehatan
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Health Tips */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-yellow-50 border-2 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-700">Tips Sehat Hari Ini! 🌟</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-yellow-800">
                  <li>• Minum air putih minimal 8 gelas sehari</li>
                  <li>• Cuci tangan pakai sabun</li>
                  <li>• Makan buah dan sayur</li>
                  <li>• Tidur cukup 8-10 jam</li>
                  <li>• Olahraga ringan setiap hari</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-pink-50 border-2 border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-700">Jika Merasa Sakit 🤒</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-pink-800">
                  <li>• Langsung lapor ke guru atau orang tua</li>
                  <li>• Istirahat yang cukup</li>
                  <li>• Minum air putih lebih banyak</li>
                  <li>• Jangan main dulu sampai sembuh</li>
                  <li>• Minum obat sesuai anjuran</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
