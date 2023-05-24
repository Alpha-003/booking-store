/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./ComponentsShared/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#e6b42d',
      },
      animation: {
        text: 'text 5s ease infinite',
        'spinSlow': 'spin 4s ease-in-out infinite',
        'bounceSlow': 'bounce 4s ease-in-out 4',
        'FlyAnim': 'Fly 4s ease-in-out infinite',
        "FlyInAnim": "FlyIn 4s ease-in-out 1",
        "FlyAnimSlow1": "Fly 5s ease-in-out infinite",
        "FlyAnimSlow2": "Fly 6s ease-in-out 1",
        "LeftRightAnim": "RotateLeftRightAnime 6s ease-in-out infinite",
        "FlyInRightAnim": "FlyInRight 2s ease-in-out 1",
        "FlyInLeftAnim": "FlyInLeft 1s ease-in-out 1,",
        "DownZoomAnim": "DownZoom 6s ease-in-out 2",
        FlyAnimSlowSlow: "FlySlow1 2s ease-in-out infinite",
      },
      keyframes: {

        DownZoom: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-40px)', transform: "scale(0.5)" },
          "55%": { transform: 'translateX(-20px)' },
          "60%": { transform: 'translateX(20px)', transform: "scale(0.8)" },
          '100%': { transform: 'translateY(0px)', transform: "translateX(0px)", transform: "scale(1)" },

        },
        Fly: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        FlySlow1: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
          "100%": { transform: 'translateY(0px)' },
        },
        FlyOutRightAndDisapear: {
          '0%': { transform: 'translateX(0%)', opacity: 1 },
          '50%': { transform: 'translateX(100%)', opacity: 0.5 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },

        FlyIn: {
          //at 0 the element doesnt apear as it is at the right of the screen and it is rotated  73 degree and then it goes to the left and it is rotated -73 degree and then translate up and down 20px
          //AFter that it goes to the left and it is rotated -10 degree and then it goes to the right and it is rotated 10 degree forever
          '0%': { transform: 'translateX(100%) rotate(73deg)' },
          '50%': { transform: 'translateX(-10%) rotate(-10deg)' },
          '100%': { transform: 'translateX(0%) rotate(0deg)', },
        },
        RotateLeftRightAnime: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        FlyInRight: {
          '0%': { transform: 'translateX(100%) ' },
          '50%': { transform: 'translateX(-10%) ' },
          '100%': { transform: 'translateX(0%) ' },
        },
        FlyInLeft: {
          '0%': { transform: 'translateX(-100%) ' },
          '50%': { transform: 'translateX(10%) ' },
          '100%': { transform: 'translateX(0%) ' },
        },
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
}
