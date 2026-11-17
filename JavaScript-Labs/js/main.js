// Chuyển tab kiến thức giữa Lab 08, 09, 10
document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".tabs button");
    var panels = document.querySelectorAll(".panel");

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            buttons.forEach(function (b) { b.classList.remove("active"); });
            panels.forEach(function (p) { p.classList.remove("active"); });
            btn.classList.add("active");
            document.getElementById(btn.dataset.target).classList.add("active");
        });
    });
});
