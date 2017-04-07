
// 鸟的显示对象
function Bird(y, a, img, ctx) {
    this.y = y; // 小鸟的y轴坐标
    this.a = a; // 小鸟的加速度
    this.img = img;
    this.ctx = ctx;
    // 一些需要初始化的值
    this.speed = 0; // 初始速度0
    this.frameIndex = 0; // 第一帧是0
    this.waitTime = 0; // 初始等待时间0
}

Bird.prototype.update = function (dt) {
    this.speed = this.speed + this.a * dt; // 根据加速度获得速度
    this.y = this.y + this.speed * dt; // 速度*时间=路程

    // 控制鸟扇翅膀
    this.waitTime += dt;
    if (this.waitTime >= 200) {
        this.waitTime -= 200;
        this.frameIndex = this.frameIndex >= 2
            ? 0
            : this.frameIndex + 1;
    }

};

Bird.prototype.render = function () {
    this.ctx.save();

    this.ctx.translate(150, this.y);
    this.ctx.rotate(Math.PI * (this.speed > 0.3 ? 0.3 : this.speed));

    this.ctx.drawImage(this.img,
        this.frameIndex * 52, 0, 52, 45,
        -26, -22.5, 52, 45
    );
    // 不要让绘制小鸟时旋转坐标系的操作影响其他显示对象的绘制
    this.ctx.restore();
};

Bird.prototype.fly = function () {
    this.speed = -0.3;
};
