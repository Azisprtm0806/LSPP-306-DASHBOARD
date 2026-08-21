"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Loader2, KeyRound, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { login } = useAuth();
  const [email, setEmail] = useState("admin@lspp.id");
  const [password, setPassword] = useState("password123");
  const [verificationCode, setVerificationCode] = useState("B47X2Q");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Silakan masukkan email Anda.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login({ email, password, verificationCode });
      if (res.success) {
        toast.success("Login berhasil! Mengalihkan ke dashboard...");
        router.push(redirectUrl);
      } else {
        toast.error(res.message || "Gagal masuk. Periksa kembali akun Anda.");
      }
    } catch {
      toast.error("Terjadi kesalahan saat masuk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen md:h-auto md:min-h-screen overflow-hidden md:overflow-auto bg-[#F1F3F6] flex items-center justify-center p-0 sm:p-6 md:py-16">
      <div className="bg-white w-full h-full md:h-auto max-w-[580px] rounded-none md:rounded-[3rem] shadow-none md:shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 sm:p-10 md:p-16 my-0 flex flex-col items-center justify-center md:justify-start overflow-y-auto md:overflow-visible">
        <div className="mb-6 md:mb-8 flex flex-col items-center text-center">
          <div className="relative w-60 h-16 md:w-72 md:h-20 mb-4">
            <Image
              src="/images/logo-nav.png"
              alt="LSPP 306 Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Selamat Datang
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Silakan masuk ke akun Asesor / Pengguna Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-5">
          <div className="space-y-1 md:space-y-2">
            <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 flex items-center gap-1.5">
              <Mail size={14} className="text-gray-400" />
              <span>Email</span>
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="h-12 md:h-14 rounded-xl border-gray-200 focus:ring-[#5C723D]/20 focus:border-[#5C723D] px-4 text-sm md:text-base"
            />
          </div>

          <div className="space-y-1 md:space-y-2">
            <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 flex items-center gap-1.5">
              <KeyRound size={14} className="text-gray-400" />
              <span>Password</span>
            </label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 md:h-14 rounded-xl border-gray-200 focus:ring-[#5C723D]/20 focus:border-[#5C723D] px-4 text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-gray-400" />
              <span>Kode Verifikasi</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="bg-[#F9FBF8] border border-gray-200 rounded-xl p-2 md:p-3 w-fit flex items-center justify-center select-none shadow-xs">
                <span className="text-lg md:text-xl font-serif tracking-[0.3em] select-none italic text-gray-600">
                  B <span className="text-[#5C723D] font-bold">4</span> 7{" "}
                  <span className="text-red-400 font-bold">X</span> 2 Q
                </span>
              </div>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Masukkan kode"
                className="h-12 md:h-14 rounded-xl border-gray-200 focus:ring-[#5C723D]/20 focus:border-[#5C723D] px-4 flex-1 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="pt-2 md:pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#5C723D] hover:bg-[#4a5c31] text-white h-12 md:h-14 rounded-xl font-bold text-base md:text-lg shadow-lg shadow-[#5C723D]/20 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk</span>
              )}
            </Button>
          </div>

          <div className="p-3 bg-[#F2F5E9]/60 rounded-xl border border-[#8AA53C]/30 text-center">
            <p className="text-xs text-[#5A7A22]">
              💡 <strong>Mock Login Demo:</strong> Anda dapat langsung menekan tombol <strong>Masuk</strong> untuk menguji dashboard.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
