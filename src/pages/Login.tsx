
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login Berhasil! 🎉",
          description: "Selamat datang di sistem kesehatan anak",
        });
        
        // Wait a bit for profile to load, then redirect based on role
        setTimeout(() => {
          if (profile?.role === 'student') {
            navigate('/student');
          } else if (profile?.role === 'teacher') {
            navigate('/teacher');
          } else if (profile?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        toast({
          title: "Login Gagal 😞",
          description: "Email atau password tidak sesuai",
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang! 👋</h1>
          <p className="text-gray-600">Masuk ke Sistem Kesehatan Anak SD</p>
        </div>

        {/* Login Form */}
        <Card className="kid-friendly-shadow border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-center text-green-600">Masuk ke Akun Anda</CardTitle>
            <CardDescription className="text-center">
              Masukkan email dan password untuk login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-2 focus:border-green-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-2 focus:border-green-400 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Masuk..." : "🚀 Masuk Sekarang"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            ← Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
