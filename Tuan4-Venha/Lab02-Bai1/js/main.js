$(function () {
    // Tooltip nút thêm vào giỏ
    $('[data-toggle="tooltip"]').tooltip();

    // Thanh trạng thái kho: tính % đã bán, đổi màu theo mức độ
    $(".stock").each(function () {
        var sold = +$(this).data("sold");
        var total = +$(this).data("total");
        var p = Math.round(sold / total * 100);
        var $bar = $(this).find(".progress-bar").css("width", p + "%");
        $bar.text(p >= 80 ? "Sắp bán hết" : "Đã bán " + sold);
        $bar.addClass(p >= 80 ? "progress-bar-danger" : (p >= 50 ? "progress-bar-warning" : "progress-bar-success"));
    });

    // Bấm dấu + : tăng số trên biểu tượng giỏ hàng
    $(".add-to-cart a").on("click", function (e) {
        e.preventDefault();
        var $c = $("#cart-count");
        $c.text(+$c.text() + 1);
    });
});
$(function () {
    // Menu: sáng đúng trang đang mở
    var page = location.pathname.split("/").pop() || "ecommerce.html";
    if (page === "ecommerce-detail.html") page = "ecommerce.html";
    $("#main-navbar .navbar-nav:first > li").removeClass("active");
    $("#main-navbar .navbar-nav:first > li > a[href='" + page + "']").parent().addClass("active");

    // Đánh dấu lưới sản phẩm để CSS canh đều chiều cao thẻ
    $(".thumbnail.product").closest(".row").addClass("product-row");
});