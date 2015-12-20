define([
    "funcs",
    "classes/Vector/VectorManager",
    "classes/Hitbox/Hitbox"
], function(f, VectorManager, Hitbox) {
    "use strict";

    /**
     * Базовый класс игрового объекта
     */
    var GameObject = f.CreateClass("GameObject");

    /**
     * Инициализация объекта, вызванная при создании объекта
     */
    GameObject.prototype.init = function() {
        this.x = 0;
        this.y = 0;

        this.vectorManager = new VectorManager();
        this.hitbox = new Hitbox();
        this.hitbox.setGameObject(this);
    };

    /**
     * базовая отрисовка объекта на канвасе на основе hitbox
     * @param  {CanvasRenderingContext2D} ctx контекст холста
     */
    GameObject.prototype.drawHitbox = function(ctx) {
        var x = this.x,
            y = this.y,
            figure;

        ctx.strokeStyle = this.color;
        for (var i = 0; i < this.hitbox.figures.length; i++) {
            figure = this.hitbox.figures[i];

            ctx.beginPath();
            if ( figure.type == "Line" ) {
                ctx.moveTo(x + figure.x0, y + figure.y0);
                ctx.lineTo(x + figure.x1, y + figure.y1);
            } else {
                ctx.arc(x, y, figure.radius, 0, Math.PI * 2);
            }
            ctx.stroke();
        }

    };

    /**
     * управляющий объектом метод, вызывается на кажом кадре игры
     * @param  {number} timeCoeff скорость игры
     */
    GameObject.prototype.frame = function(timeCoeff) {
        this.vectorManager.frame();
        var vector = this.vectorManager.getSumm();
        this.x += vector.x;
        this.y += vector.y;
    };

    return GameObject;
});
