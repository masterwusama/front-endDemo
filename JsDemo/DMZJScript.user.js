// ==UserScript==
// @name DMZJScript
// @namespace Violentmonkey Scripts
// @match *://*/*
// @grant none
// ==/UserScript==
(function () {
    'use strict';
  
  if(window.location.href != "http://i.dmzj.com/subscribe"){
      return false;
  }

  //把button附加上去
   var down_btn_html = '<button id="orginTxtDownload">导出</button>';
   var  ul_tag = $('.letter_option');
   if(ul_tag){
     ul_tag.after(down_btn_html);
   }


 
   var fuDownload =  {
     blobdownload :function (content, filename){
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        var blob = new Blob([content]);//charge to blob
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
      }
   }
      
  var txtdownload = {
      download: function () {
        //存储结果
        var result = "";
        //计算页数
        var pcx = $('#page_id.page')[0].getElementsByTagName("a").length-4;
         
        for(var j =1;j<=pcx;j++){
          $.ajaxSettings.async = false;
          $.post('http://i.dmzj.com/ajax/my/subscribe', { page: j,type_id:"1",letter_id:"0",read_id:"1" }, function (text, status) {
          for(var i =0;i<$(text).length;i++){
              if($($(text)[i])[0].className == "dy_content_li"){
                result += $($(text)[i]).find(".dy_r h3 a")[0].innerText + "\r\n";
              }
          }
        });
        }
        console.log(result);
        fuDownload.blobdownload(result,"关注列表.txt");
      }
    };
  
  $(function(){
    if($("#orginTxtDownload").length == 1){
        $("#orginTxtDownload").click(function () {
        txtdownload.download();
    });
    }
  })
})();