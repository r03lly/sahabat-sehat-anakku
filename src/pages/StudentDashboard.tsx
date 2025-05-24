
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, LogOut, Thermometer, Weight, Ruler, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const StudentDashboard = () => {
  const { profile, logout } = useAuth();
  const { toast } = useToast();
  
  const [healthData, setHealthData] = useState({
    suhu: '',
    berat_badan: '',
    tinggi_badan: '',
    keluhan: '',
    merasa: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('kesehatan_siswa')
        .insert([{
          user_id: profile?.id,
          suhu: healthData.suhu,
          berat_badan: healthData.berat_badan,
          tinggi_badan: healthData.tinggi_badan,
          keluhan: healthData.keluhan || 'Tidak ada keluhan',
          merasa: healthData.merasa
        }]);

      if (error) {
        console.error('Error saving health data:', error);
        toast({
          title: "Gagal Menyimpan Data 😞",
          description: "Terjadi kesalahan saat menyimpan data kesehatan",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Data Berhasil Disimpan! 🎉",
        description: "Guru akan melihat data kesehatan kamu hari ini",
      });
      
      // Reset form
      setHealthData({
        suhu: '',
        berat_badan: '',
        tinggi_badan: '',
        keluhan: '',
        merasa: ''
      });
    } catch (error) {
      console.error('Error saving health data:', error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Silakan coba lagi dalam beberapa saat",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await logout();
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
                <h1 className="text-2xl font-bold text-blue-600">Halo, {profile?.nama}! 👋</h1>
                <p className="text-sm text-gray-600">Kelas {profile?.kelas} - Dashboard Siswa</p>
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
                    <Label htmlFor="suhu" className="text-lg font-semibold flex items-center">
                      <Thermometer className="w-5 h-5 mr-2 text-red-500" />
                      Suhu Tubuh (°C)
                    </Label>
                    <Input
                      id="suhu"
                      type="number"
                      step="0.1"
                      placeholder="36.5"
                      value={healthData.suhu}
                      onChange={(e) => setHealthData({...healthData, suhu: e.target.value})}
                      required
                      className="text-lg border-2 focus:border-green-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="berat_badan" className="text-lg font-semibold flex items-center">
                      <Weight className="w-5 h-5 mr-2 text-blue-500" />
                      Berat Badan (kg)
                    </Label>
                    <Input
                      id="berat_badan"
                      type="number"
                      step="0.1"
                      placeholder="30.5"
                      value={healthData.berat_badan}
                      onChange={(e) => setHealthData({...healthData, berat_badan: e.target.value})}
                      required
                      className="text-lg border-2 focus:border-green-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tinggi_badan" className="text-lg font-semibold flex items-center">
                      <Ruler className="w-5 h-5 mr-2 text-purple-500" />
                      Tinggi Badan (cm)
                    </Label>
                    <Input
                      id="tinggi_badan"
                      type="number"
                      placeholder="120"
                      value={healthData.tinggi_badan}
                      onChange={(e) => setHealthData({...healthData, tinggi_badan: e.target.value})}
                      required
                      className="text-lg border-2 focus:border-green-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="merasa" className="text-lg font-semibold">
                    Bagaimana perasaan kamu hari ini?
                  </Label>
                  <Select value={healthData.merasa} onValueChange={(value) => setHealthData({...healthData, merasa: value})} required>
                    <SelectTrigger className="text-lg border-2 focus:border-green-400">
                      <SelectValue placeholder="Pilih perasaan kamu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sangat_sehat">😄 Sangat Sehat dan Ceria</SelectItem>
                      <SelectItem value="sehat">😊 Sehat</SelectItem>
                      <SelectItem value="biasa_saja">😐 Biasa Saja</SelectItem>
                      <SelectItem value="kurang_sehat">😟 Kurang Sehat</SelectItem>
                      <SelectItem value="sakit">😷 Sakit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keluhan" className="text-lg font-semibold flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                    Keluhan Kesehatan (jika ada)
                  </Label>
                  <Textarea
                    id="keluhan"
                    placeholder="Ceritakan jika ada yang tidak enak badan, misalnya: pusing, mual, batuk, pilek, sakit perut, dll. Kalau tidak ada keluhan, kosongkan saja ya!"
                    value={healthData.keluhan}
                    onChange={(e) => setHealthData({...healthData, keluhan: e.target.value})}
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
