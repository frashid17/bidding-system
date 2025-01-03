interface FallbackAd {
  id: string;
  html: string;
  size: [number, number];
}

const fallbackAds: Record<string, FallbackAd[]> = {
  '300x250': [
    {
      id: 'house-ad-1',
      html: `<div class="house-ad w-full h-full flex flex-col items-center justify-center 
        bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-600/20 dark:to-purple-600/20
        backdrop-blur-sm border border-white/20 dark:border-white/10
        text-gray-900 dark:text-gray-100 p-6 rounded-2xl shadow-xl
        hover:shadow-2xl hover:scale-[1.02] transform
        transition-all duration-300 group overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 dark:from-indigo-600/30 dark:via-purple-600/30 dark:to-indigo-600/30 
          animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative z-10">
          <div class="text-indigo-600 dark:text-indigo-400 mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <svg class="w-16 h-16 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Real-Time Bidding
          </h3>
          <p class="text-center text-sm text-gray-600 dark:text-gray-300 opacity-90 group-hover:opacity-100">
            Optimize your ad revenue with our advanced bidding system
          </p>
        </div>
      </div>`,
      size: [300, 250]
    },
    {
      id: 'house-ad-2',
      html: `<div class="house-ad w-full h-full flex flex-col items-center justify-center 
        bg-gradient-to-br from-blue-500/10 to-emerald-500/10 dark:from-blue-600/20 dark:to-emerald-600/20
        backdrop-blur-sm border border-white/20 dark:border-white/10
        text-gray-900 dark:text-gray-100 p-6 rounded-2xl shadow-xl
        hover:shadow-2xl hover:scale-[1.02] transform
        transition-all duration-300 group overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-blue-500/20 dark:from-blue-600/30 dark:via-emerald-600/30 dark:to-blue-600/30 
          animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative z-10">
          <div class="text-blue-600 dark:text-blue-400 mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <svg class="w-16 h-16 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h3>
          <p class="text-center text-sm text-gray-600 dark:text-gray-300 opacity-90 group-hover:opacity-100">
            Track performance with real-time analytics
          </p>
        </div>
      </div>`,
      size: [300, 250]
    }
  ],
  '728x90': [
    {
      id: 'house-ad-3',
      html: `<div class="house-ad w-full h-full flex items-center justify-between 
        bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-600/20 dark:to-fuchsia-600/20
        backdrop-blur-sm border border-white/20 dark:border-white/10
        text-gray-900 dark:text-gray-100 px-6 py-3 rounded-2xl shadow-xl
        hover:shadow-2xl hover:scale-[1.02] transform
        transition-all duration-300 group overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20 
          animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="flex items-center space-x-4 relative z-10">
          <div class="text-violet-600 dark:text-violet-400 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <svg class="w-10 h-10 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              Header Bidding Solution
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 opacity-90 group-hover:opacity-100">
              Maximize your ad revenue potential
            </p>
          </div>
        </div>
      </div>`,
      size: [728, 90]
    },
    {
      id: 'house-ad-4',
      html: `<div class="house-ad w-full h-full flex items-center justify-between 
        bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-gray-100 px-6 py-2 rounded-lg shadow-sm transition-all duration-300">
        <div class="flex items-center space-x-4">
          <div class="text-indigo-600 dark:text-indigo-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold">Secure & Reliable</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Enterprise-grade ad serving platform</p>
          </div>
        </div>
      </div>`,
      size: [728, 90]
    }
  ],
  '970x250': [
    {
      id: 'house-ad-5',
      html: `<div class="house-ad w-full h-full grid grid-cols-2 gap-8 
        bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-gray-100 p-8 rounded-lg shadow-sm transition-all duration-300">
        <div class="flex flex-col justify-center">
          <h2 class="text-2xl font-bold mb-4">Enterprise Bidding Platform</h2>
          <ul class="space-y-3">
            <li class="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Real-time analytics and reporting
            </li>
            <li class="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Multiple SSP integrations
            </li>
            <li class="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Advanced yield optimization
            </li>
          </ul>
        </div>
        <div class="flex items-center justify-center">
          <div class="w-48 h-48 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
            <svg class="w-24 h-24 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>`,
      size: [970, 250]
    }
  ]
};

export const getFallbackAd = (size: string): FallbackAd | null => {
  const ads = fallbackAds[size];
  if (!ads?.length) return null;
  return ads[Math.floor(Math.random() * ads.length)];
};