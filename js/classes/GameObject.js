define([
    "funcs",
    "classes/Vector/VectorManager",
    "classes/Hitbox/Hitbox"
], function(f, VectorManager, Hitbox) {
    "use strict";

    /**
     * Базовый класс игрового объекта
     * @constructs GameObject
     */
    var GameObject = f.CreateClass("GameObject", {
        // ширина и высота для спрайтов
        width: 10,
        height: 10
    });

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
     * Рисуем итоговый вектор объекта
     * @param  {CanvasRenderingContext2D} ctx холст,
     * на котором будет отрисована линия из центра объекта
     */
    GameObject.prototype.drawVector = function(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWith = 3;
        ctx.strokeStyle = "yellow";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this._vector.x, this.y + this._vector.y);
        ctx.stroke();
        ctx.restore();
    };

    /**
     * управляющий объектом метод, вызывается на кажом кадре игры
     * @param  {number} timeCoeff скорость игры
     */
    GameObject.prototype.frame = function(timeCoeff) {
        this.vectorManager.frame();
        var vector = this.vectorManager.getSumm();
        this._vector = vector; // кэш

        this.x += vector.x;
        this.y += vector.y;
    };

    return GameObject;
});
