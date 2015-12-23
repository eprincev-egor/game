define([
    "funcs"
], function(f) {
    "use strict";

    /**
     * Класс позволяющий расчитать пересечие:
     * круга и круга
     * @constructs Circle
     */
    var Circle = f.CreateClass("Circle");

    /**
     * Задаем базовый радиус и смещение относительно игрового объекта
     */
    Circle.prototype.init = function() {
        this.type = "Circle";
        this.radius = 1;
        this.x = 0;
        this.y = 0;
    };

    /**
     * Задаем радиус круга в пикселях
     * @param  {number} radius
     */
    Circle.prototype.setRadius = function(radius) {
        this.radius = radius;
    };

    /**
     * Задаем смещение относительно центра игрового объекта
     * @param  {object} offset объект вида {x: number, y: number}
     */
    Circle.prototype.setOffset = function(offset) {
        this.x = offset.x;
        this.y = offset.y;
    };

    /**
     * проверяем есть ли пересечение с другим кругом
     * @param  {Circle} circle объект для проверки
     * @param  {object} point0 объект вида {x: number, y: number},
     *  точка в которой находится этот хитбокс
     * @param  {object} point1 объект вида {x: number, y: number},
     *  точка в которой находится хитбокс для проверки
     * @return {boolean}        true если есть пересечение
     */
    Circle.prototype.checkCircle = function(circle, point0, point1) {
        var x = (point1.x + circle.x) - (point0.x + this.x),
            y = (point1.y + circle.y) - (point0.y + this.y);

        return Math.sqrt( x * x + y * y ) < this.radius + circle.radius;
    };

    /**
     * проверяем есть ли пересечение у текущего круга и линии
     * для того чтобы не дублировать код,
     * функция проверки находится в Line.prototype
     * здесь же только ее вызов
     * @param  {Line} line   [description]
     * @param  {object} point0 объект вида {x: number, y: number},
     *  точка в которой находится этот хитбокс
     * @param  {object} point1 объект вида {x: number, y: number},
     *  точка в которой находится хитбокс для проверки
     * @return {boolean}        true если есть пересечение
     */
    Circle.prototype.checkLine = function(line, point0, point1) {
        return line.checkCircle(this, point1, point0);
    };

    return Circle;
});
