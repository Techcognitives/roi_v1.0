var isNotEnter = false
var weeksForYear = 48
var weeksForYearTab2 = 48
var element = $("#pdf"); // global variable
var getCanvas; // global variable
var annualProfit1 = 54780;
var annualProfit2 = 863820;
var annualSubscription1 = 4500;
var annualSubscription2 = 4500;
var monthlySFC = 375


$('#export-pdf').click(function () {

  html2canvas(element, {
    onrendered: function (canvas) {
           getCanvas = canvas;
           var imgageData = getCanvas.toDataURL("image/png");
           // Now browser starts downloading it instead of just showing it
           //var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
           //$("#export-pdf").attr("download", "your_pic_name.png").attr("href", newData);

           var imgData = canvas.toDataURL("image/jpeg", 1.0);

           var pdf = new jsPDF("landscape");

           const imgProps= pdf.getImageProperties(imgData);
           const pdfWidth = pdf.internal.pageSize.getWidth();
           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
           pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

          pdf.save("ROI Calculator - Cash Pay Model.pdf.pdf");
        }
    });
});


function Download() {
  const doc = new jsPDF();

  const specialElementHandlers = {
    '#pdf': function (element, renderer) {
      return true;
    }
  };

  const content = this.downloadPanelContent.nativeElement;

  doc.fromHTML(content.innerHTML, 0, 0, {
    'width': 100, // max width of content on PDF
    'elementHandlers': specialElementHandlers
  },
    function (bla) { doc.save('saveInCallback.pdf'); },
    0);
}

function calculateRoi(){
  
  var hearingAW = $("#hearingAW").val()
  var hearingAAC = $("#hearingAAC").val()
  var incrementalRFPCA = $("#incrementalRFPCA").val().replace(/[^\d]/g,'')


  var cheeckCAW1 = $("#cheeckCAW1").val()
  var checkCleanAAC = $("#checkCleanAAC").val()
  var incrementalRFPCA2 = $("#incrementalRFPCA2").val().replace(/[^\d]/g,'')


  //$('#row_1_1').text(hearingAW)
  //$('#row_1_2').text(hearingAAC+"%")
  //$('#row_1_4').text("$"+incrementalRFPCA)
  var cognivueAW = hearingAW*hearingAAC/100
  //$( "#row_1_3" ).text(cognivueAW)

  var total1=cognivueAW*incrementalRFPCA
  //$( "#row_1_5" ).text("$"+Math.round(total1))





 // $('#row_2_1').text(cheeckCAW1)
  //$('#row_2_2').text(checkCleanAAC+"%")
  $//('#row_2_4').text("$"+incrementalRFPCA2)

  var caw = cheeckCAW1*checkCleanAAC/100
  //$( "#row_2_3" ).text(caw)
  var total2 = caw*incrementalRFPCA2

  //$( "#row_2_5" ).text("$"+Math.round(total2))


   var roiircw = total1+total2
  // $("#row_3_1").text("$"+Math.round(roiircw))
   var incrementRYear= roiircw*weeksForYear/12
   $("#row_3_5").text("$"+Math.round(incrementRYear))

   var annualRevenue= roiircw*weeksForYear;
   $("#roi_total").text("$"+Math.round(annualRevenue))

  // var annualSubScription= monthlySFC*12

  // $("#row_3_4").text("$"+Math.round(annualSubScription))
   var annualProfit= incrementRYear-monthlySFC;

   $("#tab2_row_3_5_2").text("$"+Math.round(annualProfit));


   var annualSubscriptionFeeforCognivue = monthlySFC*12

   var annualNetRevenueDerivedfromCScreening = annualRevenue-annualSubscriptionFeeforCognivue
   $("#tab2_roi_total_2").text("$"+Math.round(annualNetRevenueDerivedfromCScreening))


  // $("#row_3_5").text("$"+Math.round(annualProfit))

  // $("#roi_total").text(Math.round(annualProfit/annualSubScription*100)+"%")

  // annualProfit1 =annualProfit
  // annualSubscription2=annualSubScription
  // var ap = annualProfit2+annualProfit1;
  // var as = annualSubscription1+annualSubscription2
  // $("#tab2_row_3_5_2").text("$"+Math.round(ap))
  // $("#tab2_roi_total_2").text(Math.round(ap/as*100)+"%")

  $("#row_1_4").digits();
  $("#row_1_5").digits();

  $("#row_2_4").digits();
  $("#row_2_5").digits();
  // $("#row_3_1").digits();
  // $("#row_3_2").digits();
  // $("#row_3_3").digits();
  // $("#row_3_4").digits();
   $("#row_3_5").digits();
   $("#roi_total").digits();
   $("#tab2_row_3_5_2").digits();
   
  $("#tab2_roi_total_2").digits();

  
}


