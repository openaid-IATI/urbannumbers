<?php
/*
Template Name: Create infographic
*/

ob_start(); // ensures anything dumped out will be caught

$current_user = wp_get_current_user();

$popups = new Popups();
$popups->init();

if (!empty($_POST)){

    // get infographic data
    $title = "";
    $subtitle = "";
    $user_name = "";
    $infographic_content = "";
    $visualisations = "";

    if (isset($_POST["title"])) {
        $title = $_POST["title"];
    }
    if (isset($_POST["user-name"])) {
        $name = $_POST["user-name"];
    }
    if (isset($_POST["description"])) {
        $description = $_POST["description"];
    }

    // TO DO: save data in django

    // TEMP: save in wordpress
    $my_infographic = array(
      'post_title'    => $title,
      'post_content'  => $description,
      'post_status'   => 'publish',
      'post_type'     => 'infographic'
    );

    $visualisations = $_POST;
    if (array_key_exists("title", $visualisations)) {
        unset($visualisations["title"]);
    }
    if (array_key_exists("user-name", $visualisations)) {
        unset($visualisations["user-name"]);
    }
    if (array_key_exists("description", $visualisations)) {
        unset($visualisations["description"]);
    }

    $infographic_id = wp_insert_post($my_infographic);

    add_post_meta($infographic_id, "user-name", $name);
    add_post_meta($infographic_id, "visualisations", $visualisations);
    $url = get_permalink($infographic_id);

    while (ob_get_status()) {
        ob_end_clean();
    }
    header( "Location: $url" );
}


get_header(); the_post(); ?>

