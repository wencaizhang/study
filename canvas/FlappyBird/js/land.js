// 创建一个大地的构造函数
function Land(x, speed, img, ctx) {
    this.x = x;
    this.speed = speed;
    this.img = img;
    this.ctx = ctx;
}

// 大地的绘制方法
Land.prototype.render = function () {
    this.ctx.drawImage(this.img, this.x, 488);
};

// 大地的更新方法
Land.prototype.update = function (dt) {
    this.x = this.speed * dt + this.x;
    if (this.x <= -336) {
        this.x += 336 * 4;
    }
};
