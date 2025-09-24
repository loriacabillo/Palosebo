<?php
$data = json_decode(file_get_contents("php://input"), true);
file_put_contents("scores.txt", json_encode($data)."\n", FILE_APPEND);
echo "Score saved!";
?>
