<?php
// download-cv.php
$file = 'assets/SUBHAJIT-SETH-CV.pdf';
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="SUBHAJIT-SETH-CV.pdf"');
readfile($file);
exit;
?>
