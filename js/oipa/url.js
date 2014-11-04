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

        this.build_parameters = function () {
            var self = this;
            var url = '?';
            var options = ['cities', 'countries', 'regions', 'selectors', 'budgets', 'indicators' , 'reporting_organisations'];

            var _ = $.map(options, function(option) {
                var value = $.map(self.selection.get(option, []), function(suboption) {
                    return suboption.id;
                }).join(',');

                if (value !== '') {
                    return option + '=' + value;
                }
            });
            url += _.join('&');
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
