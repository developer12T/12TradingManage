<template>
  <div id="app"></div>
</template>

<script>
import pdfMake from 'pdfmake'
// import  pdfFonts  from '../../assets/custom-fonts.js'
export default {
  name: 'App',
  mounted() {
    this.export()
  },
  methods: {
    export () {
      pdfMake.vfs = pdfFonts.pdfMake.vfs 
      pdfMake.fonts = {
     
        Roboto: {
          normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        },
       
        // Kanit: { 
        //   normal: 'Kanit-Regular.ttf',
        //   bold: 'Kanit-Medium.ttf',
        //   italics: 'Kanit-Italic.ttf',
        //   bolditalics: 'Kanit-MediumItalic.ttf'          
        // }
      }
      const docDefinition = {
        content: [
          'English',
          'ไทย'
        ],
        defaultStyle: { // 4. default style 'KANIT' font to test
          font: 'Roboto'
        }
      }
      pdfMake.createPdf(docDefinition).open({}, window)
    }
  }
}
</script>