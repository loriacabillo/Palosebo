<?php
$prizes = ["Candy", "Dependes Sabot", "10 pesos", "Keychain"];
echo json_encode($prizes[array_rand($prizes)]);
?>
