<?php

class Popups {
    public function init() {
        $this->custom = get_post_custom();
    }

    function get($key, $default="") {
        $key = 'popup_' . $key;

        if (isset($this->custom[$key])) {
            return $this->custom[$key][0];
        }
        return $default;
    }
}

$popups = new Popups();
$popups->init();

?>
<!-- container-sort -->
<div class="container-sort">
    <div class="row compare-controls-nav">
        <div class="col-md-5">
            <a id="reset-compare-filters" class="btn btn-default" href="/urbannumbers/compare-cities/">RESET FILTERS</a>

            <div class="helper">
                <i class="glyphicon glyphicon-question-sign"></i>
                <div class="helper-popup">
                    <?php echo $popups->get('reset_filters', "popup_reset_filters"); ?>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <a id="compare-cities-randomize" class="btn btn-success" href="#"><i class="glyphicon glyphicon-refresh"></i> RANDOMIZE</a>
            <div class="helper">
                <i class="glyphicon glyphicon-question-sign"></i>
                <div class="helper-popup">
                    <?php echo $popups->get('randomize', "popup_randomize"); ?>
                </div>
            </div>
        </div>
        <div class="col-md-3 share-col">
<ul class="action-list">
            <li><a class="btn btn-default add-to-favorites" href="#"><i class="glyphicon glyphicon-plus"></i> ADD TO FAVORITES</a></li>
            <li><a class="opener share-btn btn btn-success" href="#"><i class="glyphicon glyphicon-share-alt"></i> SHARE</a>
            <div class="dropdown-box share-widget open">
                <span class="heading">Share</span>
                <ul class="social-networks">
                    <li><a href="#" target="_blank" class="icon-facebook">facebook</a></li>
                    <li><a href="#" target="_blank" class="icon-twitter">twitter</a></li>
                    <li><a href="#" target="_blank" class="icon-linkedin">linkedin</a></li>
                    <li><a href="#" target="_blank" class="icon icon-google">google</a></li>
                </ul>
                <form action="#">
                    <fieldset>
                        <label for="item1">Share link</label>
                        <div class="input-wrap"><input class="form-control share-widget-input" type="text"></div>
                        <div class="btn-holder">
                            <a class="close-share btn btn-blue btn-close">Cancel</a>
                        </div>
                    </fieldset>
                </form>
            </div></li></ul>
        </div>
    </div>
</div>
<div id="location-filter-wrapper" class="container-sort sort-location">
    <div class="row">
        <div class="col-md-6 col-sm-6 col-xs-6">
            <div id="left-countries-filters" class="holder"></div>
            <div class="left-countries-helper helper-popup">
                <?php echo $popups->get('country_1', "popup_country_1"); ?>
            </div>
            <div id="left-cities-filters" class="holder"></div>
            <div class="left-cities-helper helper-popup">
                  <?php echo $popups->get('city_1', "popup_city_1"); ?>
            </div>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-6">
            <div id="right-countries-filters" class="holder"></div>
            <div class="right-countries-helper helper-popup">
                    <?php echo $popups->get('country_2', "popup_country_2"); ?>
            </div>
            <div id="right-cities-filters" class="holder"></div>
            <div class="right-cities-helper helper-popup">
                    <?php echo $popups->get('city_2', "popup_city_2"); ?>
            </div>
        </div>
    </div>
</div>
<!-- sort-list -->
<div id="indicator-filter-wrapper" class="container-sort row" style="padding-bottom: 15px;">

    <nav id="indicators-pagination" class="pagination"></nav>

    <div class="helper">
        <i class="glyphicon glyphicon-question-sign"></i>
        <div class="helper-popup indicators-helper">
              <?php echo $popups->get('indicators', "popup_indicators"); ?>
       </div>
    </div>
    <div class="slide-content container">
        <div id="indicators-filters" class="holder"></div>
        <div class="btns-holder">
          <div class="holder">
              <a href="#" class="compare-filters-save-button btn btn-blue">Save</a>
              <a href="#" class="compare-filters-close-button btn btn-default">Close</a>
          </div>
        </div>
    </div>
</div>
