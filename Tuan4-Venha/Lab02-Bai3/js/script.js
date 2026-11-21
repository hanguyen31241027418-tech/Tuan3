$(function () {
    // ===== Khai báo object =====
    var container = $('#container');
    var bird      = $('#bird');
    var pole      = $('.pole');
    var pole_1    = $('#pole_1');
    var pole_2    = $('#pole_2');
    var score     = $('#score');
    var levelBox  = $('#level');
    var message   = $('#message');

    // ===== Thông số game =====
    var container_width  = container.width();
    var container_height = container.height();
    var pole_initial_position = parseInt(pole.css('right'), 10); // -64
    var pole_initial_height   = parseInt(pole.css('height'), 10);
    var pole_width   = pole_1.outerWidth(true);
    var bird_left    = parseInt(bird.css('left'), 10);
    var bird_width   = bird.width();
    var bird_height  = bird.height();

    // Level: level -> interval (ms, càng nhỏ game càng nhanh)
    var INTERVALS = { 1: 40, 2: 30, 3: 25, 4: 20 };
    var WIN_SCORE = 50;

    // Vật lý (đã chỉnh cho dễ chơi hơn bản gốc)
    var GRAVITY    = 0.6;  // lực rơi mỗi tick
    var JUMP       = -8;   // vận tốc bay lên khi bấm phím
    var POLE_SPEED = 5;    // ống chạy 5px mỗi tick (bản gốc là 10)
    var HIT_PAD    = 6;    // "khoan dung" va chạm: thu nhỏ vùng va chạm của chim 6px

    // ===== Trạng thái =====
    var level = 1, the_game = null;
    var started = false, game_over = false, score_updated = false;
    var bird_top = parseInt(bird.css('top'), 10);
    var velocity = 0;
    var pole_pos = pole_initial_position;

    // ===== Vòng lặp game =====
    function startLoop() {
        clearInterval(the_game);
        the_game = setInterval(gameLoop, INTERVALS[level]);
    }

    function gameLoop() {
        // Chim: rơi theo trọng lực, nghiêng theo vận tốc
        velocity += GRAVITY;
        bird_top += velocity;
        var angle = Math.max(-25, Math.min(60, velocity * 5));
        bird.css({ top: bird_top + 'px', transform: 'rotate(' + angle + 'deg)' });

        // Ống: chạy sang trái, ra khỏi khung thì quay lại với độ cao ngẫu nhiên
        pole_pos += POLE_SPEED;
        if (pole_pos > container_width) {
            var h = Math.floor(Math.random() * 100);
            pole_1.css('height', pole_initial_height + h);
            pole_2.css('height', pole_initial_height - h);
            pole_pos = pole_initial_position;
            score_updated = false;
        }
        pole.css('right', pole_pos + 'px');

        // Va chạm -> thua
        if (hit()) { endGame(false); return; }

        // Chim bay qua hết cặp ống -> cộng điểm
        if (!score_updated && container_width - pole_pos < bird_left) {
            score_updated = true;
            addScore();
        }
    }

    // Tính điểm, lên level, thắng
    function addScore() {
        var s = parseInt(score.text(), 10) + 1;
        score.text(s);
        if (s >= WIN_SCORE) { endGame(true); return; }

        var newLevel = s >= 40 ? 4 : s >= 20 ? 3 : s >= 5 ? 2 : 1;
        if (newLevel !== level) {
            level = newLevel;
            levelBox.text('Level ' + level);
            startLoop(); // đổi interval theo level mới
        }
    }

    // Va chạm: so sánh toạ độ chim với 2 ống (không dùng offset để tránh bị sai khi chim nghiêng)
    function hit() {
        if (bird_top <= 0 || bird_top + bird_height >= container_height) return true;

        var bl = bird_left + HIT_PAD, br = bird_left + bird_width - HIT_PAD;
        var bt = bird_top + HIT_PAD,  bb = bird_top + bird_height - HIT_PAD;
        var pl = container_width - pole_pos - pole_width;
        var pr = container_width - pole_pos;

        if (br < pl || bl > pr) return false; // chưa chạm theo chiều ngang

        var h1 = pole_1.outerHeight(true), h2 = pole_2.outerHeight(true);
        return bt < h1 || bb > container_height - h2;
    }

    function endGame(win) {
        clearInterval(the_game); // lỗi bản gốc: clearInterval(playGame()) lại chạy thêm 1 vòng lặp mới
        game_over = true;
        message.html(win ? '🎉 Chiến thắng!<br>' + WIN_SCORE + ' điểm' : 'Game over').show();
        $('#restart_btn').slideDown();
    }

    function startGame() {
        if (started) return;
        started = true;
        $('#play_btn').hide();
        startLoop();
    }

    // ===== Điều khiển =====
    // Thay mousedown bằng keydown: phím mũi tên xuống (keyCode 40)
    $(document).on('keydown', function (e) {
        if (e.which !== 40) return;
        e.preventDefault();                                    // không cho trang cuộn xuống
        if (e.originalEvent && e.originalEvent.repeat) return; // giữ phím không tính nhiều lần
        if (game_over) return;
        startGame();
        velocity = JUMP;                                       // mỗi lần bấm = 1 cú vỗ cánh
    });

    $('#play_btn').click(startGame);
    $('#restart_btn').click(function () { location.reload(); });
});
