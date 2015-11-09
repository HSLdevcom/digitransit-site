import Typography from 'typography';

export default new Typography({
  googleFonts: [{
    name: "Lato",
    styles: ["100", "300", "400", "700"]
  }],
  baseFontSize: '18px',
  baseLineHeight: '24px',
  bodyFontFamily: 'Lato, sans-serif',
  headerFontFamily: 'Lato, sans-serif',
  headerGray: 0,
  bodyGray: 0,
  bodyWeight: 300,
  headerWeight: 400,
  boldWeight: 700,
  modularScales: ['major third']
})
