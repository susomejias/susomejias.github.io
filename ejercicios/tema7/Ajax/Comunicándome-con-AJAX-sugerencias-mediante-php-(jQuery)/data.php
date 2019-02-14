<?php

header('Content-type: text/plain; charset=utf-8');

$students = array(
    array('first_name' => 'Jesús', 'last_name' => 'Mejías Leiva'),
    array('first_name' => 'José Rafael', 'last_name' => 'Álvarez Espino'),
    array('first_name' => 'Guillermo', 'last_name' => 'Boquizo Sánchez'),
    array('first_name' => 'Angelo', 'last_name' => 'Barbara'),
    array('first_name' => 'José Manuel', 'last_name' => 'Bravo Martínez'),
    array('first_name' => 'Juan Antonio', 'last_name' => 'Bujalance Martínez'),
    array('first_name' => 'Javier', 'last_name' => 'Frías Serrano'),
    array('first_name' => 'Samuel', 'last_name' => 'Luque Reyes'),
    array('first_name' => 'Adrián', 'last_name' => 'Moya Moruno'),
    array('first_name' => 'Mario', 'last_name' => 'Navarro Madrid'),
    array('first_name' => 'Francisco', 'last_name' => 'Ramírez Ruíz'),
    array('first_name' => 'José María', 'last_name' => 'Romero Ruíz'),
    array('first_name' => 'Rafael', 'last_name' => 'Sojo Ruíz'),
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
