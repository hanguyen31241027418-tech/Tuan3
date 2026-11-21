$(function () {
    // xZoom: rê chuột vào ảnh lớn để phóng to, bấm ảnh nhỏ để đổi ảnh
    $('.xzoom, .xzoom-gallery').xzoom({ zoomWidth: 400, title: true, tint: '#333', Xoffset: 15 });

    // Chọn phiên bản: chỉ 1 nút được active
    $(".version-group .btn").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    // Thêm vào giỏ (trang chi tiết)
    $("#btn-add-cart").on("click", function () {
        var qty = parseInt($("#number").val(), 10) || 1;
        var $c = $("#cart-count");
        $c.text(+$c.text() + qty);
    });
});