$.fn.digits = function(){ 
  return this.each(function(){ 
      $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
  })
}

$( "#hearingAW" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");

  isNotEnter=true
  calculateRoi()
});
$( "#hearingAAC" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage1").removeClass("gray-color");
  $("#percentage1").addClass("black-color");
  isNotEnter=true
  calculateRoi()
});
$( "#incrementalRFPCA" ).keyup(function() {
  
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  isNotEnter=true
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoi()
  
});


$( "#cheeckCAW1" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  isNotEnter=true
  calculateRoi()
});
$( "#checkCleanAAC" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage2").removeClass("gray-color");
  $("#percentage2").addClass("black-color");
  isNotEnter=true
  calculateRoi()
});
$( "#incrementalRFPCA2" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  isNotEnter=true
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoi()
});

$( "#weeksForYear" ).keyup(function() {
  weeksForYear = $(this).val()
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  calculateRoi()
});
function isEmpty(property) {
  return (property === null || property === "" || typeof property === "undefined");
}


$("#tab1 span").click(function() {
  $(this).addClass("tab_select")
  $(this).removeClass("tab_unselect")
  $("#tab2 span").removeClass("tab_select")
  $("#tab2 span").addClass("tab_unselect")
  $("#conversion_asp_model").hide()
  $("#cash_pay_model").show()
  
  
});

$("#tab2 span").click(function() {
  $(this).addClass("tab_select")
  $(this).removeClass("tab_unselect")
  $("#tab1 span").removeClass("tab_select")
  $("#tab1 span").addClass("tab_unselect")

  $("#conversion_asp_model").show()
  $("#cash_pay_model").hide()
  $(".asp-model-summary .asp-model-1").hide()
  $(".asp-model-summary .asp-model-2").show()

  $(".total-financial-summary .total_financial_1").hide()
  $(".total-financial-summary .total_financial_2").show()
  $(".equal").css('visibility', 'visible');
  $(".plus").css('visibility', 'visible');

  
});

$("#next_tab").click(function() {
  $("#tab2 span").addClass("tab_select")
  $("#tab2 span").removeClass("tab_unselect")
  $("#tab1 span").removeClass("tab_select")
  $("#tab1 span").addClass("tab_unselect")

  $("#conversion_asp_model").show()
  $("#cash_pay_model").hide()
  
  $(".asp-model-summary .asp-model-1").hide()
  $(".asp-model-summary .asp-model-2").show()

  
  $(".total-financial-summary .total_financial_1").hide()
  $(".total-financial-summary .total_financial_2").show()
  $(".equal").css('visibility', 'visible');
  $(".plus").css('visibility', 'visible');
});

$( "#hearingAW" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");

  isNotEnter=true
  calculateRoi()
});
$( "#hearingAAC" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage1").removeClass("gray-color");
  $("#percentage1").addClass("black-color");
  isNotEnter=true
  calculateRoi()
});
$( "#incrementalRFPCA" ).keyup(function() {
  
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  isNotEnter=true
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoi()
  

});


