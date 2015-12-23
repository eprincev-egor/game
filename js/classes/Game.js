define([
     "funcs",
     "classes/GameObject",
     "classes/Hitbox/Hitbox",
     "classes/Vecor/Vector"
], function(f, GameObject, Hitbox, Vector) {
    "use strict";

    /**
     * Главный модуль
     * @exports Game
     * @type {Object}
     */
    var Game = {};

    /**
     * Базовый конструктор игровых объектов
     * @type {GameObject}
     */
    Game.Object = GameObject;

    /**
     * Класс отвечающий за проверку на пересечение объектов
     * @type {Hitbox}
     */
    Game.Hitbox = Hitbox;

    /**
     * Направление игровых объектов
     * @type {Vector}
     */
    Game.Vector = Vector;

    /**
     * Создание игрового объекта
     * @return {GameObject} новый игровой объект
     */
    Game.createObject = function() {
        return new GameObject();
    };

    return Game;
});
