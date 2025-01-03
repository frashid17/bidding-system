interface AdContent {
  title: string;
  description: string;
}

const createAdHTML = (size: string, content: AdContent): string => {
  const baseClasses = 'house-ad w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700';
  
  // Simple abstract wave SVG background
  const waveBg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%234F46E5' fill-opacity='0.05' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E`;

  // Simple abstract shapes SVG
  const abstractShapes = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='30' fill='%234F46E5' fill-opacity='0.05'/%3E%3Crect x='10' y='10' width='60' height='60' fill='none' stroke='%234F46E5' stroke-opacity='0.05'/%3E%3C/svg%3E`;

  const templates = {
    '300x250': `<div class="${baseClasses} relative group" style="background-image: url('${waveBg}'); background-position: bottom; background-repeat: no-repeat; background-size: cover;">
      <div class="relative p-6 flex flex-col justify-center h-full backdrop-blur-[2px]">
        <div class="w-12 h-12 mb-4 opacity-75">
          <svg fill="none" stroke="currentColor" class="w-full h-full text-blue-600 dark:text-blue-400" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          ${content.title}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">${content.description}</p>
      </div>
    </div>`,

    '728x90': `<div class="${baseClasses} relative group" style="background-image: url('${abstractShapes}'); background-position: right; background-repeat: no-repeat; background-size: contain;">
      <div class="relative px-6 py-3 flex items-center justify-between h-full backdrop-blur-[1px]">
        <div class="flex items-center space-x-6">
          <div class="w-8 h-8 opacity-75">
            <svg fill="none" stroke="currentColor" class="w-full h-full text-blue-600 dark:text-blue-400" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              ${content.title}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">${content.description}</p>
          </div>
        </div>
      </div>
    </div>`,

    '970x250': `<div class="${baseClasses} relative group" style="background-image: url('${waveBg}'); background-position: center; background-repeat: no-repeat; background-size: cover;">
      <div class="relative p-8 flex items-center justify-between h-full backdrop-blur-[2px]">
        <div class="max-w-2xl">
          <div class="w-14 h-14 mb-6 opacity-75">
            <svg fill="none" stroke="currentColor" class="w-full h-full text-blue-600 dark:text-blue-400" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            ${content.title}
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-lg">${content.description}</p>
        </div>
      </div>
    </div>`
  };

  return templates[size as keyof typeof templates] || '';
};

const adContents: AdContent[] = [
  {
    title: 'Boost Your Ad Revenue',
    description: 'Try our premium advertising solution'
  },
  {
    title: 'Premium Ad Solutions',
    description: 'Maximize your revenue potential'
  },
  {
    title: 'Grow Your Business',
    description: 'Reach more customers today'
  },
  {
    title: 'Smart Advertising',
    description: 'Data-driven solutions for better results'
  }
];

let currentAdIndex = 0;
let adUpdateCallback: (() => void) | null = null;

// Set up rotation timer
if (typeof window !== 'undefined') {
  setInterval(() => {
    currentAdIndex = (currentAdIndex + 1) % adContents.length;
    if (adUpdateCallback) {
      adUpdateCallback();
    }
  }, 5000); // Rotate every 5 seconds
}

export const getFallbackAd = (size: string): { id: string; html: string; size: [number, number] } | null => {
  const sizes: Record<string, [number, number]> = {
    '300x250': [300, 250],
    '728x90': [728, 90],
    '970x250': [970, 250]
  };

  if (!sizes[size]) return null;

  const content = adContents[currentAdIndex];
  
  return {
    id: `house-ad-${size}-${currentAdIndex}`,
    html: createAdHTML(size, content),
    size: sizes[size]
  };
};

// Function to register callback for ad updates
export const onAdUpdate = (callback: () => void) => {
  adUpdateCallback = callback;
};