$( "#tab2_row_0_0" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  calculateRoiAsp()
});
$( "#tab2_row_0_1" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  calculateRoiAsp()
});
$( "#tab2_row_1_0" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage1_tab2").removeClass("gray-color");
  $("#percentage1_tab2").addClass("black-color");
  calculateRoiAsp()
});
$( "#tab2_row_1_1" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage2_tab2").removeClass("gray-color");
  $("#percentage2_tab2").addClass("black-color");
  calculateRoiAsp()
});


$( "#tab2_row_3_0" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoiAsp()
});
$( "#tab2_row_3_1" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoiAsp()
});

$( "#tab2_weeksForYear" ).keyup(function() {
  weeksForYearTab2 = $(this).val()
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  calculateRoiAsp()
});

function calculateRoiAsp(){
  var tab2_row_0_0 = $("#tab2_row_0_0").val()
  var tab2_row_0_1 = $("#tab2_row_0_1").val()
  var tab2_row_1_0 = $("#tab2_row_1_0").val()
  var tab2_row_1_1 = $("#tab2_row_1_1").val()
  var tab2_row_3_0 = $("#tab2_row_3_0").val().replace(/[^\d]/g,'')
  var tab2_row_3_1 = $("#tab2_row_3_1").val().replace(/[^\d]/g,'')


  var cognivueAW = tab2_row_1_0*tab2_row_0_0/100
  $( "#tab2_row_2_0" ).text(cognivueAW.toFixed(1))


  var total1=cognivueAW*tab2_row_3_0
  $( "#tab2_row_4_0" ).text("$"+Math.round(total1))



  var caw = tab2_row_1_1*tab2_row_0_1/100
  $( "#tab2_row_2_1" ).text(caw.toFixed(1))

  var total2 = caw*tab2_row_3_1
  $( "#tab2_row_4_1" ).text("$"+Math.round(total2))






  var incrementRYear1= total1*weeksForYearTab2
  $("#tab2_row_5_0").text("$"+Math.round(incrementRYear1))

  
  var incrementRYear2= total2*weeksForYearTab2
  $("#tab2_row_5_1").text("$"+Math.round(incrementRYear2))


  var total= incrementRYear2-incrementRYear1;
  $("#tab2_total_row_1").text("$"+total);

  var monthlySFC = 375
  var annualSubScription= monthlySFC*12

  $("#tab2_row_3_2").text("$"+Math.round(annualSubScription))
   var annualProfit= total-annualSubScription

   $("#tab2_row_3_5").text("$"+Math.round(annualProfit))

   $("#tab2_roi_total").text(Math.round(annualProfit/annualSubScription*100)+"%")






   annualProfit2 =annualProfit
   annualSubscription2=annualSubScription
   var ap = annualProfit2+annualProfit1;
   var as = annualSubscription1+annualSubscription2
   $("#tab2_row_3_5_2").text("$"+Math.round(ap))

  
   $("#tab2_roi_total_2").text(Math.round(ap/as*100)+"%")


   var per1 =tab2_row_1_1/tab2_row_1_0-1
   $("#right_row1").text(Math.round(per1*100))

   var per2 =caw/cognivueAW-1
   $("#right_row2").text(Math.round(per2*100))

   var per3 =total2/total1-1
   $("#right_row3").text(Math.round(per3*100))



  $("#tab2_row_3_0").digits();
  $("#tab2_row_3_1").digits();

  $("#tab2_row_4_0").digits();
  $("#tab2_row_4_1").digits();
  $("#tab2_row_5_0").digits();
  $("#tab2_row_5_1").digits();
  $("#tab2_total_row_1").digits();
  $("#tab2_row_3_2").digits();
  $("#tab2_row_3_1").digits();
  $("#tab2_row_3_5").digits();
  $("#tab2_row_3_5_2").digits();


}
