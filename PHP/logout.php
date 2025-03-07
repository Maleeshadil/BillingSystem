<?php

// --Logout--

//session start
session_start();
//session variable unset
session_unset();
//session destroy
session_destroy();

//Redirect index.php

header("location:../index.php");
