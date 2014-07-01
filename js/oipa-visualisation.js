
function OipaVis(){
	this.type = null;
	this.data_url = null;
	this.parameters = [];

	this.export = function(filetype){
		new OipaExport(this, filetype);
	};

	this.embed = function(){
		var embed = new OipaEmbed(this);
	};

	this.get_url = function(){

	};

	this.refresh = function(){

	};

}

function OipaTableChart(){
	OipaTableChart.prototype = Object.create(OipaVis.prototype);

}

function OipaLineChart(){
	OipaLineChart.prototype = Object.create(OipaVis.prototype);

}

function OipaBubbleChart(){
	OipaBubbleChart.prototype = Object.create(OipaVis.prototype);

}