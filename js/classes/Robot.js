define([
     "funcs",
     "jquery",
     "classes/GameObject"
], function(f, $, GameObject) {
    "use strict";

    var Robot = f.CreateClass("Robot", {
        width: 150,
        height: 250
    }, GameObject);

    Robot.prototype.draw = function(ctx) {
        var x = this.x,
            y = this.y,
            w = this.width,
            h = this.height;


        ctx.save();

        ctx.strokeStyle = "orange";
        ctx.rect(x - w/2, y - h/2, w, h);
        ctx.stroke();

        // HEAD
        var headRadius = w / 7;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(x, y - h/2 + headRadius, headRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y - h/1.9 + headRadius, headRadius/3, 0, Math.PI * 2);
        ctx.stroke();

        var bodyWidth = w / 3;
        var bodyHeight = h / 3;
        var bodyY = y - h / 2 + headRadius * 2.3;

        //ctx.rect(x - bodyWidth/2, bodyY, bodyWidth, bodyHeight);
        //ctx.stroke();

        // BODY
        ctx.moveTo(x, bodyY);
        ctx.quadraticCurveTo(
            x + bodyWidth, bodyY - bodyHeight / 8,
            x + bodyWidth/3, bodyY + bodyHeight
        );
        ctx.stroke();

        ctx.moveTo(x, bodyY);
        ctx.quadraticCurveTo(
            x - bodyWidth, bodyY - bodyHeight / 8,
            x - bodyWidth/3, bodyY + bodyHeight
        );
        ctx.stroke();

        ctx.moveTo(x - bodyWidth/3, bodyY + bodyHeight);
        ctx.quadraticCurveTo(
            x, bodyY + bodyHeight * 1.5,
            x + bodyWidth/3, bodyY + bodyHeight
        );
        ctx.stroke();

        //LEFT HAND
        ctx.moveTo(x - bodyWidth / 1.8, bodyY);
        ctx.quadraticCurveTo(
            x - w/2.7, y - h/3,
            x - bodyWidth * 1.2, bodyY + headRadius
        );
        ctx.stroke();
        ctx.moveTo(x - bodyWidth * 1.2, bodyY + headRadius);
        ctx.quadraticCurveTo(
            x - w/2.3, y + headRadius,
            x - bodyWidth / 1.8, bodyY
        );
        ctx.stroke();

        //RIGHT HAND
        ctx.moveTo(x + bodyWidth / 1.8, bodyY);
        ctx.quadraticCurveTo(
            x + w/2.7, y - h/3,
            x + bodyWidth * 1.2, bodyY + headRadius
        );
        ctx.stroke();
        ctx.moveTo(x + bodyWidth * 1.2, bodyY + headRadius);
        ctx.quadraticCurveTo(
            x + w/2.3, y + headRadius,
            x + bodyWidth / 1.8, bodyY
        );
        ctx.stroke();

        ctx.restore();
    };

    return Robot;
});
