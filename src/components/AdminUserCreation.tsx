
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Users, GraduationCap } from 'lucide-react';

const AdminUserCreation = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nama: '',
    role: '',
    kelas: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await signup(
        formData.email,
        formData.password,
        formData.nama,
        formData.role,
        formData.kelas
      );

      if (success) {
        toast({
          title: "Akun Berhasil Dibuat! 🎉",
          description: `Akun ${formData.role} untuk ${formData.nama} telah dibuat`,
        });
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          nama: '',
          role: '',
          kelas: ''
        });
      } else {
        toast({
          title: "Gagal Membuat Akun 😞",
          description: "Terjadi kesalahan saat membuat akun",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: "Silakan coba lagi dalam beberapa saat",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <UserPlus className="w-6 h-6" />
          Buat Akun Baru
        </CardTitle>
        <CardDescription>
          Buat akun guru atau siswa untuk sistem kesehatan anak SD
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input
              id="nama"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={(e) => handleInputChange('nama', e.target.value)}
              required
              className="border-2 focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="border-2 focus:border-green-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              className="border-2 focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
              <SelectTrigger className="border-2 focus:border-green-400">
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Guru
                  </div>
                </SelectItem>
                <SelectItem value="student">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Siswa
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kelas">Kelas</Label>
            <Select value={formData.kelas} onValueChange={(value) => handleInputChange('kelas', value)}>
              <SelectTrigger className="border-2 focus:border-green-400">
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1A">Kelas 1A</SelectItem>
                <SelectItem value="1B">Kelas 1B</SelectItem>
                <SelectItem value="2A">Kelas 2A</SelectItem>
                <SelectItem value="2B">Kelas 2B</SelectItem>
                <SelectItem value="3A">Kelas 3A</SelectItem>
                <SelectItem value="3B">Kelas 3B</SelectItem>
                <SelectItem value="4A">Kelas 4A</SelectItem>
                <SelectItem value="4B">Kelas 4B</SelectItem>
                <SelectItem value="5A">Kelas 5A</SelectItem>
                <SelectItem value="5B">Kelas 5B</SelectItem>
                <SelectItem value="6A">Kelas 6A</SelectItem>
                <SelectItem value="6B">Kelas 6B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
            disabled={isLoading || !formData.role}
          >
            {isLoading ? "Membuat Akun..." : "🚀 Buat Akun"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminUserCreation;
