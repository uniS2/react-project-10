/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: { suit: ['SUIT Variable'] },
      colors: {
        transparent: 'transparent',
        primary: '#4EC3F9',
        secondary: '#C9ECFF',
        contentsPrimary: '#152644',
        contentsSecondary: '#5A80A9',
        error: '#F97660',
        point: '#50D4E5',
        'gray-1': '#828282',
        'gray-2': '#B2B2B2',
        background: '#FAFAFA',
        'gray-3': '#D7D7D7',
        'custom-color': 'rgba(79,212,230,0.5)',
      },
      backgroundImage: (theme) => ({
        LandingCarouselOne: "url('./src/assets/LandingPage-carousel-one.svg')",
        LandingCarouselTwo: "url('./src/assets/LandingPage-carousel-two.svg')",
        LandingCarouselThree:
          "url('./src/assets/LandingPage-carousel-three.svg')",
        LandingCarouselFour:
          "url('./src/assets/LandingPage-carousel-four.svg')",
        LandingCarouselFive:
          "url('./src/assets/LandingPage-carousel-five.svg')",
        LandingCarouselSix: "url('./src/assets/LandingPage-carousel-six.svg')",
      }),
      screens: {
        smd: '530px',
        xs: '529px',
      },
    },
  },
  plugins: [],
};
