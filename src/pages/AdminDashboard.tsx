
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Heart, LogOut, Users, UserPlus, Edit, Trash2, School, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Mock data
  const [users, setUsers] = useState([
    { id: 1, name: 'Budi Santoso', email: 'budi@demo.com', role: 'student', class: '6A' },
    { id: 2, name: 'Sari Dewi', email: 'sari@demo.com', role: 'student', class: '6A' },
    { id: 3, name: 'Ahmad Rizki', email: 'ahmad@demo.com', role: 'student', class: '6B' },
    { id: 4, name: 'Ibu Sari', email: 'guru6a@demo.com', role: 'teacher', class: '6A' },
    { id: 5, name: 'Pak Budi', email: 'guru6b@demo.com', role: 'teacher', class: '6B' },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    class: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const classes = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];

  const handleSubmitUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...newUser }
          : u
      ));
      toast({
        title: "Akun Berhasil Diupdate! ✅",
        description: `Data ${newUser.name} telah diperbarui`,
      });
    } else {
      // Add new user
      const newId = Math.max(...users.map(u => u.id)) + 1;
      setUsers(prev => [...prev, { id: newId, ...newUser }]);
      toast({
        title: "Akun Berhasil Dibuat! 🎉",
        description: `Akun ${newUser.name} telah ditambahkan`,
      });
    }

    // Reset form
    setNewUser({ name: '', email: '', role: '', class: '' });
    setEditingUser(null);
    setIsDialogOpen(false);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      class: user.class || ''
    });
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    const userToDelete = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast({
      title: "Akun Berhasil Dihapus! 🗑️",
      description: `Akun ${userToDelete?.name} telah dihapus`,
    });
  };

  const handleLogout = () => {
    logout();
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

  const studentCount = users.filter(u => u.role === 'student').length;
  const teacherCount = users.filter(u => u.role === 'teacher').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

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
                <h1 className="text-2xl font-bold text-purple-600">Dashboard Admin - {user?.name}</h1>
                <p className="text-sm text-gray-600">Sistem Manajemen Kesehatan Sekolah</p>
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
                    <p className="text-3xl font-bold text-blue-800">{studentCount}</p>
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
                    <p className="text-3xl font-bold text-green-800">{teacherCount}</p>
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
                    <p className="text-3xl font-bold text-purple-800">{adminCount}</p>
                  </div>
                  <Heart className="w-12 h-12 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-2 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 font-semibold">Total Kelas</p>
                    <p className="text-3xl font-bold text-yellow-800">{classes.length}</p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Management */}
          <Card className="kid-friendly-shadow border-2 border-purple-100">
            <CardHeader className="bg-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-purple-700 flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Manajemen Pengguna
                  </CardTitle>
                  <CardDescription>
                    Kelola akun siswa, guru, dan admin
                  </CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-purple-500 hover:bg-purple-600"
                      onClick={() => {
                        setEditingUser(null);
                        setNewUser({ name: '', email: '', role: '', class: '' });
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Tambah Akun
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingUser ? 'Edit Akun' : 'Tambah Akun Baru'}
                      </DialogTitle>
                      <DialogDescription>
                        {editingUser ? 'Perbarui data akun pengguna' : 'Buat akun baru untuk siswa, guru, atau admin'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          placeholder="Masukkan email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Peran</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih peran" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Siswa</SelectItem>
                            <SelectItem value="teacher">Guru</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {(newUser.role === 'student' || newUser.role === 'teacher') && (
                        <div className="space-y-2">
                          <Label htmlFor="class">Kelas</Label>
                          <Select value={newUser.class} onValueChange={(value) => setNewUser({...newUser, class: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kelas" />
                            </SelectTrigger>
                            <SelectContent>
                              {classes.map(cls => (
                                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSubmitUser}>
                        {editingUser ? 'Update Akun' : 'Buat Akun'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="student">Siswa</TabsTrigger>
                  <TabsTrigger value="teacher">Guru</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="p-6">
                  <div className="space-y-4">
                    {users.map((user) => (
                      <Card key={user.id} className="border-2 border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <p className="text-gray-600">{user.email}</p>
                                {user.class && (
                                  <p className="text-sm text-gray-500">Kelas: {user.class}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getRoleBadge(user.role)}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="student" className="p-6">
                  <div className="space-y-4">
                    {users.filter(u => u.role === 'student').map((user) => (
                      <Card key={user.id} className="border-2 border-blue-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-500">Kelas: {user.class}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getRoleBadge(user.role)}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="teacher" className="p-6">
                  <div className="space-y-4">
                    {users.filter(u => u.role === 'teacher').map((user) => (
                      <Card key={user.id} className="border-2 border-green-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-500">Wali Kelas: {user.class}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getRoleBadge(user.role)}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="p-6">
                  <div className="space-y-4">
                    {users.filter(u => u.role === 'admin').map((user) => (
                      <Card key={user.id} className="border-2 border-purple-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <p className="text-gray-600">{user.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getRoleBadge(user.role)}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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

export default AdminDashboard;
