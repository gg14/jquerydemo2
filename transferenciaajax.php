<?php

// Simulate db 

$banco= $_REQUEST['banco'];
$beneficiario= $_REQUEST['beneficiario'];
$persona= $_REQUEST['persona'];
$cedula= $_REQUEST['cedula'];
$cuenta= $_REQUEST['cuenta'];
$monto= $_REQUEST['monto'];

if ($banco !="" && $beneficiario !="" && $persona !="" && $cedula !="" && $cuenta !="" && $monto)
    { 
    echo true;
    } else {
    echo false;

    }

?>