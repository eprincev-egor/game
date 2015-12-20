define([
    "funcs",
    "jquery"
], function(f, $) {
    "use strict";

    /**
     * Фигура для создание пола, прямоугольников
     * и прочих твердых объектов.
     * Линия строится по двум точкам методами
     * line.setStartPoint({x: number, y: number});
     * line.setEndPoint({x: number, y: number});
     */
    var Line = f.CreateClass("Line");

    /**
     * Задаем координаты по умолчанию в центре объекта
     * @return {[type]} [description]
     */
    Line.prototype.init = function() {
        this.type = "Line";
        this.x0 = 0;
        this.y0 = 0;
        this.x1 = 0;
        this.y1 = 0;
    };

    /**
     * Задаем координаты первой точки
     * @param  {object} point объект вида {x: number, y: number}
     * координаты относительно центра игрового объекта в px
     */
    Line.prototype.setStartPoint = function(point) {
        this.x0 = point.x;
        this.y0 = point.y;
    };

    /**
     * Задаем координаты второй точки
     * @param  {object} point объект вида {x: number, y: number}
     * координаты относительно центра игрового объекта в px
     */
    Line.prototype.setEndPoint = function(point) {
        this.x1 = point.x;
        this.y1 = point.y;
    };

    /**
     * проверяем есть ли пересечение или нет
     * @return {boolean} true если есть пересечение двух отрезков
     * @param  {object} point0 объект вида {x: number, y: number},
     *  точка в которой находится этот отрезок
     * @param  {object} point1 объект вида {x: number, y: number},
     *  точка в которой находится отрезок для проверки
     * @return {boolean}        true если есть пересечение
     */
    Line.prototype.checkLine = function(line, point0, point1) {
        return this.getIntersection(line, point0, point1).isCross;
    };

    /**
     * Проверяем есть ли пересечение линии и круга
     * @param  {Circle} circle круг для проверки на пересечение
     * @param  {object} point0 объект вида {x: number, y: number},
     *  точка в которой находится этот хитбокс
     * @param  {object} point1 объект вида {x: number, y: number},
     *  точка в которой находится хитбокс для проверки
     * @return {boolean}        true если есть пересечение
     */
    Line.prototype.checkCircle = function(circle, point0, point1) {
        // используем квадратное уравнение,
        // выраженное из формулы круга и линии

        var x1 = this.x0 + point0.x,
            y1 = this.y0 + point0.y,
            x2 = this.x1 + point0.x,
            y2 = this.y1 + point0.y,
            r = circle.radius,
            cx = circle.x + point1.x,
            cy = circle.y + point1.y;

        x1 -= cx;
        y1 -= cy;
        x2 -= cx;
        y2 -= cy;

        var dx = x2 - x1,
            dy = y2 - y1,
            a = dx * dx + dy * dy,
            b = 2 * ( x1 * dx + y1 * dy ),
            c = x1 * x1 + y1 * y1 - r * r;

        if ( -b < 0 ) {
            return c < 0;
        }

        if ( -b < 2 * a ) {
            return 4 * a * c - b * b < 0;
        }

        return a + b + c < 0;
    };

    /**
     * находим пересечение 2х линий
     * @param {Line} line линия для проверки на пересечение
     * @param {object} point0 {x: number, y: number} - положение текущий хитбокс в пространстве
     * @param {object} point1 {x: number, y: number} - положение чужого хитбокса в пространстве
     * @return {object} объект вида {
     *    // координаты пересечения в пикселях
     *    x: number,
     *    y: number,
     *    // флаг определяющий, входит ли точка пересечения
     *    // в отрезки или нет
     *    isCross: boolean
     * }
     */
    Line.prototype.getIntersection = function(line, point0, point1) {
		var
            // координаты первого отрезка
            ax0 = this.x0 + point0.x,
            ay0 = this.y0 + point0.y,
            ax1 = this.x1 + point0.x,
            ay1 = this.y1 + point0.y,
            // координаты второго отрезка
            bx0 = line.x0 + point1.x,
            by0 = line.y0 + point1.y,
            bx1 = line.x1 + point1.x,
            by1 = line.y1 + point1.y,

            x, y;

		/* === */
		/* Костыль для вертикальных линий! */
		if (ax0 == ax1 && bx0 != bx1) {  // отрезок A пар-лен оси Y
			x = ax0;
			y = __y(x, bx0, by1 - by0, bx1 - bx0, by0);
			return {
				x: x,
				y: y,
				isCross: isCross(
                    ax0, ay0, ax1, ay1,
                    bx0, by0, bx1, by1,
                    x, y
                )
			};
		}
		if (bx0 == bx1 && ax0 != ax1) {  // отрезок B пар-лен оси Y
			x = bx0;
			y = __y(x, ax0, ay1 - ay0, ax1 - ax0, ay0);
			return {
				x: x,
				y: y,
				isCross: isCross(
                    ax0, ay0, ax1, ay1,
                    bx0, by0, bx1, by1,
                    x, y
                )
			};
		}
		/* === */

        // временные переменные
		var top1, top2, top3, down,
		    tmp1 = ax1 - ax0,
			tmp2 = bx1 - bx0,
			tmp3 = ay1 - ay0,
			tmp4 = by1 - by0
		;

		// расчитывем Х
		top1 = (by0 - ay0) * tmp1 * tmp2;
		top2 = ax0 * tmp3 * tmp2;
		top3 = bx0 * tmp4 * tmp1;

		down = tmp3 * tmp2 - tmp4 * tmp1;

		x = ( top1 + top2 - top3 ) / down; // общая формула
		//y = ( ( (x - ax0) * tmp3 ) / tmp1 ) + ay0;
		y = __y( x, ax0, tmp3, tmp1, ay0 );

		// определяем пересеклись или нет
		return {
            x: x,
            y: y,
            isCross: isCross(
                ax0, ay0, ax1, ay1,
                bx0, by0, bx1, by1,
                x, y
            )
        };
    };

    // функции помошники
    function isCross(
        ax0, ay0, ax1, ay1,
        bx0, by0, bx1, by1,
        x, y
    ) {
        return  checkInto( ax0, ax1, x ) &&
                checkInto( ay0, ay1, y ) &&
                checkInto( bx0, bx1, x ) &&
                checkInto( by0, by1, y );
    }

    function checkInto(t0, t1, c) { // обратный bounding box
        if ( Math.min(t0, t1) == t0 )
            return c >= t0 && c <= t1;
        else
            return c >= t1 && c <= t0;
    }

    function __y(x, ax0, tmp3, tmp1, ay0) {
        return ( ( (x - ax0) * tmp3 ) / tmp1 ) + ay0;
    }

    return Line;
});
