function OipaSelection(main, has_default_reporter){
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
        this.url = new OipaUrl(this);

        if (has_default_reporter === 1){
                if (Oipa.default_organisation_id){
                        this.reporting_organisations.push({"id": Oipa.default_organisation_id, "name": Oipa.default_organisation_name});
                }
        }
}
