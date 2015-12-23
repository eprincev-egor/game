define([
    "funcs",
    "classes/Vector/Vector"
], function(f, Vector) {
    "use strict";

    /**
     * Угасающий вектор, нужен для реализации импульсов
     * после создания объекта необходимо вызвать 3 метода
     * fadeVector.setBaseVector(vector);
     * fadeVector.setManager(vectorManager);
     * fadeVector.setFrameCount(number);
     * @constructs FadeVector
     * @extends Vector
     */
    var FadeVector = Vector.extend("FadeVector");

    /**
     * Задать базовое направление и скорость вектором
     * использовать базовые координаты вектора this.x и this.y не стоит
     * т.к. они будут изменяьтся во время движения,
     * а вектор будет использован повторно
     * @param  {Vector} vector объект с координатами x, y
     */
    FadeVector.prototype.setBaseVector = function(vector) {
        this.baseVector = vector;
        this.x = vector.x;
        this.y = vector.y;
    };

    /**
     * Задать кол-во кадров, за которое вектор угаснет до нуля
     * @param  {number} count кол-во кадров
     * целое, больше нуля
     */
    FadeVector.prototype.setFrameCount = function(count) {
        this.frameCount = count;
        // кол-во пройденных кадров
        this.index = 0;

        // кол-во пикселей на которое надо угасать
        this.stepX = this.baseVector.x / count;
        this.stepY = this.baseVector.y / count;
    };

    /**
     * Задать менеджер векторов, когда вектор угаснет,
     * он буде удален из менеджера
     * @param  {VectorManager} manager менеджер-коллекция векторов,
     * из которой необходимо удалить вектор, по завершению угасания
     */
    FadeVector.prototype.setManager = function(manager) {
        this.manager = manager;
    };

    /**
     * Угасание на каждом кадре относительно this.index
     * чем больше this.index, тем слабее вектор
     * @param  {number} timeCoeff скорость игры
     */
    FadeVector.prototype.frame = function(timeCoeff) {
        var diffX = this.stepX * this.index,
            diffY = this.stepY * this.index;

        this.x = this.baseVector.x - diffX;
        this.y = this.baseVector.y - diffY;

        this.index++;
        if ( this.index >= this.frameCount ) {
            this.x = 0;
            this.y = 0;
            if ( this.manager ) {
                this.manager.remove(this);
                this.clear();
            }
        }
    };

    /**
     * если необъодимо повторить вектор на объекте,
     * то нужно сбросить index и заново добавить в менеджер
     * .clear сбрасывает необходимые параметры
     * для повторного использования вектора
     */
    FadeVector.prototype.clear = function() {
        this.index = 0;
        this.x = this.baseVector.x;
        this.y = this.baseVector.y;
    };

    return FadeVector;
});
