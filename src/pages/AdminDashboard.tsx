
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, LogOut, Users, UserPlus, School, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  email: string;
  nama: string;
  role: string;
  kelas?: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { profile, logout, signup } = useAuth();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    nama: '',
    role: '',
    kelas: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.email || !newUser.password || !newUser.nama || !newUser.role) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon isi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    if (newUser.role !== 'admin' && !newUser.kelas) {
      toast({
        title: "Kelas Diperlukan",
        description: "Mohon pilih kelas untuk guru dan siswa",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await signup(
        newUser.email,
        newUser.password,
        newUser.nama,
        newUser.role,
        newUser.role === 'admin' ? undefined : newUser.kelas
      );

      if (success) {
        toast({
          title: "Akun Berhasil Dibuat! 🎉",
          description: `Akun ${newUser.role} baru telah dibuat dan dapat langsung digunakan`,
        });
        
        // Reset form
        setNewUser({
          email: '',
          password: '',
          nama: '',
          role: '',
          kelas: ''
        });
        
        // Refresh users list
        setTimeout(() => {
          fetchUsers();
        }, 1000);
      } else {
        toast({
          title: "Gagal Membuat Akun",
          description: "Terjadi kesalahan saat membuat akun baru",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
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

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return <Badge className="bg-blue-100 text-blue-800">Siswa</Badge>;
      case 'teacher':
        return <Badge className="bg-green-100 text-green-800">Guru</Badge>;
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const kelasOptions = ['6A', '6B', '6C', '5A', '5B', '5C', '4A', '4B', '4C', '3A', '3B', '3C', '2A', '2B', '2C', '1A', '1B', '1C'];

  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalTeachers = users.filter(u => u.role === 'teacher').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-600">Dashboard Admin - {profile?.nama}</h1>
                <p className="text-sm text-gray-600">Sistem Kesehatan Anak SD</p>
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
                    <p className="text-3xl font-bold text-blue-800">{totalStudents}</p>
                  </div>
                  <Users className="w-12 h-12 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-semibold">Total Guru</p>
                    <p className="text-3xl font-bold text-green-800">{totalTeachers}</p>
                  </div>
                  <School className="w-12 h-12 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 font-semibold">Total Admin</p>
                    <p className="text-3xl font-bold text-purple-800">{totalAdmins}</p>
                  </div>
                  <UserPlus className="w-12 h-12 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-2 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 font-semibold">Total Pengguna</p>
                    <p className="text-3xl font-bold text-orange-800">{users.length}</p>
                  </div>
                  <BarChart className="w-12 h-12 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="create-user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create-user">Buat Akun Baru</TabsTrigger>
              <TabsTrigger value="manage-users">Kelola Pengguna</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create-user">
              <Card className="border-2 border-purple-100">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-purple-700 flex items-center">
                    <UserPlus className="w-6 h-6 mr-2" />
                    Buat Akun Guru dan Siswa Baru
                  </CardTitle>
                  <CardDescription>
                    Buat akun baru yang dapat langsung digunakan untuk login
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleCreateUser} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        <Input
                          id="nama"
                          type="text"
                          placeholder="Masukkan nama lengkap"
                          value={newUser.nama}
                          onChange={(e) => setNewUser({...newUser, nama: e.target.value})}
                          required
                          className="border-2 focus:border-purple-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Masukkan email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          required
                          className="border-2 focus:border-purple-400"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Masukkan password"
                          value={newUser.password}
                          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                          required
                          className="border-2 focus:border-purple-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Peran</Label>
                        <Select 
                          value={newUser.role} 
                          onValueChange={(value) => setNewUser({...newUser, role: value, kelas: value === 'admin' ? '' : newUser.kelas})}
                          required
                        >
                          <SelectTrigger className="border-2 focus:border-purple-400">
                            <SelectValue placeholder="Pilih peran pengguna" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">👦 Siswa</SelectItem>
                            <SelectItem value="teacher">👩‍🏫 Guru</SelectItem>
                            <SelectItem value="admin">👩‍💼 Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {newUser.role && newUser.role !== 'admin' && (
                      <div className="space-y-2">
                        <Label htmlFor="kelas">Kelas</Label>
                        <Select 
                          value={newUser.kelas} 
                          onValueChange={(value) => setNewUser({...newUser, kelas: value})}
                          required
                        >
                          <SelectTrigger className="border-2 focus:border-purple-400">
                            <SelectValue placeholder="Pilih kelas" />
                          </SelectTrigger>
                          <SelectContent>
                            {kelasOptions.map((kelas) => (
                              <SelectItem key={kelas} value={kelas}>Kelas {kelas}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold"
                    >
                      🎯 Buat Akun Baru
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="manage-users">
              <Card className="border-2 border-green-100">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-700 flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Kelola Semua Pengguna
                  </CardTitle>
                  <CardDescription>
                    Daftar semua pengguna dalam sistem
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {users.map((user) => (
                      <Card key={user.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-lg">{user.nama}</h4>
                              <p className="text-gray-600">{user.email}</p>
                              {user.kelas && (
                                <p className="text-sm text-gray-500">Kelas: {user.kelas}</p>
                              )}
                              <p className="text-xs text-gray-400">
                                Dibuat: {new Date(user.created_at).toLocaleDateString('id-ID')}
                              </p>
                            </div>
                            <div className="text-right">
                              {getRoleBadge(user.role)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {users.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum Ada Pengguna</h3>
                        <p className="text-gray-500">
                          Belum ada pengguna yang terdaftar dalam sistem
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
