var ajax_url = url + '/data_ssp.php';
var dataPost = {
    "field_1": 'data01',
    "field_2": 'data02',
    "field_3": 'data03',
    ....
};
var ordering=[[1,'asc'],[2,'desc']...];
initDataTable_ssp_post('your table id', ajax_url, dataPost,ordering);

function initDataTable_ssp_post(dataTable, ajax_url, data,ordering) {
    var i = $('#' + dataTable + ' tfoot th').length;
    var t = '1';

    $('#' + dataTable + ' tfoot th').each(function () {
        if (t !== '1') {
            var title = $('#' + dataTable + ' thead th').eq($(this).index()).text();
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
        }
        t = '2';
    });
    var table = $('#' + dataTable).DataTable({
        "scrollX": true,
        "bProcessing": true,
        "bDeferRender": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": ajax_url,
            "type": "POST",
            "data": data
        },
        "drawCallback": function( settings ) {
            //mass image
            //$("img.lazy").lazyload();//https://github.com/tuupola/jquery_lazyload
        },
        "order": ordering
    });

    // Apply the search
    table.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change', function () {
            that
                    .search(this.value)
                    .draw();
        });
    });

    new $.fn.dataTable.FixedColumns(table);

}
