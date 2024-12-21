const { default: daisyui } = require('daisyui');

module.exports = {
  content: [
    './src/*.{html,js,ejs}',
    './views/*.{html,js,ejs}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        Cherry: {
          "base-100": "oklch(98% 0 0)",
          "base-200": "oklch(96% 0.015 12.422)",
          "base-300": "oklch(94% 0.03 12.58)",
          "base-content": "oklch(45% 0.188 13.697)",
          "primary": "oklch(51% 0.222 16.935)",
          "primary-content": "oklch(98% 0 0)",
          "secondary": "oklch(39.58% 0.1331 25.72)",
          "secondary-content": "oklch(98% 0 0)",
          "accent": "oklch(85% 0.138 181.071)",
          "accent-content": "oklch(38% 0.063 188.416)",
          "neutral": "oklch(14% 0.005 285.823)",
          "neutral-content": "oklch(92% 0.004 286.32)",
          "info": "oklch(82% 0.111 230.318)",
          "info-content": "oklch(39% 0.09 240.876)",
          "success": "oklch(84% 0.143 164.978)",
          "success-content": "oklch(37% 0.077 168.94)",
          "warning": "oklch(82% 0.189 84.429)",
          "warning-content": "oklch(41% 0.112 45.904)",
          "error": "oklch(71% 0.194 13.428)",
          "error-content": "oklch(27% 0.105 12.094)",
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "1rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1rem", // border radius rounded-badge utility class, used in badges and similar

        }
      }
    ]
  }
};