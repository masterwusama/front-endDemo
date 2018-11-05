// ==UserScript==
// @name BCYScript
// @namespace Violentmonkey Scripts
// @match *://*/*
// @require         http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @grant none
// ==/UserScript==
(function () {
    'use strict';
  
  if($('.img-wrap-inner').length==0){
    return false;
  }
  //把button附加上去
   var down_btn_html = '<a class="site-nav__item" id="orginImgDownload">原图</a>';
   var  ul_tag = $('.site-nav__item:eq(5)');
   if(ul_tag){
     ul_tag.after(down_btn_html);
   }
  document.onselectstart = document.onbeforecopy = document.oncontextmenu = document.onmousedown = document.onkeydown = function(){return true;};
  void(document.body.onmouseup=''); 
  void(document.body.onselectstart=''); 
  void(document.body.onmouseup=''); 
  void(document.body.oncopy='');
  //document.body.contentEditable='true'; 
  //document.designMode='on';
  
  //var savetool = {
  //    DoSaveAsIMG : function(){
  //      document.IframeReportImg.document.execCommand("SaveAs");
  //    }
  //}
  //var crossytool ={
  //  downloadreportimg: function(imgPathURL){
  //      //如果隐藏IFRAME不存在，则添加
  //     if (!document.getElementById("IframeReportImg"))
  //        var iframex = '<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" width="0" height="0" src="'+ imgPathURL +'"></iframe>'
  //      $(iframex).appendTo("body");      
  //      savetool.DoSaveAsIMG();
  //    }
  //}
  //var tempcanvans = {
  //  canvanspaint:function(){
  //    var image = new Image()
  //    image.src = document.querySelector(selector).src
  //    // 解决跨域 Canvas 污染问题
  //    image.setAttribute('crossOrigin', 'anonymous')
  //    image.onload = function () {
  //        var canvas = document.createElement('canvas')
  //        canvas.width = image.width
  //        canvas.height = image.height

  //        var context = canvas.getContext('2d')
  //        context.drawImage(image, 0, 0, image.width, image.height)
  //        var url = canvas.toDataURL('image/png')

  //        var a = document.createElement('a')
  //        var event = new MouseEvent('click')
  //        a.download = na
  //        a.href = url
  //        a.dispatchEvent(event)
  //    }
  //    }
  //}
  var imgdownload = {
      download: function () {
        if($('.specixxxx').length>0){
          $('.specixxxx').remove();
          return false;
        }
          var imgs= $('.img-wrap-inner');
          imgs.each(function(){
            var surl= $(this).find("img").attr("src");
            var oimg = surl.substring(0,surl.length-5);
            console.log(oimg)
            //默认名称
            var mrname = oimg.split('/')[oimg.split('/').length-1];
            var image = new Image()
            image.src = oimg;
            
            var bl = image.height/image.width;
            
            var cl = 200;
            image.width = cl;
            image.height = cl * bl
            image.classList +="specixxxx"
            $('header:eq(1)').after(image);
            
            //crossytool.downloadreportimg(oimg);
            //image.setAttribute('crossOrigin', 'anonymous')
            //image.onload = function () {
                //var canvas = document.createElement('canvas')
                //canvas.width = image.width
                //canvas.height = image.height

                //var context = canvas.getContext('2d')
                //context.drawImage(image, 0, 0, image.width, image.height)
                //var url = canvas.toDataURL('image/png')

                //var a = document.createElement('a');
                //var event = new MouseEvent('click');
                //a.download = mrname;
                //a.href = url;
                //a.dispatchEvent(event);
            })
      }
    };
  
  $(function(){
    $("#orginImgDownload").click(function () {
        imgdownload.download();
    });
  })
})();


