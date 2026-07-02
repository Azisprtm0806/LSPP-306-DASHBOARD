export function TopbarHero() {
  return (
    <div className="relative h-40 bg-[#5C723D] flex items-center px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/topbar.png')] bg-cover bg-right" />

      <div className="absolute inset-0 bg-linear-to-r from-[#5C723D] via-[#5C723D]/90 to-transparent" />

      <div className="relative max-w-7xl mx-auto w-full flex items-center gap-12 z-10 px-4">
        <div className="flex flex-col items-center shrink-0">
          <div className="w-20 h-20 rounded-full border-2 border-white/20 overflow-hidden mb-2">
            <img
              src="/images/avatar.png"
              alt="Ahmad"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center text-white">
            <p className="font-bold text-sm">Ahmad Riyadh Smith</p>
            <p className="text-xs opacity-80">Asesor</p>
          </div>
        </div>

        <div className="text-white flex flex-col justify-center ml-4">
          <p className="text-sm opacity-90 mb-1 flex gap-2">
            <span>LSPP</span> <span>{">"}</span> <span>Dashboard</span>{" "}
            <span>{">"}</span> <span>Home</span>
          </p>
          <h1 className="text-4xl font-bold">Beranda</h1>
        </div>
      </div>
    </div>
  );
}
