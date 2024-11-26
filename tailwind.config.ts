import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 1s ease-out',
        slideInRight: 'slideInRight 1s ease-out',
      },
    },screens: {
      'below-1319': {'max': '1318px'},
      'below-1265': {'max': '1265px'},
      'below-1025': {'max': '1025px'},
      'below-1000': {'max': '1000px'},
      'below-900': {'max': '899px'},
      'below-925': {'max': '925px'},
      'below-868': {'max': '868px'},
      'below-835': {'max': '835px'},
      'below-700': {'max': '805px'},
      'below-730': {'max': '730px'},
      'below-695': {'max': '695px'},
      'below-600': {'max': '600px'},
      'below-590': {'max': '590px'},
      'below-566': {'max': '566px'},
      'below-500': {'max': '500px'},
      'below-445': {'max': '445px'},
      'below-426': {'max': '426px'},
      'below-460': {'max': '460px'},
      'below-400': {'max': '400px'},
      'below-378': {'max': '378px'},
      'below-370': {'max': '370px'},
      'below-321': {'max': '321px'},
    },
    
  },
  plugins: [],
} satisfies Config;
