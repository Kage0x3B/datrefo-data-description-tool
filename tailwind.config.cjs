const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {}
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: [
            'emerald',
            {
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
