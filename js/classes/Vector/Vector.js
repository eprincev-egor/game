define([
     "funcs"
], function(f) {
    "use strict";

    /**
     * Вектор указаывающий направление и скорость для передвижения объектов
     * @constructs Vector
     * @alias Game.Vector
     * @example
     * // создаем вектор, который будет направлять игровой объект
     * // на 10px вправо и 12px вниз за каждый кадр игры
     * var vector = new Vector({
     * 		x: 10,
     * 		y: 12
     *   });
     *
     * // создаем копию вектора
     * var cloneVector = new Vector(vector);
     */
    var Vector = f.CreateClass("Vector");

    /**
     * Базовая инициализация вектора
     * @param  {Object | Vector} vector объект вида {x: number, y: number}, где <br/>
     * vector.x - кол-во пикселей по оси X, на которое будет смещен объект  <br/>
     * vector.y - кол-во пикселей по оси Y, на которое будет смещен объект  <br/>
     */
    Vector.prototype.init = function(vector) {
        if ( vector ) {
            this.x = vector.x;
            this.y = vector.y;
        } else {
            this.x = 0;
            this.y = 0;
        }
    };

    /**
     * Получаем вектор с тем же направлением, но с длиной равной 1px
     * @return {Vector} вектор с гипотенузой в 1px
     */
    Vector.prototype.getUnit = function() {
        var unitVector = new Vector(),
            // находи гипотенузу
            c = this.getLength();

        if ( c !== 0 ) {
            unitVector.x = this.x / c;
            unitVector.y = this.y / c;
        }

        return unitVector;
    };

    /**
     * Определяем длину вектора с помощью теоремы Пифагора  <br/>
     * где в качестве катетов будут this.x и this.y,  <br/>
     * а гипотенуза это искомая длина  <br/>
     * @return {number} длина в px
     */
    Vector.prototype.getLength = function() {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    };

    return Vector;
});
