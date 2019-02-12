<?php

header('Content-type: text/plain; charset=utf-8');

$students = array(
    array('first_name' => 'Jesús', 'last_name' => 'Mejías Leiva'),
    array('first_name' => 'Javier', 'last_name' => 'perez perez'),
    array('first_name' => 'Guillermo', 'last_name' => 'Boquizo Sánchez'),
    array('first_name' => 'Angelo', 'last_name' => 'Barbara'),
    array('first_name' => 'Rafael', 'last_name' => 'Garcia Zurita')
);
$results = array();

if ($_GET["search"]){
  foreach ($students as $key => $student) {
        if (preg_match('/' . $_GET["search"] . '/i', $student['first_name'] ." ".$student['last_name'])){
            array_push($results,$student);
        }
  }

  if (sizeof($results) === 0){
    echo "No se encontraron resultados";
  }else{
    echo json_encode($results, JSON_UNESCAPED_UNICODE);
  }


}
?>
