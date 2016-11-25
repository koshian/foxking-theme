window.addEventListener("load", function(){
    /* from hatenablog.js (official) */
    function detectDate() {
        // archiveのとき, 一番上の日付から年を読む
        var page = window.location.pathname.split('/')[1];
        if (page === 'archive') {
            var $entry = $('section.archive-entry:first');
            if ($entry.length > 0) {
                var year_month_day = $entry.find('div.date > a > time').attr('datetime');
                var year_str = year_month_day.split('-')[0];
                var month_str = year_month_day.split('-')[1];

                return { year: year_str, month: month_str };
            }

            return null;
        }
    }

    function setupCalendar($archive) {
        var $selector = $archive.find('.js-archive-module-calendar-selector');

        var updateCalendar = function updateCalendar() {
            var $date = $selector.find('option:selected');
            var year = $date.data('year');
            var month = $date.data('month');
            $.ajax({
                type: 'get',
                url: URLGenerator.user_blog_url('/archive_module_calendar'),
                data: { month: month, year: year }
            }).done(function (res) {
                // days object
                $archive.find('.js-archive-module-calendar-container').html(res);
            });
        };

        $selector.change(function () {
            updateCalendar();
        });

        // 表示ページに合わせてカレンダーを初期化
        var date = detectDate();
        if (date) {
            $selector.val(date['year'] + ' ' + date['month']);
        }
        updateCalendar();
    };

    function setupDefault($archive) {
        var $open_year;
        var date = detectDate();
        if (date) {
            var year = date['year'];
            if (year) {
                var $year = $archive.find('li.archive-module-year[data-year="' + year + '"]');

                $open_year = $year.length > 0 ? $year : null;
            }
        }

        $open_year = $open_year || $('li.archive-module-year:first');
        $open_year.removeClass('archive-module-year-hidden');

        $archive.find('.archive-module-button').click(function (e) {
            e.preventDefault();

            var $year = $(this).parent('.archive-module-year');
            $year.toggleClass('archive-module-year-hidden');
        });
    }
    /* end hatenablog.js ( official ) */

    $('.hatena-urllist li').each(function() {
        var r = $(this).html().replace(/(\()(\d+)(\))(.*)/g,
                                       "<span class=\"badge\">$2</span></li>");
        $(this).html(r);
    });

    $('a .badge').each(function(){
        var p = $(this).parent()
        $(this).insertAfter(p);

    });

    $('.hatena-module-archive').each(function(){
        var archive = $(this);
        if (archive.data('archiveType') == 'calendar') {
                setupCalendar(archive);
            } else {
                setupDefault(archive);
            }
    });
}, false);
