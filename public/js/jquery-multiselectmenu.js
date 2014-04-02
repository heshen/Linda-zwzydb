/**
 * Created with JetBrains RubyMine.
 * User: hitfishking
 * Date: 14-1-31
 * Time: 下午7:50
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    //Document装载loaded时，调用.js_toggle类标签对象继承链上的Jdropdown函数.
    $(".js_toggle").Jdropdown({delay: 100}, function(e){});
});

//延时切换
(function(a) {
    //这里有3个变量需要明确：a是jQuery对象本身；也是扩展Jdropdown函数的目标对象；
    //d是一个直接对象{}；e是一个传入函数；
    a.fn.Jdropdown = function(d, e) {
        // $(".js_toggle").Jdropdown(...)，类似这样的选择符上调用此函数，选择符可能选择出多个view对象，形成一个数组。
        // 这里就是判断，若数组为空，直接返回，不做任何操作。为空，说明dom上没有tag标记为.js_toggle类。
        if (!this.length) {     //这里的this是指Jdropdown集合；
            return
        }
        //构造一个直接对象c={...}，前半部分是预先指定，后半部分由参数d传入(本例中，传入的是一个直接对象{delay: 100})
        //前半部分的参数也可能会被后半部分传入的参数所修改。
        var c = a.extend({
            event: "mouseover",
            current: "hover",
            delay: 0,
            fun: "default"
        }, d || {});

        //如果event:mouseover没有被覆盖，则b中存储mouseout或mouseleave事件；
        var b = (c.event == "mouseover") ? "mouseout" : "mouseleave";

        //对每个".js_toggle"执行以下的匿名函数function(){...}，这个函数才是处理的核心。
        //此匿名函数下，绑定到c.event和b上的两个匿名函数分是更重核心的函数；
        //mouseover+mouseout; mouseover+mouseleave
        a.each(this, function() {    //这里的this是指Jdropdown集合；
            var h = null,
                g = null,
                f = false; //该变量表示当前菜单是否处于显示状态。
            a(this).bind(c.event, function() {   //这里的this是指Jdropdown集合中的一个具体的tag对象；
            //给每个$(".js_toggle")数组上的一个tag对象this绑定一个c.event == "mouseover"事件函数；
            //该事件函数为的逻辑是：延迟若干毫秒显示菜单；
                if (f) {
                    clearTimeout(g)
                } else {
                    var j = a(this);
                    h = setTimeout(function() {
                        if( c.fun == "default" )
                        {
                            var menu_item_wrap =j.find('.menu-item-wrap');    //找到当前this节点下的<textarea>对象，取得其中文本，
                            var _flag_temp = 0;                                 //将文本dom化，挂载到当前对象下；
                            if(menu_item_wrap.length!=0){                      //删除该<textarea>节点；
                                var o_menu_in = $(menu_item_wrap.text());
                                j.append(o_menu_in);
                                menu_item_wrap.remove();
                                _flag_temp =1;
                            }
                            j.addClass(c.current).children(".menu-in").show();
                        }
                        f = true;
                        if (e) {
                            e(j)
                        }
                    }, c.delay)  //setTimeout,前半部分是
                }
            }).bind(b, function() {
                    if (f) {
                        var j = a(this);
                        g = setTimeout(function() {
                            if( c.fun == "default" ){
                                j.removeClass(c.current).children(".menu-in").hide();
                            }
                            f = false
                        }, c.delay)
                    } else {
                        clearTimeout(h)
                    }
                })
        })
    }
})(jQuery);

