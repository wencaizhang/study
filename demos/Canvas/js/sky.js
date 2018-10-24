
// 创建一个天空的构造函数
function Sky(x, speed, img, ctx) {
    this.x = x;
    this.speed = speed;
    this.img = img;
    this.ctx = ctx;
}

// SKY的绘制方法
Sky.prototype.render = function () {
    this.ctx.drawImage(this.img, this.x, 0);
};

// SKY的更新方法
Sky.prototype.update = function (dt) {
    this.x = this.speed * dt + this.x;
    if (this.x <= -800) {
        this.x += 800 * 2;
    }
};
