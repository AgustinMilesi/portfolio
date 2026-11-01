export default function Loading() {
  return (
    <div className="min-h-screen bg-[#060606] text-[#e5e5e5] flex flex-col justify-between animate-pulse select-none">
      {/* 1. Top Technical Bar Skeleton */}
      <div className="w-full bg-[#0c0c0c] border-b border-[#252525] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-3 w-28 bg-[#1f1f1f] rounded-[2px]" />
          <div className="h-3 w-20 bg-[#161616] rounded-[2px]" />
        </div>
        <div className="h-3 w-32 bg-[#1f1f1f] rounded-[2px]" />
      </div>

      {/* 2. Navbar Skeleton */}
      <header className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-[#252525]">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-[4px] bg-[#1f1f1f] border border-[#252525]" />
          <div className="h-5 w-24 bg-[#262626] rounded-[3px]" />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="h-4 w-20 bg-[#161616] rounded-[2px]" />
          <div className="h-4 w-20 bg-[#161616] rounded-[2px]" />
          <div className="h-4 w-20 bg-[#161616] rounded-[2px]" />
          <div className="h-4 w-20 bg-[#161616] rounded-[2px]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-16 bg-[#1f1f1f] rounded-[3px]" />
          <div className="h-8 w-24 bg-[#262626] rounded-[3px]" />
        </div>
      </header>

      {/* 3. Hero Section Skeleton */}
      <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1">
        <div className="space-y-4 max-w-4xl">
          <div className="h-3 w-48 bg-[#1f1f1f] rounded-[2px]" />
          <div className="space-y-2">
            <div className="h-12 sm:h-16 w-full bg-[#262626] rounded-[4px]" />
            <div className="h-12 sm:h-16 w-3/4 bg-[#262626] rounded-[4px]" />
          </div>
          <div className="h-5 w-2/3 bg-[#1a1a1a] rounded-[3px]" />
        </div>

        {/* Manifesto Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-[#252525]">
          <div className="p-6 sm:p-8 bg-[#1f1f1f] border border-[#252525] space-y-3">
            <div className="h-3 w-36 bg-[#262626] rounded-[2px]" />
            <div className="h-4 w-full bg-[#181818] rounded-[2px]" />
            <div className="h-4 w-5/6 bg-[#181818] rounded-[2px]" />
          </div>
          <div className="p-6 sm:p-8 bg-[#1f1f1f] border border-[#252525] space-y-3">
            <div className="h-3 w-36 bg-[#262626] rounded-[2px]" />
            <div className="h-4 w-full bg-[#181818] rounded-[2px]" />
            <div className="h-4 w-5/6 bg-[#181818] rounded-[2px]" />
          </div>
        </div>

        {/* Arch Stage Placeholder Skeleton */}
        <div className="h-72 w-full rounded-t-full bg-[#141414] border-t-2 border-x-2 border-[#222222] mt-8" />
      </main>

      {/* 4. Footer Skeleton */}
      <footer className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-[#252525] flex justify-between items-center">
        <div className="h-3 w-40 bg-[#161616] rounded-[2px]" />
        <div className="h-3 w-28 bg-[#161616] rounded-[2px]" />
      </footer>
    </div>
  );
}
