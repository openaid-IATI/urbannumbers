<?php
/*
Template Name: Create infographic
*/

ob_start(); // ensures anything dumped out will be caught

$current_user = wp_get_current_user();


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
    if (isset($_POST["name"])) {
        $name = $_POST["name"];
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
    if (array_key_exists("name", $visualisations)) {
        unset($visualisations["name"]);
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
                <h1>Create infographic</h1>
            </div>
        </div>
        <div class="main-container">
            <div class="container-sort" id="indicator-filter-wrapper">
                <div class="sort-holder">
                    <div class="container ci-main">
                        <div class="ci-controls row">
                            <div class="steps-nav col-md-8">
                                <a href="javascript: void(0)" class="step_0 btn">Step 1</a>
                                <a href="javascript: void(0)" class="step_1 btn">Step 2</a>
                                <a href="javascript: void(0)" class="step_2 btn">Step 3</a>
                                <a href="javascript: void(0)" class="step_3 btn">Step 4</a>
                                <a href="javascript: void(0)" class="step_4 btn">Step 5</a>
                            </div>
                            <div class="col-md-4">
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
                          <label for="title" class="label">Title</label>
                          <input value="<?php if (isset($_POST["title"])){ echo $_POST["title"]; } ?>" name="title" type="text" class="form-control">
                        </div>

                        <div class="form-group">
                          <label for="name" class="label">Name</label>
                          <input value="<?php
                              if(is_user_logged_in()) {
                                  $current_user->display_name;
                              }?>" name="name" type="text" class="form-control">
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
                            <li class="Publicspaces-li">
                                <div>
                                    <a name="Publicspaces" class="opener filter-open" href="#"><label class="top">Public spaces</label> <span class="counts"></span></a>
                                </div>
                            </li>
                        </ul>
                        <div class="tabs-body">
                            <div class="Cityprosperity-list subul open">
                            </div>

                            <div class="Slumdwellers-list subul">
                            </div>

                            <div class="Publicspaces-list subul">
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
                <br />
                <div>
                    <a href="javascript:void(0)" class="next_step btn btn-success">Next step</a>
                    <a href="javascript: document.getElementById('infographic-form').submit()" class="save_btn btn btn-success">Create report</a>
                </div>
            </div>
        </div>
    </div>
</form>

<?php get_template_part("footer", "scripts"); ?>
<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/create-infographic.css" />
<script src="<?php echo get_template_directory_uri(); ?>/js/urbannumbers-crete-infographic.js" type="text/javascript"></script>

<?php get_footer(); ?>