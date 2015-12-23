define([
     "funcs",
     "classes/Vector/Vector"
], function(f, Vector) {
    "use strict";

    /**
     * Менеджер векторов, добавление, сложение и удаление векторов
     * @constructs VectorManager 
     */
    var VectorManager = f.CreateClass("VectorManager");

    /**
     * Базовая инициализация, создаем массив vectors, в котором будем хранить все векторы
     */
    VectorManager.prototype.init = function() {
         // initialize
         this.vectors = [];
    };

    /**
     * Добавить вектор в коллекцию
     * можно добавить либо экземпляр класса Vector или объект {x: number, y: number}
     * @param  {Vector | Object} vector либо объект с св-ми {x,y}, либо наследник Vector
     * @return {Vector} возвращает новосозданный или уже созданный вектор,
     * который добавлен в текущую коллекцию
     */
    VectorManager.prototype.add = function(vector) {
        if ( !(vector instanceof Vector) ) {
            vector = new Vector(vector);
        }

        this.vectors.push(vector);
        return vector;
    };

    /**
     * Удаление вектора из коллекции
     * @param  {Vector} vector вектор, который удаляем,
     * если он есть в колллекции
     */
    VectorManager.prototype.remove = function(vector) {
        var index = this.vectors.indexOf(vector);

        if ( index != -1 ) {
            this.vectors.splice(index, 1);
        }
    };

    /**
     * Некоторые векторы могут менять свою силу и направление
     * поэтому передаем им управление на каждом кадре
     * @param  {number} timeCoeff скорость игры
     */
    VectorManager.prototype.frame = function(timeCoeff) {
        var vector;

        for (var i = 0; i < this.vectors.length; i++) {
            vector = this.vectors[i];
            if ( vector.frame ) {
                vector.frame(timeCoeff);
            }
        }
    };

    /**
     * Игровому объекту необъодимо знать только результирующие направление
     * поэтому складываем все вектора
     * @return {object} направление {x: number, y: number}
     */
    VectorManager.prototype.getSumm = function() {
        var vector,
            summVector = new Vector({
                x: 0,
                y: 0
            });

        for (var i = 0; i < this.vectors.length; i++) {
            vector = this.vectors[i];
            summVector.x += vector.x;
            summVector.y += vector.y;
        }

        return summVector;
    };

    return VectorManager;
});
