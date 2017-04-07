function loadRes(res,callback){
    var imgs = {};
    var count = 0;
    // 每次有图片完成加载之后都执行这个函数，如果所有图片都加载完成则执行callback函数
    function loadHandler(){
        count++;
        if(count>=res.length){
            // 用回调函数来返回数据
            callback(imgs);
        }
    }
    for (var i=0;i<res.length;i++){
        // 遍历资源数组，创建img标签
        var img = new Image();
        img.src = res[i].path;
        img.addEventListener('load',function(){
            loadHandler()
        });
        imgs[res[i].name] = img;
    }
}