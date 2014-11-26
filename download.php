<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', True);

include_once('curl.class.php');

class Downloader {
    private $_api_host = 'http://149.210.163.126/api/v3/indicator-data/';

    public function __construct($request) {
        $this->type = urlencode($request['type']);
        $this->code = urlencode($request['code']);
        $this->format = urlencode($request['format']);
    }

    public function get_headers($content_length) {
        $headers = array(
            "Cache-Control: public",
            "Content-Description: File Transfer",
            //"Content-Length: ". $content_length .";",
            "Content-Disposition: attachment; filename=indicator_data_" . $this->code . "." . $this->format . ";",
            "Content-Type: text/" . $this->format . ";"
        );
        return array();
        return $headers;
    }

    public function print_headers($content_length) {
        foreach ($this->get_headers($content_length) as $header) {
            header($header);
        }
    }

    public function get_url() {
        $url = $this->_api_host . '?';

        $options = array('format=json');

        if (in_array($this->type, array('countries', 'cities', 'indicators'))) {
            $options[] = $this->type . '__in=' . $this->code;
        }

        return $url . implode('&', $options);
    }

    public function get_data() {
        $url = $this->get_url();

        $curl = new cURL(False);

        $data = $curl->get($url);

        return $data;
    }

    public function print_data($data) {
        if ($this->format == 'csv') {
            return $this->print_csv_data($data);
        }

        print($data);
    }

    public function print_csv_data($data) {
        $columns = array(
                         'category',
                         'indicator',
                         'indicator_friendly',
                         'type_data',

                         // Location information
                         'latitude',
                         'longitude',
                         'country_id',
                         'name',

                         // Yearly data
                         'year',
                         'value',);
        echo(implode(',', $columns));
        echo("\n");


        $decoded = json_decode($data, $assoc=True);

        foreach ($decoded as $id => $indicator) {
            $line_base = array(
                $indicator['category'],
                $indicator['indicator'],
                $indicator['indicator_friendly'],
                $indicator['type_data']
            );

            foreach ($indicator['locs'] as $id => $location) {
                $line = $line_base;
                $line[] = $location['latitude'];
                $line[] = $location['longitude'];

                if (!empty($location['country_id'])) {
                    $line[] = $location['country_id'];
                } else {
                    $line[] = $location['id'];
                }
                $line[] = $location['name'];

                foreach ($location['years'] as $year => $value) {
                    echo(implode(',', $line) . ',' . $year . ',' . $value);
                    echo("\n");
                }
            }
        }
    }
}

$downloader = new Downloader($_GET);

$data = $downloader->get_data();

$downloader->print_headers(strlen($data));

$downloader->print_data($data);
