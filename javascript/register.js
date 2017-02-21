// // Custom method to validate username
$.validator.addMethod("usernameRegex", function(value, element) {
  return this.optional(element) || /^[a-zA-Z0-9]*$/i.test(value);
}, "Username must contain only letters, numbers");
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var form = $("#msform");
var exclamation = "<i class='fa fa-exclamation-triangle warning' aria-hidden='true'></i><span class='warning' style='font-family:Microsoft JhengHei'>";

var getReg = function(){
  var reg = $('#msform').serializeObject();
  console.table(reg.howToKnowUs);
  return reg;
};
$(".next").click(function(){
  form.validate({
    rules: {
      check:{required:true}, //radio
      username:{required:true},
      gender:{required:true}, //radio
      birthday:{required:true,date:true,dateISO:true},
      password:{required:true},
      bloodType:{required:true}, //radio
      school:{required:true},
      grade:{required:true}, //radio
      type:{required:true}, //radio
      vegan:{required:true}, //radio
      mSpecial:{required:true}, //radio
      mSpecialText:{required:'#mSpecial-yes:checked'},
      sSpecial:{required:true}, //radio
      sSpecialText:{required:'#sSpecial-yes:checked'},
      size:{required:true}, //radio
      tel:{required:true,digits:true},
      facebook:{required:true},
      email:{required:true,email:true},
      emergencyContact:{required:true},
      emergencyRel:{required:true},
      emergencyTel:{required:true,digits:true},
      selfIntro:{required:true,maxlength:180},
      mot:{required:true,maxlength:180},
      demand:{required:true,maxlength:180},
    },
    messages: {
      mSpecialText:{
        required: exclamation + "請詳述</span>"
      },
      sSpecialText:{
        required: exclamation + "請詳述</span>"
      },
      facebook:{
        required: exclamation + "此欄位為必填，若無請填'無'</span>"
      }
    },
    errorPlacement: function(error, element){
      error.appendTo( element.parents('.form-group') );
    }
  });
  if (form.valid() === true){
    // if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = (now * 50)+"%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({
          'transform': 'scale('+scale+')',
          'position': 'absolute'
        });
        next_fs.css({'left': left, 'opacity': opacity});
      },
      duration: 800,
      complete: function(){
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  }
});

// $('#previous').click(function(){
//   if(animating) return false;
//   animating = true;

//   current_fs = $(this).parent();
//   previous_fs = $(this).parent().prev();

//   //de-activate current step on progressbar
//   $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

//   //show the previous fieldset
//   previous_fs.show();
//   //hide the current fieldset with style
//   current_fs.animate({opacity: 0}, {
//     step: function(now, mx) {
//       //as the opacity of current_fs reduces to 0 - stored in "now"
//       //1. scale previous_fs from 80% to 100%
//       scale = 0.8 + (1 - now) * 0.2;
//       //2. take current_fs to the right(50%) - from 0%
//       left = ((1-now) * 50)+"%";
//       //3. increase opacity of previous_fs to 1 as it moves in
//       opacity = 1 - now;
//       current_fs.css({'left': left});
//       previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
//     },
//     duration: 800,
//     complete: function(){
//       current_fs.hide();
//       animating = false;
//     },
//     //this comes from the custom easing plugin
//     easing: 'easeInOutBack'
//   });
// });

// 用來修改預設的規則的錯誤文字;
jQuery.extend(jQuery.validator.messages, {
  required: exclamation + "此欄位必填</span>",
  remote: exclamation + "Please fix this field</span>",
  email: exclamation + "請輸入正確的 Email 信箱</span>",
  date: exclamation + "請輸入正確的日期</span>",
  dateISO: exclamation + "請輸入正確的日期格式</span>",
  number: exclamation + "本欄位請填入數字</span>",
  digits: exclamation + "本欄位請填入數字</span>",
  equalTo: exclamation + "請再次輸入相同的值</span>",
  maxlength: exclamation + "至多輸入 150 個字</span>",
  minlength: $.validator.format(exclamation + "至少輸入 {0} 個字</span>"),
  rangelength: $.validator.format(exclamation + "請輸入 {0} 到 {1} 個字</span>"),
  range: $.validator.format(exclamation + "請輸入 {0} 到 {1} 的數字</span>"),
  max: $.validator.format(exclamation + "請輸入小於等於 {0} 的值</span>"),
  min: $.validator.format(exclamation + "請輸入大於等於 {0} 的值</span>"),
  // notEqualsto:"此處請勿留白"
});


$(".submit").click(function(){
	//Submission starts from here.
  if(form.valid() === false){
    event.preventDefault();
    return false;
  }
	$.ajax({
		type: 'POST',
		url: './register',//到時候會變成正確的位置
		data: JSON.stringify(getReg()),
		contentType: "application/json",
		dataType: 'json',
    success: function(data,Textmsg){
      if(data.msg==="success"){
        $("#regpopup").fadeIn();
        $("#regpopup").addClass('activePopup');
      }
      else{
        return alert(data.msg[0].toString());
      };
    }
	});

	return false;
})

// 當點擊popup上的"OK!"按鈕，popup會關閉，並連結到首頁
$(document).on('click', "#regpopBtn", function() {
  location.href = "/";
});
