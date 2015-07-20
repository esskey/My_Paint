
/*jslint browser:true, node:true */
/*jslint indent:4 */
/*global $,prompt*/
/*jshint strict: true */
"use strict";

$(document).ready(function () {
    var canvas,
        context,
        pression,
        lastX,
        lastY,
        posX,
        posY,
        posXbis,
        posYbis,
        radius,
        value,
        longueur,
        largeur,
        valeur,
        color_trait,
        color_fond,
        saisie,
        style,
        font,
        size,
        boutton;

    canvas = document.getElementById('papier');
    context = canvas.getContext('2d');
    boutton = "body .button";
    pression = false;
    color_fond = "transparent";


    $('#largeur').on('change', function () {
        valeur = $("#largeur").val();
    });

    $("#reset").click(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    $("#affiche").click(function () {
        window.location = canvas.toDataURL("image/png");
    });

    $("#download").click(function () {
        this.href = canvas.toDataURL('image/png');
    });

    $("#color_trait").change(function (e) {
        color_trait = e.delegateTarget.value;
    });

    $("#color_fond").change(function (e) {
        color_fond = e.delegateTarget.value;
    });

    canvas.width = 900;
    canvas.height = 500;

    $(boutton).click(function () {
        value = $(this).html();
    });

    function dessin(x, y, isDown) {
        if (isDown) {
            context.beginPath();
            context.strokeStyle = color_trait;
            context.lineWidth = valeur;
            context.lineJoin = "round";
            context.moveTo(lastX, lastY);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
        }

        lastX = x;
        lastY = y;
    }

    function ligne(x, y) {
        context.beginPath();
        context.strokeStyle = color_trait;
        context.lineWidth = valeur;
        context.moveTo(x, y);

        if (pression === false) {
            context.lineTo(posX, posY);
            context.stroke();
        } else {
            context.lineTo(lastX, lastY);
            context.stroke();
        }
    }

    function rectangle(x, y, longueur, largeur) {
        context.beginPath();
        context.rect(x, y, longueur, largeur);
        context.fillStyle = color_fond;
        context.fill();
        context.lineWidth = valeur;
        context.strokeStyle = color_trait;
        context.stroke();
    }

    function cercle(x, y, radius) {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, true);
        context.strokeStyle = color_trait;
        context.lineWidth = valeur;
        context.fillStyle = color_fond;
        context.fill();
        context.stroke();
    }

    $(canvas).mousedown(function (e) {
        if (value === "crayon") {
            pression = true;

            posX = e.clientX - this.offsetLeft;
            posY = e.clientY - this.offsetTop;

            dessin(posX, posY, false);
        }
    });

    $(canvas).mousemove(function (e) {
        if (value === "crayon") {
            if (pression === true) {
                posX = e.clientX - this.offsetLeft;
                posY = e.clientY - this.offsetTop;
                dessin(posX, posY, true);
            }
        }
    });

    $(canvas).mouseup(function () {
        if (value === "crayon") {
            pression = false;
        }
    });

    $(canvas).click(function (e) {
        if (value === "ligne") {
            if (pression === false) {
                posX = e.clientX - this.offsetLeft;
                posY = e.clientY - this.offsetTop;

                ligne(posX, posY);

                pression = true;

            } else if (pression === true) {
                lastX = e.clientX - this.offsetLeft;
                lastY = e.clientY - this.offsetTop;

                pression = false;
                ligne(lastX, lastY);
            }
        }

        if (value === "rectangle") {
            if (pression === false) {
                posX = e.clientX - this.offsetLeft;
                posY = e.clientY - this.offsetTop;

                pression = true;
            } else if (pression === true) {
                longueur = (e.clientX - this.offsetLeft) - posX;
                largeur = (e.clientY - this.offsetTop) - posY;

                pression = false;

                rectangle(posX, posY, longueur, largeur);
            }
        }

        if (value === "cercle") {

            if (pression === false) {
                posX = e.clientX - this.offsetLeft;
                posY = e.clientY - this.offsetTop;

                pression = true;
            } else if (pression === true) {
                posXbis = e.clientX - this.offsetLeft;
                posYbis = e.clientY - this.offsetTop;
                radius = Math.sqrt(Math.pow((posXbis - posX), 2) + Math.pow((posYbis - posY), 2));

                pression = false;

                cercle(posX, posY, radius);
            }
        }

        if (value === "texte") {
            saisie = prompt("Saisissez votre texte :");
            style = prompt("Saisissez votre style:");
            font = "Calibri";
            size = $('#size').val();

            posX = e.clientX - this.offsetLeft;
            posY = e.clientY - this.offsetTop;

            if (saisie !== null && size !== null && font !== null) {
                console.log(size);
                context.fillStyle = color_trait;
                context.font = style + " " + size + "px " + font;
                context.fillText(saisie, posX, posY);
            }
        }
    });
});