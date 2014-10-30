function OipaUrl(selection){
        this.selection = selection;

        this.get_selection_from_url = function(){
                var query = window.location.search.substring(1);
                        if(query !== ''){
                                var vars = query.split("&");
                                for (var i=0;i<vars.length;i++) {
                                        var pair = vars[i].split("=");
                                var vals = pair[1].split(",");
                                this.selection[pair[0]] = [];

                                for(var y=0;y<vals.length;y++){
                                        this.selection[pair[0]].push({"id":vals[y], "name":vals[y]});
                                }
                        }
                }
        };

        this.set_current_url = function(){
                var link = document.URL.toString().split("?")[0] + this.build_parameters();
                if (history.pushState) {
                        history.pushState(null, null, link);
                }
        };

        this.build_parameters = function (){
                this.cities = [];
                this.countries = [];
                this.regions = [];
                this.sectors = [];
                this.budgets = [];
                this.indicators = [];
                this.reporting_organisations = [];
                this.start_actual_years = [];
                this.start_planned_years = [];
                this.donors = [];
                this.query = "";
                this.country = ""; // for country search
                this.region = ""; // for region search
                this.group_by = "";
                this.url = null;
                var url = '?p=';

                if (Oipa.pageType != "compare"){
                // build current url based on selection made
                
                        if (typeof this.selection.cities !== "undefined") { url += this.build_current_url_add_par("cities", this.selection.cities); }
                        if (typeof this.selection.countries !== "undefined") { url += this.build_current_url_add_par("countries", this.selection.countries); }
                        if (typeof this.selection.regions !== "undefined") { url += this.build_current_url_add_par("regions", this.selection.regions); }
                        if (typeof this.selection.sectors !== "undefined") { url += this.build_current_url_add_par("sectors", this.selection.sectors); }
                        if (typeof this.selection.budgets !== "undefined") { url += this.build_current_url_add_par("budgets", this.selection.budgets); }
                        if (typeof this.selection.indicators !== "undefined") { url += this.build_current_url_add_par("indicators", this.selection.indicators); }
                        if (typeof this.selection.reporting_organisations !== "undefined") { url += this.build_current_url_add_par("reporting_organisations", this.selection.reporting_organisations); }
                        if (typeof this.selection.donors !== "undefined") { url += this.build_current_url_add_par("donors", this.selection.donors); }
                        if (typeof this.selection.query !== "undefined") { url += this.build_current_url_add_par("query", this.selection.query); }
                } else {

                        if (typeof this.selection.left.cities !== "undefined") { url += this.build_current_url_add_par("left_cities", this.selection.left.cities); }
                        if (typeof this.selection.left.countries !== "undefined") { url += this.build_current_url_add_par("left_countries", this.selection.left.countries); }
                        if (typeof this.selection.right.cities !== "undefined") { url += this.build_current_url_add_par("right_cities", this.selection.right.cities); }
                        if (typeof this.selection.right.countries !== "undefined") { url += this.build_current_url_add_par("right_countries", this.selection.right.countries); }
                        if (typeof this.selection.indicators !== "undefined") { url += this.build_current_url_add_par("indicators", this.selection.indicators); }
                }

                if (url === '?p='){return '';}
                url = url.replace("?p=&", "?");

                return url;
        };

        this.build_current_url_add_par = function(name, arr, dlmtr){

                if(dlmtr === undefined){
                        dlmtr = ",";
                }

                if(arr.length === 0){return '';}
                var par = '&' + name + '=';
                for(var i = 0; i < arr.length;i++){
                        par += arr[i].id.toString() + dlmtr;
                }
                par = par.substr(0, par.length - 1);

                return par;
        };
}
