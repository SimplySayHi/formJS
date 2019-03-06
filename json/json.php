<?php

    // Get JSON as a string
    $json_str = file_get_contents('php://input');

    // Get as an object
    //$json_obj = json_decode($json_str);
    //$json_str = json_encode($json_obj);

    echo $json_str;

?>