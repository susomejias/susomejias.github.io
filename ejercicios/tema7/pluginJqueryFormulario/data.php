<?php

  if ($_POST){
      // enviamos datos por POST
      echo "<p><b>Nombre</b>:</br>" .  $_POST['nombre'] . "</p><br/>";
      echo "<p><b>Apellidos</b>:</br>" .  $_POST['apellidos'] . "</p><br/>";
      echo "<p><b>Correo</b>:</br>" .  $_POST['correo'] . "</p><br/>";
      echo "<p><b>Textarea</b>:</br>" .  $_POST['textarea'] . "</p><br/>";
  }
?>
