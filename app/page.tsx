"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";

export default function LoginPage() {
  return (
    <div className="h-screen md:h-auto md:min-h-screen overflow-hidden md:overflow-auto bg-[#F1F3F6] flex items-center justify-center p-0 sm:p-6 md:py-16">
      <div className="bg-white w-full h-full md:h-auto max-w-[580px] rounded-none md:rounded-[3rem] shadow-none md:shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 sm:p-10 md:p-16 my-0 flex flex-col items-center justify-center md:justify-start overflow-y-auto md:overflow-visible">
        <div className="mb-6 md:mb-10 flex flex-col items-center text-center">
          <div className="relative w-64 h-16 md:w-84 md:h-20 mb-4 md:mb-6">
            <Image
              src="/images/logo-nav.png"
              alt="LSP Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
            Selamat Datang
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Silakan masuk ke akun Anda
          </p>
        </div>

        <form className="w-full space-y-4 md:space-y-6">
          <div className="space-y-1 md:space-y-2">
            <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="Masukkan email Anda"
              className="h-12 md:h-14 rounded-xl border-gray-200 focus:ring-[#82B124]/20 focus:border-[#82B124] px-5"
            />
          </div>

          <div className="space-y-1 md:space-y-2">
            <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="h-12 md:h-14 rounded-xl border-gray-200 focus:ring-[#82B124]/20 focus:border-[#82B124] px-5"
            />
          </div>

          <div className="space-y-2 md:space-y-3">
            <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1">
              Kode Verifikasi
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="bg-[#F9FBF8] border border-gray-100 rounded-lg p-2 md:p-3 w-fit flex items-center justify-center">
                <span className="text-xl md:text-2xl font-serif tracking-[0.3em] select-none italic text-gray-600">
                  B <span className="text-[#82B124]">4</span> 7{" "}
                  <span className="text-red-400">X</span> 2 Q
                </span>
              </div>
              <Input
                type="text"
                placeholder="Masukkan kode"
                className="h-12 md:h-14 rounded-xl border-gray-200 focus:ring-[#82B124]/20 focus:border-[#82B124] px-5 flex-1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="border-gray-300 data-[state=checked]:bg-[#82B124]"
              />
              <label
                htmlFor="remember"
                className="text-gray-500 font-medium cursor-pointer"
              >
                Ingat saya
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-blue-400 font-semibold hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
            <Button className="w-full bg-[#82B124] hover:bg-[#729c1f] text-white h-12 md:h-14 rounded-xl font-bold text-base md:text-lg shadow-lg shadow-[#82B124]/20">
              Masuk
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 md:h-14 rounded-xl border-gray-200 font-bold text-gray-600 flex gap-3 hover:bg-gray-50 text-sm md:text-base"
            >
              <div className="relative w-5 h-5">
                <Image src="/images/social-icon/google.png" alt="Google" fill />
              </div>
              Masuk dengan Google
            </Button>
          </div>
        </form>

        <p className="mt-6 md:mt-10 text-sm md:text-base text-gray-400 font-medium text-center">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-blue-400 font-bold hover:underline"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
