$(function() {
        // Tab组件
    $('div[tabAction]').each(function(index) {
        $this_action = $(this).attr('tabAction');
        $(this).find('.tab-trigger-item').bind($this_action,
        function() {
            //切换取消选中 add by lerence 2013-07-24
            if(!$(this).hasClass('tab-trigger-item-current'))
            {
                $('#ebank_type_tip').html('');
                $('.tab-cnt input[type=radio]').attr('checked',false);
            }
            $(this).addClass('tab-trigger-item-current').siblings().removeClass('tab-trigger-item-current').parents('.tab-trigger').siblings('.tab-cnt').children('.tab-cnt-item').removeClass('tab-cnt-item-current').end().children('.tab-cnt-item:eq(' + $(this).parent().children().index($(this)) + ')').addClass('tab-cnt-item-current');
        });
    });
        //第一个tab加载图片
    $(".tab-trigger-item-current").find('img').each(function(){
        var src =$(this).attr('lazy-src');
        if (src){
            $(this).attr("src",src).removeAttr("lazy-src");
        }
    });
        // Menu组件
    if ($.browser.msie && ($.browser.version == '6.0') && !$.support.style){
        $('.menu').hover(
        function(){
            $(this).addClass('menu-hover')
        
        }
        ,
        function(){
            $(this).removeClass('menu-hover')
        
        });
    }
    
    $('.tab-cnt input[type=radio]').click(function(){
        $('#ebank_type_tip').html('');
    });

    //public sitenav/nav/footer

    /* 通栏-商品导航 */
    $("#sitenav .q-product .menu-bd dl").each(function(index){
          if((index+1) %5 == 0){
            $(this).after('<div class="clear"></div>')
        }
    });
   
   if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
        $("#nav .nav-category dl").hover(
        function(){
            $(this).addClass("hover")
        
        }
        ,
        function(){
            $(this).removeClass("hover")
        
        });
    }

    $('#footer .more').bind("click",function(){
        $(this).parent().nextAll().toggleClass('hide');
        $(this).toggleClass("more_hide");
    }
    );

});
/**
 * 功能说明：图片延迟加载
 * 使用方法：把页面上需要延时加载的图片src改成为lazy_src
 * @param option 可指定页面对象区域和预加载区域
 * @return
 */
function lazyload(option){
  var settings={
    defObj:$(document),
    defHeight:-400
  };
  settings=$.extend(settings,option||{});
  var defHeight=settings.defHeight,defObj=(typeof settings.defObj=="object")?settings.defObj.find("img"):$(settings.defObj).find("img");
  var pageTop=function(){
    return document.documentElement.clientHeight+Math.max(document.documentElement.scrollTop,document.body.scrollTop)-settings.defHeight;
  };
  var imgLoad=function(){
    defObj.each(function(){
      if ($(this).offset().top<=pageTop()){
        //记录展示量 add by puwei 2013-12-09
        var lazy_ishow=    $(this).parent().parent('.pic').attr("data-ishow");        
        if(lazy_ishow == 'false')
            {
            var goods_id=$(this).parent().parent('.pic').attr("data-goodsid");
            var time = Math.round(new Date().getTime() / 1000);
            $(this).parent().parent('.pic').attr("data-ishow","true");
            var url = owa_baseUrl+"access.txt?type=2&id="+goods_id+"&time="+time;
            $.ajax({
                url:url,
                type:'get',
                dataType:'jsonp'
            });
            }        
        //记录展示量结束
        var lazy_src=$(this).attr("lazy_src");
        if (lazy_src){
            $(this).attr("src",lazy_src).removeAttr("lazy_src");            
                //加载出错时，自动加载空图片 added by Joven
                $(this).bind('error', function(){
                    if($(this).attr('src').indexOf('amos.alicdn.com') > -1){
                        $(this).attr('src', STATIC_URL + '/themes/store/default/styles/images/T1tm9.XdRnXXaHNz_X-16-16.gif');
                    }else if($(this).attr('pictype') == 'goods_des'){
                        //$(this).attr('src', lazy_src); //直接指向原地址还是错误的 IE8会导致堆栈溢出 注释 by caiyx 2013-12-16
                    }
                    else if($(this).attr('picsize')){
                      var picsize = $(this).attr('picsize');
                      $(this).attr('src', STATIC_URL + '/data/system/default_goods_image_'+picsize+'.gif');
                    }
                    else{
                        $(this).attr('src', STATIC_URL + '/data/system/default_goods_image.gif');
                    }
                    $(this).unbind('error');
                });
        }
      }
    });
  };
  imgLoad();
  $(window).bind("scroll",function(){
    imgLoad();
  });
}

$(document).ready(function(){
  lazyload();
});

