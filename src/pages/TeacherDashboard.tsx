
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, LogOut, Users, AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Mock data untuk demo
  const [students] = useState([
    {
      id: 1,
      name: 'Budi Santoso',
      class: '6A',
      temperature: '36.5',
      weight: '32.1',
      height: '125',
      complaint: 'Tidak ada keluhan',
      status: 'healthy',
      date: '2024-01-20'
    },
    {
      id: 2,
      name: 'Sari Dewi',
      class: '6A',
      temperature: '37.2',
      weight: '28.5',
      height: '122',
      complaint: 'Pusing dan mual sedikit',
      status: 'concern',
      date: '2024-01-20'
    },
    {
      id: 3,
      name: 'Ahmad Rizki',
      class: '6A',
      temperature: '38.1',
      weight: '35.2',
      height: '128',
      complaint: 'Demam dan batuk',
      status: 'sick',
      date: '2024-01-20'
    }
  ]);

  const [responses, setResponses] = useState<{[key: number]: string}>({});

  const handleSubmitResponse = (studentId: number) => {
    const response = responses[studentId];
    if (!response) {
      toast({
        title: "Mohon isi tanggapan",
        description: "Silakan tulis tanggapan terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tanggapan Berhasil Dikirim! 📝",
      description: "Siswa akan menerima notifikasi tanggapan Anda",
    });

    // Clear the response
    setResponses(prev => ({...prev, [studentId]: ''}));
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout Berhasil 👋",
      description: "Sampai jumpa lagi!",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800">Sehat</Badge>;
      case 'concern':
        return <Badge className="bg-yellow-100 text-yellow-800">Perhatian</Badge>;
      case 'sick':
        return <Badge className="bg-red-100 text-red-800">Sakit</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const healthyCount = students.filter(s => s.status === 'healthy').length;
  const concernCount = students.filter(s => s.status === 'concern').length;
  const sickCount = students.filter(s => s.status === 'sick').length;

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
                <h1 className="text-2xl font-bold text-green-600">Dashboard Guru - {user?.name}</h1>
                <p className="text-sm text-gray-600">Wali Kelas {user?.class}</p>
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
                    <p className="text-blue-600 font-semibold">Total Siswa</p>
                    <p className="text-3xl font-bold text-blue-800">{students.length}</p>
                  </div>
                  <Users className="w-12 h-12 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-semibold">Siswa Sehat</p>
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
                    <p className="text-red-600 font-semibold">Siswa Sakit</p>
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
                Data Kesehatan Siswa Kelas {user?.class}
              </CardTitle>
              <CardDescription>
                Pantau kondisi kesehatan siswa hari ini dan berikan tanggapan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="today" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="today">Data Hari Ini</TabsTrigger>
                  <TabsTrigger value="history">Riwayat Mingguan</TabsTrigger>
                </TabsList>
                
                <TabsContent value="today" className="p-6">
                  <div className="space-y-6">
                    {students.map((student) => (
                      <Card key={student.id} className={`border-2 ${
                        student.status === 'healthy' ? 'border-green-200 bg-green-50' :
                        student.status === 'concern' ? 'border-yellow-200 bg-yellow-50' :
                        'border-red-200 bg-red-50'
                      }`}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{student.name}</CardTitle>
                            {getStatusBadge(student.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Data Kesehatan:</h4>
                              <div className="space-y-2">
                                <p><strong>Suhu Tubuh:</strong> {student.temperature}°C</p>
                                <p><strong>Berat Badan:</strong> {student.weight} kg</p>
                                <p><strong>Tinggi Badan:</strong> {student.height} cm</p>
                                <p><strong>Keluhan:</strong> {student.complaint}</p>
                                <p><strong>Tanggal:</strong> {student.date}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-3">Tanggapan Guru:</h4>
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Tulis tanggapan atau saran untuk siswa..."
                                  value={responses[student.id] || ''}
                                  onChange={(e) => setResponses(prev => ({
                                    ...prev,
                                    [student.id]: e.target.value
                                  }))}
                                  className="min-h-[100px]"
                                />
                                <Button
                                  onClick={() => handleSubmitResponse(student.id)}
                                  className="w-full bg-blue-500 hover:bg-blue-600"
                                >
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Kirim Tanggapan
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="p-6">
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Riwayat Mingguan</h3>
                    <p className="text-gray-500">
                      Fitur ini akan menampilkan rekap data kesehatan siswa dalam 7 hari terakhir
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
