define([
    "funcs",
    "classes/Vector/Vector"
], function(f, Vector) {
    "use strict";

    /**
     * Вектор гравитации объектов, базовое движение всех объектов вниз
     * на каждом кадре вектор возрастает
     */
    var GravityVector = Vector.extend("GravityVector");

    /**
     * Каждый кадр перед отрисовкой будет вызван этот метод
     * @param  {number} timeCoeff скорость игры
     */
    GravityVector.prototype.frame = function(timeCoeff) {
        this.y++;
    };

    return GravityVector;
});
