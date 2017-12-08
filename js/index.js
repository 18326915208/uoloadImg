//第一种方法
 $("#file").on('change',function () {
    var fileObj=document.getElementById("file");
    var src=window.URL.createObjectURL(fileObj.files[0]);
    console.log(src);
    if ($('.div').find('.image').length>2){
        $('.div').find('.image').eq(0).remove();
    }
    $('.ul_img').append("<li class='l'><img src="+src+" class='image' style='width: 100px;height: 100px;'/></li>");
});
//第二种方法
var PLUGIN = {
	/**
	 * @param {Object} imgname 所要传输的input name
	 * @param {Object} img 所要传输的图片数据
	 * @param {Object} url 传输地址
	 * @param {Object} fun 回调执行方法
	 */
	imgRequest: function(imgname, img, url, fun) {
		console.log(imgname)
		var data = {
			imgData:img,//图片数据
			imgName:imgname,//传输名
			url:url||"http://mall.ptb2b.com/inc/ajax.ashx?action=uploadify__upload",//传输地址
			response:fun||""//连接方法
		}
		//根据传入值修改方法
		if(arguments.length == 2) {
			if(typeof(img) == "function") {
				data.response = img;
			}
			if(!imgname[0].type.match(/image\/.*/i)) {
				alert("请选择图片")
				return;
			} else {
				data.imgName = "Filedata";
				data.imgData = imgname[0];
			}
		}
		var reader = new FormData();
		reader.append(data.imgName, data.imgData);
		var httprequest = new XMLHttpRequest();
		httprequest.open("POST", data.url);
		httprequest.send(reader)
		httprequest.onload = function(msg) {
			data.response(JSON.parse(httprequest.response));
		}
	}
}
//点击上传图片事件
$(".input_img").bind("change",function(e){
	var ireg = /image\/.*/i;
	var files = e.target.files || e.dataTransfer.files;
	if(!files[0].type.match(ireg)) {
		alert("请选择图片")
		return;
	} else {
		PLUGIN.imgRequest("Filedata", files[0], "http://mall.ptb2b.com/inc/ajax.ashx?action=uploadify__upload", function(data) {
			$("#imgBox").show()
			var s=$("#imgBox").html()
			s+='<div class="div_img " path="'+data.filepath+'"><img src="'+data.filepath+'" class="addImg" ><span class="del_img"></span></div>'
			$("#imgBox").html(s)
			var len=$(".div_img").length
			console.log(len)
			if(len>=3){
				$(".upImg").hide()
			}else{
				$(".upImg").css("display","block")
			}
			$(".del_img").click(function(){
				var ind=$(this).parent().index()
				$(".div_img").eq(ind).remove()
				var len=$(".div_img").length
				if(len==0 ||len=="" || len==null){
					$("#imgBox").hide()
				}else if(len<3){
					$(".upImg").show()
				}
			})
		})
	}
})