define([
     "funcs"
], function(f) {
    "use strict";

    /**
     * Вектор указаывающий направление и скорость для передвижения объектов
     */
    var Vector = f.CreateClass("Vector");

    /**
     * Базовая инициализация вектора
     * @param  {object} vector объект вида {x: number, y: number}, где
     * vector.x - кол-во пикселей по оси X, на которое будет смещен объект
     * vector.y - кол-во пикселей по оси Y, на которое будет смещен объект
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
     * Определяем длину вектора с помощью теоремы Пифагора
     * где в качестве катетов будут this.x и this.y,
     * а гипотенуза это искомая длина
     * @return {number} длина в px
     */
    Vector.prototype.getLength = function() {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    };

    return Vector;
});
