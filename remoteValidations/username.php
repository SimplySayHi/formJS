<?php

    $json_str = file_get_contents('php://input');
    $data = json_decode($json_str, true);

    $username = $data['username'];
    $usedUsernames = array('valerio', 'dipunzio', 'username');
    $isUserTaken = in_array($username, $usedUsernames);

    $result = $isUserTaken ? 'false' : 'true';
    $obj = '{"result": ' . $result . '';

    if( $isUserTaken ){
        $obj .= ', "errors": {"alreadyExists": true}';
    }

    $obj .= '}';

    echo $obj;

?>