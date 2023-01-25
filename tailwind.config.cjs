const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {}
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    darkMode: ['class', '[data-theme="emeraldDark"]'],
    daisyui: {
        themes: [
            {
                emerald: {
                    ...require('daisyui/src/colors/themes')['[data-theme=emerald]'],
                    '--animation-btn': '0.25s',
                    '--animation-input': '.2s',
                    '--btn-focus-scale': '0.95'
                },
                emeraldDark: {
                    'color-scheme': 'dark',
                    primary: '#66cc8a',
                    secondary: '#377cfb',
                    accent: '#ea5234',
                    neutral: '#23282E',
                    'base-100': '#202020'
                }
            }
        ],
        darkTheme: 'emeraldDark'
    }
};

module.exports = config;
