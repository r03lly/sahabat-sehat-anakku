
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Shield, Activity } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-600">Peduli Kesehatan Anak SD</h1>
                <p className="text-sm text-gray-600">Sistem Monitoring Kesehatan Sekolah</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
            >
              Masuk
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-800 mb-6 animate-bounce-slow">
              Selamat Datang di Portal Kesehatan Anak SD! 🌟
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Platform digital yang membantu memantau dan merawat kesehatan anak-anak sekolah dasar 
              dengan sistem yang mudah, aman, dan menyenangkan untuk digunakan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg kid-friendly-shadow"
              >
                🚀 Mulai Sekarang
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 rounded-full text-lg"
              >
                📖 Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Fitur Unggulan Kami 🎯
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="kid-friendly-shadow hover:scale-105 transition-transform duration-300 border-2 border-blue-100">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600">Untuk Siswa 👦👧</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  • Catat data kesehatan harian<br/>
                  • Laporkan keluhan dengan mudah<br/>
                  • Interface yang ramah anak<br/>
                  • Panduan kesehatan interaktif
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="kid-friendly-shadow hover:scale-105 transition-transform duration-300 border-2 border-green-100">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-600">Untuk Guru 👩‍🏫👨‍🏫</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  • Monitor kesehatan siswa real-time<br/>
                  • Rekap data harian & mingguan<br/>
                  • Respon keluhan siswa<br/>
                  • Manajemen per kelas
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="kid-friendly-shadow hover:scale-105 transition-transform duration-300 border-2 border-purple-100">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-600">Untuk Admin 👩‍💼👨‍💼</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  • Kelola seluruh akun sistem<br/>
                  • Analisis data kesehatan sekolah<br/>
                  • Laporan komprehensif<br/>
                  • Kontrol akses penuh
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-400" />
            <h4 className="text-xl font-bold">Peduli Kesehatan Anak SD</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Sistem monitoring kesehatan yang aman, mudah, dan menyenangkan untuk anak-anak
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Peduli Kesehatan Anak SD. Dibuat dengan ❤️ untuk masa depan yang lebih sehat.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
