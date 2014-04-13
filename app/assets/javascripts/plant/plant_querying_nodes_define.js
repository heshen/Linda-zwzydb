/**
 * Created with JetBrains RubyMine.
 * User: hitfishking
 * Date: 14-4-2
 * Time: 下午3:17
 * To change this template use File | Settings | File Templates.
 */

$(function(){
     pic_node_template = $(
        '<li class="list-item list-item-hover panel-styles">'+
            '<div class="show-cnt">'+
                 '<div class="pic" data-ishow="true">'+
                    '<a href="/app/assets/stylesheets" target="_blank" title="">'+
                        '<img picsize="220"'+
                        'src=""'+
                        'alt=""'+
                        'onerror="this.src=\'/img/views/plant_querying/no_img.gif\'"/>'+
                    '</a>'+
                 '</div>'+
                 '<div class="goods-info">'+
                     '<p class="price"><b><em class="q-pri">¥42.00-45.00</em></b><span class="wrap"></span></p>'+
                  '</div>'+
             '</div>'+
        '</li>'
    );
});