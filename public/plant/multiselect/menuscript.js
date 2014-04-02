/**
* Created with JetBrains RubyMine.
* User: hitfishking
* Date: 14-3-28
* Time: 上午9:51
* To change this template use File | Settings | File Templates.
* View-Controller --    基于抽象窗口模型思想
*/

$(function(){
    //--- Controller1 ----------------------------------------------
    //click()
    var new_node = $(
        '<li class="mt-7">' +
            '<a class="attr-item attr-sed" rel="nofollow" href="javascript:voild(0)">'+
                '<div class="attr-item-inner clearfix">'+
                    '<span class="attr-item-text"></span><i></i>'+
                    '<span class="qstr" style="display: none">'+"{zhuxing: \"QiaoMu\"}"+'</span>'+
                '</div>'+
            '</a>'+
        '</li>'
    );

    var strSelectorLine = "";
    for (var i=1; i<=5; i++) {
        if (i==2) continue;
        strSelectorLine = '.attr-group .select'+ i + ' li';

        var funTemp = function(i){
            $(strSelectorLine).click(function(){
                //行内选项单亮
                $(this).find('a').addClass('choosen');
                $(this).siblings().find('a').removeClass('choosen');

                //清除已有的同类其他选项
                $('.attr-selected-cnt .attr-list .mt-7').each(function(){
                    var strCategory = $(this).find('[category]').attr('category');
                    if (strCategory == 'select'+i) {
                        $(this).remove();
                    }
                });

                //构造、添加新选项
                var strLabel = $(this).find('span.normal').text();
                var strQstr =  $(this).find('span.qstr').text();     //隐藏着查询指令片段
                var strCategory = 'select'+i;

                var my_new_node = new_node.clone();
                my_new_node.find('span.attr-item-text').text(strLabel);
                my_new_node.find('span.qstr').attr('category',strCategory).text(strQstr);

                $('.attr-selected-cnt .attr-list').append(my_new_node);
            });
        };
        funTemp(i); //闭包，当即执行之解决方案。
    }

    strSelectorLine = "";
    for (var j=1; j<=4; j++) {
        strSelectorLine = '.select2'+ j + ' li';

        var funTemp2 = function(j){
            $(strSelectorLine).click(function(){
                //行内选项单亮
                $(this).find('span').addClass('choosen');
                $(this).siblings().find('span').removeClass('choosen');

                //清除已有的同类其他选项
                $('.attr-selected-cnt .attr-list .mt-7').each(function(){
                    var strCategory = $(this).find('[category]').attr('category');
                    if (strCategory == 'select2'+j) {
                        $(this).remove();
                    }
                });

                //构造、添加新选项
                var strLabel = $(this).find('span .normal').text();
                var strQstr =  $(this).find('span.qstr').text();     //隐藏着查询指令hash片段
                var strCategory = 'select2'+j;

                var my_new_node = new_node.clone();
                my_new_node.find('span.attr-item-text').text(strLabel);
                my_new_node.find('span.qstr').attr('category',strCategory).text(strQstr);

                $('.attr-selected-cnt .attr-list').append(my_new_node);
            });
        };
        funTemp2(j); //闭包，当即执行之解决方案。
    }


    //--- Controller2 ----------------------------------------------
    //click()
    //If user clicked a selected item, then remove it,and clear the SelectorLine.
     $('.attr-selected-cnt .attr-list').on('click','.mt-7',function(){
         var strSelectorLine = "";
         var strCategory = $(this).find('[category]').attr('category');

         if (strCategory.length ==7){   //select1~5
             strSelectorLine =  '.attr-group'+' .'+ strCategory + ' li';
             $(this).remove();
             $(strSelectorLine).find('a').removeClass('choosen');
         } else {  //select21~24
             strSelectorLine = ' .'+ strCategory + ' li';
             $(this).remove();
             $(strSelectorLine).find('span').removeClass('choosen');
         }

     });

    //--- Controller3 ----------------------------------------------
    //click()
     $('#btn_query').click(function(){
         var ajax_params = collect_query_params();
         $.ajax({
             url: "/plant/list_plant_querying",
             data: ajax_params
             })
             .done(function(data){
                 alert("done!  "+data);
                 alert(data.data_s[0].cname);
             })
             .fail(function(){
                 alert("本次查询失败 :(");
             })
             .always(function(){
//                 alert("complete!");
             });
     });

     function collect_query_params() {
        var nCount = $('.attr-selected-cnt .attr-list .mt-7').length;
        if (nCount<= 1) {
            alert ("请您选择筛选条件！")
            return 0;
        }

        var param_hash = {};
        for (var i=1; i <= nCount-1; i++){
            var selTemp = '.attr-selected-cnt .attr-list .mt-7:eq('+i+')';
            var txtTemp = $(selTemp).find('.qstr').text();
            var jsonQstr = eval("("+txtTemp+")");
            param_hash = mergeJsonObject(param_hash,jsonQstr);
        }
        param_hash = {q_data: param_hash};
        return param_hash;
     }

    /**
     * 合并两个json对象属性为一个对象
     * @param jsonbject1
     * @param jsonbject2
     * @returns resultJsonObject
     */
    function mergeJsonObject(jsonbject1, jsonbject2)
    {
        var resultJsonObject={};
        for(var attr in jsonbject1){
            resultJsonObject[attr]=jsonbject1[attr];
        }
        for(var attr in jsonbject2){
            resultJsonObject[attr]=jsonbject2[attr];
        }

        return resultJsonObject;
    }

});

