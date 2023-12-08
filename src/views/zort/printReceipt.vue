<template>
  <div id="app"></div>
</template>

<script>
import {computed, onMounted, ref} from 'vue';
import pdfMake from 'pdfmake';
import pdfFonts from '../../assets/custom-fonts';
import axios from "axios";
import {useRoute} from "vue-router";

export default {
  name: 'App',
  setup() {
    const route = useRoute();

    const queryParam = computed(() => route.query.dataList || '');

    // const exportPdf = async () => {
    //
    //   const currentDate = new Date();
    //   const formattedDate = `${currentDate.getFullYear()}-${padNumber(
    //       currentDate.getMonth() + 1
    //   )}-${padNumber(currentDate.getDate())}`;
    //
    //   function padNumber(number) {
    //     return number.toString().padStart(2, '0');
    //   }
    //
    //   const idlist = ['124239971']
    //   const dataPrint = []
    //   for (let i = 0; i < idlist.length; i++) {
    //     const headData = ref(null);
    //     const bathtext = ref("");
    //     const tableData = ref([]);
    //     const token = JSON.parse(localStorage.getItem("token"));
    //     const response = await axios.post(
    //         "http://192.168.2.97:8383/zort/order/OrderManage/getDataPrintReceiptRepair",
    //         {
    //           "cutoff": "print",
    //           "list": `${idlist[i]}`
    //           // "action":"UpdateInvoiceOrder"
    //         },
    //         {
    //           headers: {Authorization: `Bearer ${token}`},
    //         }
    //     );
    //     var j = 0
    //     const orderList = response.data[0].orderDetailSuccessInsM3s
    //     for (let i = 0; i < orderList.length; i++) {
    //
    //       console.log('1.show :: ' + orderList[i].name)
    //       if (orderList[i].name === 'ค่าขนส่ง' || orderList[i].name == 'ส่วนลดราคาตามเงื่อนไข') {
    //         var shipAmout = orderList[i].totalprice + '.00'
    //       } else {
    //         var parts = orderList[i].sku.split("_")[1] // = 10010101050_PCS
    //         if (parts == 'PCS') {
    //           var wordAfterUnderscore = 'ชิ้น'
    //         } else if (parts == 'CTN') {
    //           var wordAfterUnderscore = 'หีบ'
    //         } else if (parts == 'BOT') {
    //           var wordAfterUnderscore = 'ขวด'
    //         } else if (parts == 'CRT') {
    //           var wordAfterUnderscore = 'กล่อง'
    //         } else if (parts == 'BAG') {
    //           var wordAfterUnderscore = 'ถุง'
    //         } else if (parts == 'PAC') {
    //           var wordAfterUnderscore = 'แพค'
    //         }
    //
    //         const data = {
    //           name: `${j+1}.` + orderList[i].name,
    //           number: orderList[i].number + ' ' + wordAfterUnderscore,
    //           pricepernumber: orderList[i].pricepernumber + '.00',
    //           totalprice: orderList[i].totalprice + '.00'
    //         }
    //         tableData.value.push(data)
    //         j = j+1
    //       }
    //     }
    //
    //     headData.value = response.data[0].invno
    //     console.log('headData 2 : ', tableData.value)
    //     const listNumrow = tableData.value.length;
    //
    //     if (response.data[0].statusprintinv === 'TaxInvoice') {
    //       var cusname = response.data[0].customer.customername
    //       var address = response.data[0].customer.customeraddress
    //     } else {
    //       if (response.data[0].saleschannel == 'Shopee') {
    //         var cusname = response.data[0].customer.customername
    //         var address = response.data[0].shippingAddress.shippingaddress
    //       } else {
    //         var cusname = 'ขายช่องทาง Lazada'
    //         var address = response.data[0].shippingAddress.shippingaddress
    //       }
    //     }
    //
    //     //แปลง เลข เป็น อักษร
    //     function convert(number) {
    //       const values = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
    //       const places = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
    //       const exceptions = {"หนึ่งสิบ": "สิบ", "สองสิบ": "ยี่สิบ", "สิบหนึ่ง": "สิบเอ็ด"};
    //
    //       let output = "";
    //
    //       for (let place = 0; place < number.length; place++) {
    //         const value = parseInt(number.charAt(place));
    //         const placeValue = places[number.length - place - 1];
    //
    //         if (value !== 0) {
    //           output += values[value] + placeValue;
    //         }
    //       }
    //       for (const search in exceptions) {
    //         const replace = exceptions[search];
    //         output = output.replace(search, replace);
    //       }
    //
    //       return output;
    //     }
    //
    //
    //     const amountValue = Math.abs(parseFloat(response.data[0].amount)).toFixed(2);
    //     const [integer, fraction] = amountValue.split(".");
    //     const baht = convert(integer);
    //     const satang = convert(fraction);
    //
    //     const output = response.data[0].amount.value < 0 ? "ลบ" : "";
    //     bathtext.value = output + (baht ? baht + "บาท" : "") + (satang ? satang + "สตางค์" : "ถ้วน");
    //
    //     var cusTax = response.data[0].customer.customeridnumber
    //     var vatt = parseFloat(response.data[0].amount).toFixed(2) - parseFloat(response.data[0].vatamount).toFixed(2)
    //     var vatt7 = parseFloat(response.data[0].vatamount).toFixed(2)
    //     var sumAmount = parseFloat(response.data[0].amount).toFixed(2)
    //     var orderRef = response.data[0].number
    //
    //
    //     if ((parseInt(response.data[0].amount) - response.data[0].discountamount) === 0) {
    //       var shipBath = '0.00'
    //       var disBath = '0.00'
    //     } else {
    //
    //       if (!shipAmout) {
    //         var shipBath = '0.00'
    //       } else {
    //         var shipBath = shipAmout
    //       }
    //       var disBath = parseFloat(response.data[0].discountamount).toFixed(2)
    //     }
    //
    //     console.log('test num orw:::::::' + listNumrow)
    //     if (listNumrow > 15) {
    //       var sizePages = ref(500)
    //       var width1 = ref(43)
    //       var width2 = ref(12)
    //       var width3 = ref(15)
    //       var width4 = ref(15)
    //       var sizeWidthPage = ref(110)
    //       var fSize = ref(4)
    //
    //     } else if (listNumrow > 7 && listNumrow < 14) {
    //       var sizeWidthPage = ref(95)
    //       var sizePages = ref(297)
    //       var width1 = ref(35)
    //       var width2 = ref(9)
    //       var width3 = ref(13)
    //       var width4 = ref(13)
    //       var fSize = ref(3)
    //     } else {
    //       var sizeWidthPage = ref(95)
    //       var sizePages = ref(297)
    //       var width1 = ref(25)
    //       var width2 = ref(15)
    //       var width3 = ref(15)
    //       var width4 = ref(15)
    //       var fSize = ref(4)
    //     }
    //
    //     var loopData = [
    //       {text: 'บริษัท วันทูเทรดดิ้ง จำกัด', style: 'header', alignment: 'center',},
    //       {text: '582/9 ซ. สุขุมวิท 63 ( เอกมัย ) ถ.สุขุมวิท แขวงคลองตันเหนือ', style: 'header', alignment: 'center',},
    //       {text: 'เขตวัฒนา กรุงเทพมหานคร 10110', style: 'header', alignment: 'center',},
    //       {text: 'โทร. (02)391-3200 โทร. (02)391-7895', style: 'header', alignment: 'center',},
    //       {text: 'เลขที่ผู้ประจำตัวผู้เสียภาษี 0105563063410', style: 'header', alignment: 'center',},
    //       {text: 'ออกใบกำกับภาษีโดยสำนักงานใหญ่', style: 'header', alignment: 'center',},
    //       {text: '( สำเนาบิลเงินสด/ใบกำกับภาษี )', style: 'header', alignment: 'center',},
    //       {
    //         table: {
    //           widths: ['*', '*'], // Divide the row into two equal columns
    //           body: [
    //             [
    //               {
    //                 text: `เลขที่ ${headData.value}`, // Left-aligned text
    //                 style: 'lineItem',
    //                 alignment: 'left',
    //               },
    //               {
    //                 text: `วันที่ ${formattedDate}`, // Right-aligned text
    //                 style: 'lineItem',
    //                 alignment: 'right',
    //               },
    //             ]
    //           ],
    //         },
    //         layout: 'noBorders',
    //       },
    //       {text: `ชื่อลูกค้า ${cusname}`, style: 'lineItem', alignment: 'left',},
    //       {
    //         text: `ที่อยู่ ${address}`,
    //         style: 'lineItem',
    //         alignment: 'left',
    //         pageBreak: 'auto',
    //       },
    //       {text: `เลขที่ประจำตัวผู้เสียภาษี ${cusTax}`, style: 'lineItem', alignment: 'left',},
    //       {text: ' ', style: 'header', alignment: 'left',},
    //       {
    //         table: {
    //           // widths: [width1.value, width2.value, width3.value, width4.value],
    //           widths: [43, 12, 15, 15],
    //           body: [
    //             [
    //               {text: 'รายการสินค้า', style: 'header', alignment: 'left',},
    //               {text: 'จำนวน', style: 'header', alignment: 'center',},
    //               {text: 'ราคา', style: 'header', alignment: 'right',},
    //               {text: 'รวม', style: 'header', alignment: 'right',},
    //             ],
    //             ...tableData.value.map(item => [
    //               {text: item.name, style: 'lineItem', alignment: 'left'},
    //               {text: item.number.toString(), style: 'lineItem', alignment: 'center'},
    //               {text: item.pricepernumber.toString(), style: 'lineItem', alignment: 'right'},
    //               {text: item.totalprice.toString(), style: 'lineItem', alignment: 'right'},
    //             ]),
    //           ],
    //         },
    //         layout: 'noBorders',
    //       },
    //       {
    //         alignment: 'justify',
    //         columns: [
    //           {text: 'ค่าขนส่ง', style: 'lineItem',},
    //           {text: `${shipBath}`, style: 'lineItem', alignment: 'right'}
    //         ]
    //       },
    //       {
    //         alignment: 'justify',
    //         columns: [
    //           {text: 'ส่วนลด', style: 'lineItem',},
    //           {text: `${disBath}`, style: 'lineItem', alignment: 'right'}
    //         ]
    //       },
    //       {
    //         alignment: 'justify',
    //         columns: [
    //           {text: 'ราคามูลค่าสินค้า ', style: 'lineItem',},
    //           {text: `${vatt}`, style: 'lineItem', alignment: 'right'}
    //         ]
    //       }, {
    //         alignment: 'justify',
    //         columns: [
    //           {text: 'ภาษีมูลค่าเพิ่ม 7%  ', style: 'lineItem',},
    //           {text: `${vatt7}`, style: 'lineItem', alignment: 'right'}
    //         ]
    //       },
    //       {
    //         alignment: 'justify',
    //         columns: [
    //           {text: 'จำนวนเงินรวมสุทธิ', style: 'header',},
    //           {text: `${sumAmount}`, style: 'header', alignment: 'right'}
    //         ]
    //       },
    //       {text: ' ', style: 'header', alignment: 'right'},
    //       {text: `(${bathtext.value})`, style: 'header', alignment: 'right'},
    //       {text: ' ', style: 'header', alignment: 'right'},
    //       {text: ' ', style: 'header', alignment: 'right'},
    //       {
    //         alignment: 'justify',
    //         columns: [
    //           {text: '   . . . . Sale Online . . . .', style: 'lineItem', alignment: 'center'},
    //           {text: '. . . . . . . . . . . . . .', style: 'lineItem', alignment: 'center'}
    //         ]
    //       },
    //       {text: ' ', style: 'header', alignment: 'left'},
    //       {text: `Order No. ${orderRef}`, style: 'lineItem', alignment: 'right', pageBreak: 'after'},
    //     ]
    //     dataPrint.push(loopData)
    //
    //
    //   }
    //
    //   const docDefinition = {
    //     info: {
    //       title: `ใบเสร็จเลขที่`,
    //       author: '12Trading',
    //       subject: 'ุสำเนาบิลเงินสด/ใบกำกับภาษี',
    //       keywords: `Order No`,
    //     },
    //     pageSize: {width: 110, height: 550},
    //     // pageSize: {width: sizeWidthPage.value, height: sizePages.value},
    //     pageOrientation: 'portrait',
    //
    //     // left , top, right, bottom
    //     pageMargins: [0, 0, 0, 10],
    //
    //     content: [
    //       dataPrint
    //     ],
    //     styles: {
    //       header: {fontSize: 4, bold: true,},
    //       lineItem: {fontSize: 4, bold: false,},
    //       leftText: {fontSize: 4,},
    //       // header: {fontSize: fSize.value, bold: true,},
    //       // lineItem: {fontSize: fSize.value, bold: false,},
    //       // leftText: {fontSize: fSize.value,},
    //       anotherStyle: {italics: true,},
    //     },
    //     defaultStyle: {font: 'Sarabun',},
    //   };
    //
    //   pdfMake.vfs = pdfFonts.pdfMake.vfs;
    //   pdfMake.fonts = {
    //     Roboto: {
    //       normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    //       bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    //       italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    //       bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
    //     },
    //
    //     Sarabun: {
    //       normal: 'Sarabun-Medium.ttf',
    //       bold: 'Sarabun-ExtraBold.ttf',
    //       italics: 'Sarabun-Italic.ttf',
    //       bolditalics: 'Sarabun-ExtraBoldItalic.ttf',
    //     },
    //   };
    //
    //   pdfMake.createPdf(docDefinition).open({}, window);
    // };

    onMounted(() => {
      // exportPdf();
    });

    console.log(queryParam.value)
    return {
      queryParam
    };
  },
};
</script>