<form id="infographic-form" role="form" action="/create-infographic/" method="post" enctype="multipart/form-data">

    <div id="main">
        <!-- main-container -->
        <div class="main-container">
            <div class="container ci-main">
                <h1>Build data report</h1>
                <div class="helper">
                    <i class="helper-icon glyphicon glyphicon-question-sign"></i>
                    <div class="helper-popup">
                        <?php echo $popups->get('title_description', 'popup_title_description'); ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="container-sort" id="indicator-filter-wrapper">
                <div class="sort-holder">
                    <div class="container ci-main">
                        <div class="ci-controls row">
                            <div class="steps-nav col-md-9">
                                <ul>
                                  <li><a href="javascript: void(0)" class="step_0">Describe</a></li>
                                  <li><a href="javascript: void(0)" class="step_1">Select indicators</a></li>
                                  <li><a href="javascript: void(0)" class="step_2">Select regions</a></li>
                                  <li><a href="javascript: void(0)" class="step_3">Select countries</a></li>
                                  <li><a href="javascript: void(0)" class="step_4">Select cities</a></li>
                                </ul>
                            </div>
                            <div class="col-md-3">
                                <a href="javascript:void(0)" class="next_step btn btn-success">Next step</a>
                                <a href="javascript: document.getElementById('infographic-form').submit()" class="save_btn btn btn-success">Create report</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- main-container -->
        <div class="main-container body">
            <div class="container ci-main">
                <br />
                <div id="ci-pages">
                    <div id="page_0" class="page">
                        <div class="form-group">
                          <label for="title" class="label">Title <span class="required">*</span></label>
                          <input value="<?php if (isset($_POST["title"])){ echo $_POST["title"]; } ?>" name="title" type="text" class="form-control">
                        </div>

                        <div class="form-group">
                          <label for="user-name" class="label">Name <span class="required">*</span></label>
                          <input value="<?php
                              if(is_user_logged_in()) {
                                  $current_user->display_name;
                              }?>" name="user-name" type="text" class="form-control">
                        </div>

                        <div class="form-group">
                          <label for="descriptin" class="label">Text <span>max 60 words</span></label>
                          <textarea name="description" class="form-control" rows="10"></textarea>
                        </div>

                    </div>
                    <div id="page_1" class="page">
                        <label class="label">Pick indicators</label>
                        <ul class="sort-list tabs-header">
                            <li class="Cityprosperity-li open">
                                <div>
                                    <a name="Cityprosperity" class="opener filter-open" href="#"><label class="top">City prosperity</label> <span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Slumdwellers-li">
                                <div>
                                    <a name="Slumdwellers" class="opener filter-open" href="#"><label class="top">Slum dwellers</label> <span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Population-li">
                                <div>
                                    <a name="Population" class="opener filter-open" href="#"><label class="top">Population</label></span><span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Streets-li">
                                <div>
                                    <a name="Streets" class="opener filter-open" href="#"><label class="top">Streets</label><span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Transport-li">
                                <div>
                                    <a name="Transport" class="opener filter-open" href="#"><label class="top">Transport</label><span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Health-li">
                                <div>
                                    <a name="Health" class="opener filter-open" href="#"><label class="top">Health</label><span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Resilience-li">
                                <div>
                                    <a name="Resilience" class="opener filter-open" href="#"><label class="top">Resilience</label><span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Education-li">
                                <div>
                                    <a name="Education" class="opener filter-open" href="#"><label class="top">Education</label><span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Crime-li">
                                <div>
                                    <a name="Crime" class="opener filter-open" href="#"><label class="top">Crime</label><span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Landarea-li">
                                <div>
                                    <a name="Landarea" class="opener filter-open" href="#"><label class="top">Landarea</label><span class="counts"></span></a>
                                </div>
                            </li>
                            <li class="Other-li">
                                <div>
                                    <a name="Other" class="opener filter-open" href="#"><label class="top">Other Data</label> <span class="counts"></span></a>
                                </div>
                            </li>
                        </ul>
                        <div class="tabs-body">
                            <div class="Cityprosperity-list subul open">
                            </div>

                            <div class="Slumdwellers-list subul">
                            </div>

                            <div class="Population-list subul">
                            </div>

                            <div class="Streets-list subul">
                            </div>

                            <div class="Transport-list subul">
                            </div>

                            <div class="Health-list subul">
                            </div>

                            <div class="Resilience-list subul">
                            </div>

                            <div class="Education-list subul">
                            </div>

                            <div class="Crime-list subul">
                            </div>

                            <div class="Landarea-list subul">
                            </div>

                            <div class="Other-list subul">
                            </div>
                        </div>
                    </div>
                    <div id="page_2" class="page">
                        <label class="label">Choose region</label>
                        <ul class="sort-list tabs-header">
                            <li class="regions-li">
                                <div>
                                    <a name="regions" class="opener filter-open" href="#"><label class="top">REGIONS</label> <span class="counts"></span></a>
                                </div>
                            </li>
                        </ul>
                        <div class="tabs-body">
                            <div class="regions-list subul open">
                            </div>
                        </div>
                    </div>
                    <div id="page_3" class="page">
                        <label class="label">Add country</label>
                        <ul class="sort-list tabs-header">
                            <li class="countries-li">
                                <div>
                                    <a name="countries" class="opener filter-open" href="#"><label class="top">COUNTRY</label> <span class="counts"></span></a>
                                </div>
                            </li>
                       </ul>

                       <div class="tabs-body">
                            <div class="countries-list subul open">
                            </div>
                       </div>
                    </div>
                    <div id="page_4" class="page">
                        <label class="label">Add city</label>
                        <ul class="sort-list tabs-header">
                            <li class="cities-li">
                                <div>
                                    <a name="cities" class="opener filter-open" href="#"><label class="top">CITY</label> <span class="counts"></span></a>
                                </div>
                            </li>
                        </ul>

                       <div class="tabs-body">
                            <div class="cities-list subul open">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container ci-main">
            <div class="ci-controls row">
                <div class="col-md-3 col-md-offset-9">
                    <a href="javascript:void(0)" class="next_step btn btn-success">Next step</a>
                    <a href="javascript: document.getElementById('infographic-form').submit()" class="save_btn btn btn-success">Create report</a>
                </div>
                  <br clear="all" />
<br />
            </div>
        </div>
    </div>
</form>

<div class="alert alert-danger" id="form-alert"></div>

<?php get_template_part("footer", "scripts"); ?>
<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/create-infographic.css" />
<script src="<?php echo get_template_directory_uri(); ?>/js/urbannumbers-create-infographic.js" type="text/javascript"></script>

<?php get_footer(); ?>
