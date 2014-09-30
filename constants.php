<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

define( 'SEARCH_URL', 'http://149.210.163.126/api/v3/'); // NEW DEV
// define( 'SEARCH_URL', 'http://dev.oipa.openaidsearch.org/api/v3/'); // OLD DEV
// define( 'SEARCH_URL', 'http://localhost:8000/api/v3/'); //  LOCAL
if (function_exists("site_url")){
	define( 'SITE_URL', site_url());
}
define( 'EMPTY_LABEL', 'No information available');
