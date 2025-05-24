
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, LogOut, Users, AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface HealthData {
  id: string;
  user_id: string;
  tanggal: string;
  suhu: string;
  berat_badan: string;
  tinggi_badan: string;
  keluhan: string;
  merasa: string;
  tanggapan_guru: string;
  profiles: {
    nama: string;
    kelas: string;
  };
}

const TeacherDashboard = () => {
  const { profile, logout } = useAuth();
  const { toast } = useToast();
  
  const [healthDataList, setHealthDataList] = useState<HealthData[]>([]);
  const [responses, setResponses] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHealthData();
  }, [profile]);

  const fetchHealthData = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('kesehatan_siswa')
        .select(`
          *,
          profiles (
            nama,
            kelas
          )
        `)
        .order('tanggal', { ascending: false });

      if (error) {
        console.error('Error fetching health data:', error);
        return;
      }

      setHealthDataList(data || []);
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitResponse = async (healthDataId: string) => {
    const response = responses[healthDataId];
    if (!response) {
      toast({
        title: "Mohon isi tanggapan",
        description: "Silakan tulis tanggapan terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('kesehatan_siswa')
        .update({ tanggapan_guru: response })
        .eq('id', healthDataId);

      if (error) {
        console.error('Error updating response:', error);
        toast({
          title: "Gagal Menyimpan Tanggapan",
          description: "Terjadi kesalahan saat menyimpan tanggapan",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Tanggapan Berhasil Dikirim! 📝",
        description: "Siswa akan melihat tanggapan Anda",
      });

      // Clear the response and refresh data
      setResponses(prev => ({...prev, [healthDataId]: ''}));
      fetchHealthData();
    } catch (error) {
      console.error('Error updating response:', error);
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

  const getStatusBadge = (merasa: string) => {
    switch (merasa) {
      case 'sangat_sehat':
      case 'sehat':
        return <Badge className="bg-green-100 text-green-800">Sehat</Badge>;
      case 'biasa_saja':
      case 'kurang_sehat':
        return <Badge className="bg-yellow-100 text-yellow-800">Perhatian</Badge>;
      case 'sakit':
        return <Badge className="bg-red-100 text-red-800">Sakit</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getMoodEmoji = (merasa: string) => {
    switch (merasa) {
      case 'sangat_sehat': return '😄';
      case 'sehat': return '😊';
      case 'biasa_saja': return '😐';
      case 'kurang_sehat': return '😟';
      case 'sakit': return '😷';
      default: return '😐';
    }
  };

  const healthyCount = healthDataList.filter(h => ['sangat_sehat', 'sehat'].includes(h.merasa)).length;
  const concernCount = healthDataList.filter(h => ['biasa_saja', 'kurang_sehat'].includes(h.merasa)).length;
  const sickCount = healthDataList.filter(h => h.merasa === 'sakit').length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-600">Dashboard Guru - {profile?.nama}</h1>
                <p className="text-sm text-gray-600">Wali Kelas {profile?.kelas}</p>
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
        <div className="max-w-7xl mx-auto">
          {/* Statistics Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-blue-50 border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 font-semibold">Total Laporan</p>
                    <p className="text-3xl font-bold text-blue-800">{healthDataList.length}</p>
                  </div>
                  <Users className="w-12 h-12 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-semibold">Kondisi Sehat</p>
                    <p className="text-3xl font-bold text-green-800">{healthyCount}</p>
                  </div>
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-2 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 font-semibold">Perlu Perhatian</p>
                    <p className="text-3xl font-bold text-yellow-800">{concernCount}</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-600 font-semibold">Kondisi Sakit</p>
                    <p className="text-3xl font-bold text-red-800">{sickCount}</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Health Data */}
          <Card className="kid-friendly-shadow border-2 border-green-100">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700 flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Data Kesehatan Siswa Kelas {profile?.kelas}
              </CardTitle>
              <CardDescription>
                Pantau kondisi kesehatan siswa dan berikan tanggapan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {healthDataList.map((healthData) => (
                  <Card key={healthData.id} className={`border-2 ${
                    ['sangat_sehat', 'sehat'].includes(healthData.merasa) ? 'border-green-200 bg-green-50' :
                    ['biasa_saja', 'kurang_sehat'].includes(healthData.merasa) ? 'border-yellow-200 bg-yellow-50' :
                    'border-red-200 bg-red-50'
                  }`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {healthData.profiles?.nama} - Kelas {healthData.profiles?.kelas}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getMoodEmoji(healthData.merasa)}</span>
                          {getStatusBadge(healthData.merasa)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Data Kesehatan:</h4>
                          <div className="space-y-2">
                            <p><strong>Suhu Tubuh:</strong> {healthData.suhu}°C</p>
                            <p><strong>Berat Badan:</strong> {healthData.berat_badan} kg</p>
                            <p><strong>Tinggi Badan:</strong> {healthData.tinggi_badan} cm</p>
                            <p><strong>Perasaan:</strong> {healthData.merasa.replace('_', ' ')}</p>
                            <p><strong>Keluhan:</strong> {healthData.keluhan || 'Tidak ada keluhan'}</p>
                            <p><strong>Tanggal:</strong> {new Date(healthData.tanggal).toLocaleDateString('id-ID')}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Tanggapan Guru:</h4>
                          {healthData.tanggapan_guru ? (
                            <div className="bg-blue-50 p-4 rounded-lg border">
                              <p className="text-blue-800">{healthData.tanggapan_guru}</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Tulis tanggapan atau saran untuk siswa..."
                                value={responses[healthData.id] || ''}
                                onChange={(e) => setResponses(prev => ({
                                  ...prev,
                                  [healthData.id]: e.target.value
                                }))}
                                className="min-h-[100px]"
                              />
                              <Button
                                onClick={() => handleSubmitResponse(healthData.id)}
                                className="w-full bg-blue-500 hover:bg-blue-600"
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Kirim Tanggapan
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {healthDataList.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum Ada Data</h3>
                    <p className="text-gray-500">
                      Belum ada siswa yang mengisi data kesehatan hari ini
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
