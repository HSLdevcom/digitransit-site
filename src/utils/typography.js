import Typography from 'typography';

const typography = new Typography({
  googleFonts: [{
    name: "Lato",
    styles: ["100", "300", "400", "700"]
  }],
  baseFontSize: '18px',
  baseLineHeight: '24px',
  bodyFontFamily: ['Lato','sans-serif'],
  headerFontFamily: ['Lato','sans-serif'],
  headerGray: 0,
  bodyGray: 0,
  bodyWeight: 300,
  headerWeight: 400,
  boldWeight: 700,
  modularScales: ['major third'],
  overrideStyles: ({ rhythm, scale }, options) => {
    return {
      blockquote: {
        background: `#f9f9f9`,
        borderLeft: `${rhythm(1 / 4)} solid #ccc`,
        marginLeft: 0,
        marginRight: rhythm(1),
        marginTop: rhythm(1),
        marginBottom: rhythm(1),
        paddingLeft: rhythm(2 / 4),
        paddingRight: rhythm(1 / 4),
        paddingTop: rhythm(1 / 4),
        paddingBottom: rhythm(1 / 4),
      }
    }
  }
})

export default typography
