define([
     "funcs"
], function(f) {
    "use strict";

    /**
     * Пересечение двух хитбоксов есть соприкасновние.
     * Если необходимо проверить не столкнулись ли 2 объекта,
     * то необходимо проверить пересечение их хитбоксов
     * @exports Hitbox
     */
    var Hitbox = f.CreateClass("Hitbox");

    /**
     * хитбокс будет привязан к объекту,
     * поэтому он не должен иметь свои координаты
     */
    Hitbox.prototype.init = function() {
         // определяем коллекции фигур,
         // по которым будем определять пересечение хитбоксов
         this.figures = [];
    };

    /**
     * добавить фигуру "круг" или "линия" или подобное
     * @param  {Circle | Line} figure фигура попадающая в массив this.figures
     */
    Hitbox.prototype.addFigure = function(figure) {
        this.figures.push(figure);
    };


    /**
     * Следим за объектом,
     * задаем ему вектор трения
     * во время столкновений вектор трения будет изменять движение объектов
     * @param  {gameObject} gameObject объект, позиция которого влияет на
     */
    Hitbox.prototype.setGameObject = function(gameObject) {
        this.gameObject = gameObject;
        this.vector = this.gameObject.vectorManager.add();
    };

    /**
     * Определяем есть ли пересечение с другим хитбоксом или нету,
     * !!! учитываем вектора объектов,
     * !!! т.к. определить столкновение нужно до того как оно произойдет.
     * !!! это удобно, потому что мы можем изменять на ходу вектор объекта,
     * !!! чтобы найти вектор, необходимый для Не столкновения объектов
     * @param  {Hitbox} hitbox чужеродный хитбокс
     * @return {boolean}         true если есть пересечение
     */
    Hitbox.prototype.check = function(hitbox) {
        var figure, myFigure,
            vector0 = this.gameObject.vectorManager.getSumm(),
            x0 = this.gameObject.x + vector0.x,
            y0 = this.gameObject.y + vector0.y,
            vector1 = hitbox.gameObject.vectorManager.getSumm(),
            point0 = {
                x: x0,
                y: y0
            },
            x1 = hitbox.gameObject.x + vector1.x,
            y1 = hitbox.gameObject.y + vector1.y,
            point1 = {
                x: x1,
                y: y1
            };

        // красивее способа пока не придумал
        for (var i = 0; i < this.figures.length; i++) {
            myFigure = this.figures[i];

            for (var j = 0; j < hitbox.figures.length; j++) {
                figure = hitbox.figures[j];

                if ( myFigure["check" + figure.type](figure, point0, point1) ) {
                    return true;
                }
            }
        }

        return false;
    };

    /**
     * изменяем вектор объекта таким образом,
     * чтобы он не соприкоснулся с другим объектом
     * @param  {Hitbox} hitbox с которым идет столкновение
     *
     * TODO: учесть вариант соприкосновения с несколькими объектами
     */
    Hitbox.prototype.updateVector = function(hitbox) {
        // сначало определим хочет переместится текущий объект
        var summVector = this.gameObject.vectorManager.getSumm();
        // т.к. вектор трения влияет на движения объекта
        // вычтим его чтобы получить настоящие направление объекта
        summVector.x -= this.vector.x;
        summVector.y -= this.vector.y;

        // далее используем  простейший алгоритм поиска вектора трения,
        // будем смещать вектор от 0 на единичный вектор до тех пор,
        // пока не упремся в другой объект

        // определяем "еденичный вектор", длина которого равна 1px
        // этот вектор будет использован в цикле как смещение
        var stepVector = summVector.getUnit();

        // определяем округленную длину вектора в пикселях,
        // эта длина будет выступать в роли кол-во проверок
        var count = Math.ceil( summVector.getLength() );

        this.vector.x = 0;
        this.vector.y = 0;

        for (var i = 0; i < count; i++) {
            this.vector.x -= stepVector.x;
            this.vector.y -= stepVector.y;

            if ( !this.check(hitbox) ) {
                break;
            }
        }
    };

    /**
     * сбрасываем в ноль вектор трения
     * если это не делать перед проверкой на столкновения,
     * то объект будет после столкновения катиться в обратную сторону
     */
    Hitbox.prototype.clearVector = function() {
        this.vector.x = 0;
        this.vector.y = 0;
    };

    return Hitbox;
});
