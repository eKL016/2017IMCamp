AOS.init({
    duration: 1200,
});
//loader
var loading;
function myLoading() {
    loading = setTimeout(showPage, 0);
    // $("#loading").fadeOut(1000);
    // $("#loaderBack").fadeOut();
    // $("#myDiv").show();
}

function showPage() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("loaderBack").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
  AOS.init({
    duration: 1200,
  });
  // document.getElementById("myDiv").style.animation = "showPage .8s";
}
//相片畫廊
$('.myGallery img').on('click', function(e) {
  e.preventDefault();
  var id = $(this).attr('data-id');
  var img = $(this).attr('src');
  $('body').append('<div class="activePhoto"><img src="' + img + '" /><span class="closePhoto""><i class="fa fa-times-circle" aria-hidden="true"></i></span></div>');
});
$('body').on('click','.closePhoto',function() {
  $('.activePhoto').addClass('inactivePhoto');
  $('.activePhoto').remove();
});

// 立即報名的按鈕 -> 報名頁面
$("#myBtnRegister").on('click',function(){
  location.href = "register.html";
});

// navbar & JSON
$(document).ready(function() {
    // hide .navbar first
  $(".navbar").hide();
  $("#myTop").hide();
  // fade in .navbar
  $(function() {
    $(window).scroll(function() {
        // set distance user needs to scroll before we start fadeIn
        var position = screen.height * 0.75;
        var height = screen.height;
        if ($(this).scrollTop() > position) {
            $('.navbar').fadeIn();
            $('#myTop').fadeIn();
        } else {
            $('.navbar').fadeOut();
            $('#myTop').fadeOut();
        }
    });
  });
});

//Sample dates
var dates = ["3/15/2017", "5/15/2017", "5/22/2017", "5/31/2017", "7/3/2017"];
//For the purpose of stringifying MM/DD/YYYY date format
var monthSpan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var content = [
"<span class='timeTitle'>開放報名(文字說明一)</span>",
"<span class='timeTitle'>報名截止(文字說明二)</span>",
"<span class='timeTitle'>公布正式名單，開始收費(文字說明三)</span><br><ul><li>正式名單將公布於粉專<br></li><li>同時間籌備團隊會將匯款資料寄至錄取者信箱,請於5/18(三) 下午15:00 前完成匯款動作 並將「姓名」、「電話」、「匯款時間」及「匯款帳號後五碼」 寄至：ibmcamp@gmail.com<br>隔天收到匯款確認回信後，便完成整個報名動作<br></li><li>若您以現金匯款並無匯款帳號，請來信告知您的匯款時間以便工作人員核對。若您非以本人姓名匯款，請告知幫您匯款的匯款人姓名，並請盡量用您的名字匯款。<br></li><li>收到匯款後，籌備團隊將會回信，請再三確認有收到回信（注意：若匯款後7天內未收到匯款確認回信，請私訊粉專）<br></li><li>未於期限內繳費的學員將喪失錄取資格！若有不可抗之因素未能在期限內匯款，請事先通知。</li></ul>",
"<span class='timeTitle'>正取收費截止(文字說明四)</span><br><ul><li>籌備團隊將視缺額數量，依照學員備取順序，以電子郵件與電話通知遞補學員，並同時將遞補訊息公告。<br></li><li>備取學員自接獲遞補通知後，請於2天內進行匯款，並將「姓名」、「電話」、「帳號後五碼」、「匯款時間」寄至ibmcamp@gmail.com<br></li><li>未於期限內匯款者，視同放棄<br></li><li>遞補事宜將持續進行至06/26(日) 為止。期間若有錄取學員退出，即會依備取順序，以電子信箱及電話告知遞補學員，並將於05/29 (日)、06/12(日)、06/26(日) 更新。</li></ul>",
"<span class='timeTitle'>資管營開始!(文字說明五)</span>"];
//Format MM/DD/YYYY into string
function dateSpan(date) {
  var month = date.split('/')[0];
  month = monthSpan[month - 1];
  var day = date.split('/')[1];
  if (day.charAt(0) == '0') {
    day = day.charAt(1);
  }
  var year = date.split('/')[2];

  //Spit it out!
  return month + " " + day + ", " + year;
}

//Main function. Draw your circles.
function makeCircles() {
  //Forget the timeline if there's only one date. Who needs it!?
  if (dates.length < 2) {
    $("#line").hide();
    $("#span").show().text(content[0]);
    //This is what you really want.
  } else if (dates.length >= 2) {
    //Set day, month and year variables for the math
    var first = dates[0];
    var last = dates[dates.length - 1];

    var firstMonth = parseInt(first.split('/')[0]);
    var firstDay = parseInt(first.split('/')[1]);

    var lastMonth = parseInt(last.split('/')[0]);
    var lastDay = parseInt(last.split('/')[1]);

    //Integer representation of the last day. The first day is represnted as 0
    var lastInt = ((lastMonth - firstMonth) * 30) + (lastDay - firstDay);

    //Draw first date circle
    $("#line").append('<div class="circle" id="circle0" style="left: ' + 0 + '%;"><div class="popupSpan">' + dateSpan(dates[0]) + '</div></div>');

    $("#mainCont").append('<span id="span0" class="center">' + content[0] + '</span>');

    //Loop through middle dates
    for (i = 1; i < dates.length - 1; i++) {
      var thisMonth = parseInt(dates[i].split('/')[0]);
      var thisDay = parseInt(dates[i].split('/')[1]);

      //Integer representation of the date
      var thisInt = ((thisMonth - firstMonth) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dateSpan(dates[i]) + '</div></div>');

      $("#mainCont").append('<span id="span' + i + '" class="right">' + content[i] + '</span>');
    }

    //Draw the last date circle
    $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dateSpan(dates[dates.length - 1]) + '</div></div>');

    $("#mainCont").append('<span id="span' + i + '" class="right">' + content[i] + '</span>');
  }

  $(".circle:first").addClass("active");
}

makeCircles();

$(".circle").mouseenter(function() {
  $(this).addClass("hover");
});

$(".circle").mouseleave(function() {
  $(this).removeClass("hover");
});

$(".circle").click(function() {
  var spanNum = $(this).attr("id");
  selectDate(spanNum);
});

function selectDate(selector) {
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle", "span");
  var current = $selector.replace("circle", "");

  $(".active").removeClass("active");
  $($selector).addClass("active");

  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  };
};


// 按下首頁的"確認報名"後，跳出popup確認
$("#myBtnCheck").on('click', function(){
  $("#popupCheck").show();
  $("#popupCheck").addClass('activePopup');
});
// 按右上角的叉叉，popup關閉
$('body').on('click','.closePhoto', function() {
  $('#popupCheck').addClass('inactivePopup');
  $('#popupCheck').remove();
});
// 按下方的"Check"，會回傳報名狀況
$("#checkSubmit").on('click', function(){
  $("#popupCheck div").remove();
  $("#checkSubmit").hide();
  // if(報名成功)
    $("#popupCheck").append("<div style='color:black'>報名成功</div>");
  // else //尚未報名或失敗
    // $("#popupCheck").append("<div style='color:black'>尚未報名</div>");
});