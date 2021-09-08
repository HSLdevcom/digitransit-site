import Typography from 'typography';

const typography = new Typography({
  googleFonts: [{
    name: "Roboto",
    styles: ["400", "700"]
  }],
  baseFontSize: '18px',
  baseLineHeight: '24px',
  bodyFontFamily: ['Roboto','sans-serif'],
  headerFontFamily: ['Roboto','sans-serif'],
  headerGray: 0,
  bodyGray: 0,
  bodyWeight: 400,
  headerWeight: 700,
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
