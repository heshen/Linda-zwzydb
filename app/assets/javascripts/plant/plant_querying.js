/**
* Created with JetBrains RubyMine.
* User: hitfishking
* Date: 14-3-28
* Time: 上午9:51
* To change this template use File | Settings | File Templates.
* View-Controller --    基于抽象窗口模型思想
*/
//= require ./plant_querying_nodes_define

$(function(){
    //--- Controller1 ----------------------------------------------
    //click()
    var selected_node_template = $(
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

                var my_new_node = selected_node_template.clone();
                my_new_node.find('span.attr-item-text').text(strLabel);
                my_new_node.find('span.qstr').attr('category',strCategory).text(strQstr);

                $('.attr-selected-cnt .attr-list').append(my_new_node);

                $('#btn_query').trigger("click");
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

                var my_new_node = selected_node_template.clone();
                my_new_node.find('span.attr-item-text').text(strLabel);
                my_new_node.find('span.qstr').attr('category',strCategory).text(strQstr);

                $('.attr-selected-cnt .attr-list').append(my_new_node);

                $('#btn_query').trigger("click");
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

         $('#btn_query').trigger("click");

     });

    //--- Controller3 ----------------------------------------------
    //调入pic模板
// introduced in by //=require directive, no need any long to get it at run time by ajax.
//     $.getScript("/assets/plant/plant_querying_nodes_define.js")
//         .done(function(data){
////             alert("script loaded!");
//         })
//         .fail(function(data){
//             alert("Cannot load the script (/assets/plant/plant_querying_nodes_define.js) :( ");
//         });

    //click()
     $('#btn_query').click(function(){
         var ajax_params = collect_query_params();
         if (ajax_params == 0) return;

         $.ajax({
             url: "/plant/list_plant_querying",
             data: ajax_params
             })
             .done(function(data){
//               alert(data.data_s[0].cname);
                 $('#cpc li').remove();
                 populate_pic_node(data);
             })
             .fail(function(){
                 alert("本次查询失败 :(");
             })
             .always(function(){
//                 alert("complete!");
             });
     });

     //构造pic node
     function populate_pic_node(data){
         var nLength = data.data_s.length;

         if (nLength > 0) {
             $('#id-pics-list .col-md-12').css('height','auto');
             $('#info_no_pic').css('display','none');
         }else{
             $('#id-pics-list .col-md-12').css('height','300px');
             $('#info_no_pic').css('display','inline');
         }

         for (var i=0; i < nLength; i++) {
             var my_new_pic_node = pic_node_template.clone();
             var str_cname = data.data_s[i].cname;
//             var str_pic_path = "/pic-store/img/" + data.data_s[i].pics + "1.jpg"; #old: get from local /public/pic-store
             var str_pic_path = "http://pic-store.oss-cn-qingdao.aliyuncs.com/" + data.data_s[i].pics + "1.jpg";

//           my_new_pic_node.find('a').attr('href','/plant/plant_show/'+str_cname+"+"+data.data_s[i].pics);   //old: complex url
             my_new_pic_node.find('a').attr('href','/plant/plant_show/'+data.data_s[i].pics);
             my_new_pic_node.find('a').attr('title',str_cname)
                            .find('img').attr('src', str_pic_path)
                                         .attr('alt',str_cname);
             my_new_pic_node.find('.q-pri').text(str_cname);

             $('#cpc').append(my_new_pic_node);
         }

     }

     function collect_query_params() {
        var nCount = $('.attr-selected-cnt .attr-list .mt-7').length;
        if (nCount<= 1) {
            alert ("请您选择筛选条件！");
            return 0;
        }

        var param_hash = {};
        for (var i=1; i <= nCount-1; i++){
            var selTemp = '.attr-selected-cnt .attr-list .mt-7:eq('+i+')';
            var txtTemp = $(selTemp).find('.qstr').text();
            var jsonQstr = eval("("+txtTemp+")");
            param_hash = mergeJsonObject(param_hash,jsonQstr);
        }

        return {q_data: param_hash};
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

