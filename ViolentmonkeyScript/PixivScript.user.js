// ==UserScript==
// @name PixivScript
// @namespace Violentmonkey Scripts
// @match *://*/*
// @grant none
// ==/UserScript==
(function () {
    'use strict';
  
  if(window.location.href.indexOf("https://www.pixiv.net/bookmark.php")<0){
      return false;
  }

  //把button附加上去
   var down_btn_html = '<button id="orginTxtDownload">导出</button>';
   var  ul_tag = $('.column-title');
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
        var resultx = "";
        //计算页数
        var pcx = $('._pager-complex li').eq(-2)[0].innerText;
         var i = 1;
        for(var j =1;j<=parseInt(pcx);j++){
          $.ajaxSettings.async = false;
          $.post('https://www.pixiv.net/bookmark.php?type=user&rest=show&p=' + j, function (text, status) {

            var li_st = text.indexOf('<li><input name="id[]" value="');
            var li_ed = text.indexOf('</span></div></li>')+18;
            do{
              var liins = $(text.substr(li_st,li_ed-li_st))[0];
              result += liins.children[0].defaultValue + "," + liins.children[1].attributes[5].nodeValue + "\r\n";
              resultx += liins.children[0].defaultValue + "\r\n";
              li_st = text.substr(li_ed).indexOf('<li><input name="id[]" value="') + li_ed;
              li_ed += text.substr(li_ed).indexOf('</span></div></li>')+18;
              if(text.substr(li_ed).indexOf('<li><input name="id[]" value="')==-1){
                var liins = $(text.substr(li_st,li_ed-li_st))[0]
                result += liins.children[0].defaultValue + "," + liins.innerText + "\r\n";
                resultx += liins.children[0].defaultValue + "\r\n";
              }
            }while(text.substr(li_ed).indexOf('<li><input name="id[]" value="')!=-1)
            
          });
            
        }

        console.log(result);
        fuDownload.blobdownload(result,"pixiv关注列表.txt");
          fuDownload.blobdownload(resultx,"pixiv关注列表id.txt");
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
