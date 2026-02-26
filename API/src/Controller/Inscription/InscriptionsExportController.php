<?php

use Src\Service\Inscription\InscriptionsByEventSearcherService;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;

final readonly class InscriptionsExportController
{
    private InscriptionsByEventSearcherService $service;

    public function __construct()
    {
        $this->service = new InscriptionsByEventSearcherService();
    }

    public function start(int $id_event): void
    {
        try {

            $inscriptions = $this->service->searchByEvent($id_event);

            if (empty($inscriptions)) {
                http_response_code(404);
                echo "No hay inscriptos para este evento.";
                exit;
            }

            $eventTitle = $inscriptions[0]->eventTitle();

            // CREAR SPREADSHEET

            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Inscriptos');

            // ENCABEZADO INSTITUCIONAL

            $sheet->setCellValue('A1', 'PLANILLA DE INSCRIPTOS');
            $sheet->mergeCells('A1:D1');
            $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(18);
            $sheet->getStyle('A1')->getAlignment()
                ->setHorizontal(Alignment::HORIZONTAL_CENTER);

            $sheet->setCellValue('A3', 'Curso:');
            $sheet->setCellValue('B3', $eventTitle);

            $sheet->setCellValue('A4', 'Fecha de exportación:');
            $sheet->setCellValue('B4', date('d/m/Y'));

            $sheet->setCellValue('A5', 'Total inscriptos:');
            $sheet->setCellValue('B5', count($inscriptions));

            // ENCABEZADOS TABLA

            $sheet->setCellValue('A7', 'Nombre');
            $sheet->setCellValue('B7', 'Apellido');
            $sheet->setCellValue('C7', 'Email');
            $sheet->setCellValue('D7', 'Teléfono');

            $sheet->getStyle('A7:D7')->getFont()->setBold(true);

            $sheet->getStyle('A7:D7')->getAlignment()
                ->setHorizontal(Alignment::HORIZONTAL_CENTER);

            $sheet->getStyle('A7:D7')->getFill()
                ->setFillType(Fill::FILL_SOLID)
                ->getStartColor()->setRGB('E5E5E5');

            // DATOS

            $row = 8;

            foreach ($inscriptions as $ins) {
                $sheet->setCellValue("A$row", $ins->name());
                $sheet->setCellValue("B$row", $ins->surname());
                $sheet->setCellValue("C$row", $ins->email());
                $sheet->setCellValue("D$row", $ins->phone());
                $row++;
            }

            // ESTILOS TABLA

            $sheet->getStyle("A7:D" . ($row - 1))
                ->getBorders()
                ->getAllBorders()
                ->setBorderStyle(Border::BORDER_THIN);

            // Tamaños cómodos
            $sheet->getColumnDimension('A')->setWidth(20);
            $sheet->getColumnDimension('B')->setWidth(20);
            $sheet->getColumnDimension('C')->setWidth(30);
            $sheet->getColumnDimension('D')->setWidth(18);

            // Congelar encabezado
            $sheet->freezePane('A8');

            // CONFIGURACIÓN IMPRESIÓN A4

            $sheet->getPageSetup()
                ->setOrientation(PageSetup::ORIENTATION_PORTRAIT)
                ->setPaperSize(PageSetup::PAPERSIZE_A4);

            $sheet->getPageSetup()->setFitToWidth(1);

            $sheet->getPageMargins()->setTop(0.5);
            $sheet->getPageMargins()->setRight(0.5);
            $sheet->getPageMargins()->setLeft(0.5);
            $sheet->getPageMargins()->setBottom(0.5);

            // DESCARGA

            $filename = 'inscriptos_evento_' . $id_event . '.xlsx';

            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header("Content-Disposition: attachment; filename=\"$filename\"");
            header('Cache-Control: max-age=0');

            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');

        } catch (\Throwable $e) {
            http_response_code(500);
            echo "Error interno al generar el Excel.";
        }

        exit;
    }
}