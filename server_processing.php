<?php
require 'ssp.class.php';

$sql = "select demo_1.* from demo_1 join demo_2"
      ." on demo_1.demo_1_id=demo_2.demo_1_id "
      ."where demo_1.id in("
      ."select demo_3.demo_1_id from demo_3 "
      ."where demo_3.name in('a','b','c')"
      .")";
$table = '(' . $sql . ') Demos';

// Table's primary key
$primaryKey = 'demo_1_id';
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case object
// parameter names
$columns = array(
    array('db' => 'demo_1_id', 'dt' => 0,
        'formatter' => function($d, $row) {
        $button="<button type='button'"
               ." onclick='alert("
               ."'".$d."'"
               .")'>Click Me!</button>";
        return $button;
        }),
    array('db' => 'demo_1_name', 'dt' => 1)
);

// SQL server connection information

$sql_details = array(
    'user' => '',
    'pass' => '',
    'db' => '',
    'host' => ''
);


echo json_encode(
        SSP::simple($_GET, $sql_details, $table, $primaryKey, $columns)
);