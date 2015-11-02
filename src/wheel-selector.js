// $(document).ready(function() {
//   var wheel_selector_data = {
//   };
//   wheel_selector_data.scrollable_height = $('#wheel-selector').height();
//   wheel_selector_data.block_height = $('#wheel-selector > ul > li:first').height();
//   var middle_element = Math.round(wheel_selector_data.scrollable_height / wheel_selector_data.block_height / 2);
//   wheel_selector_data.current_active = $($('#wheel-selector > ul > li')[middle_element - 1]);
//   wheel_selector_data.current_active.addClass('wheel_active');
//   var lastScrollTop = 0;
//   $('#wheel-selector').scroll(function() {
//     var st = $(this).scrollTop();
//     console.log(Math.abs(st - lastScrollTop));
//     if (Math.abs(st - lastScrollTop) >= ((wheel_selector_data.block_height)/20)){
//       if (st > lastScrollTop){
//         $(this).animate({
//              scrollTop: 0
//          }, 50, function(){
//            $('#wheel-selector > ul > li:first').clone().appendTo('#wheel-selector > ul');
//            $('#wheel-selector > ul > li:first').remove();
//            wheel_selector_data.current_active.removeClass('wheel_active');
//            wheel_selector_data.current_active = wheel_selector_data.current_active.next();
//            wheel_selector_data.current_active.addClass('wheel_active');
//          });
//        }
//       lastScrollTop = st;
//     }
//   });
// });
$.fn.wheelSelector = function(options){
  this.css({overflow: 'scroll', height: options.height});
  var generateTemplate = function(){
    var html = "<ul class = 'wheel-selector-list'>";
    for(var i = 0, l = options.data.length; i < l; i++){
      html += "<li class = 'wheel-selector-list-item' data-wheelSelected = '" + options.data[i].value + "'>" + options.data[i].title + "</li>";
    }
    html += "</ul>";
    return html;
  };
  this.html(generateTemplate());
  var wheel_selector_data = {};
  wheel_selector_data.scrollable_height = $(this).height();
  wheel_selector_data.block_height = $('.wheel-selector-list > li:first').height();
  var middle_element = Math.round(wheel_selector_data.scrollable_height / wheel_selector_data.block_height / 2);
  wheel_selector_data.current_active = $($('.wheel-selector-list > li')[middle_element - 1]);
  wheel_selector_data.current_active.addClass('wheel_active');
  var lastScrollTop = 0;
  $(this).scroll(function() {
    var st = $(this).scrollTop();
    if (Math.abs(st - lastScrollTop) >= ((wheel_selector_data.block_height)/20)){
      if (st > lastScrollTop){
        $(this).animate({
             scrollTop: 0
         }, 50, function(){
           $('.wheel-selector-list > li:first').clone().appendTo('.wheel-selector-list');
           $('.wheel-selector-list > li:first').remove();
           wheel_selector_data.current_active.removeClass('wheel_active');
           wheel_selector_data.current_active = wheel_selector_data.current_active.next();
           wheel_selector_data.current_active.addClass('wheel_active');
         });
       }
      lastScrollTop = st;
    }
  });
  return {
    getActiveElement: function(){
      return wheel_selector_data.current_active
    },
    getCurrentValue: function(){
      return wheel_selector_data.current_active.attr('data-wheelSelected');
    },
    getCurrentTitle: function(){
      return wheel_selector_data.current_active.text();
    },
    getItems: function(){
      return main_wheel_element.find('.wheel-selector-list-item'); 
    }
  }
};