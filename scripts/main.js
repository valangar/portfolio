var tab_content = Array.from(document.querySelectorAll(".tab-contents")),
    tabs = Array.from(document.querySelectorAll(".tabs")),
    tab_width = 100,
    logo = document.getElementById("logo"),
    contents = document.getElementById("content-area"),
    rCircles = d3.rCircles.rCirclesModule()
    forceGraph = graphModule(),
	graph_data = {"nodes": nodes, "links": links };
	
//Initial setup
hideAllTabs();
contents.querySelector('div[data-key=main]').classList.remove("hidden");
//creating some circles that are very confused about where they are going:
rCircles.width(screen.width - tab_width )
        .height(screen.height);
d3.select("#home-pg").call(rCircles);

//creating network graph in the contacts page:
forceGraph.graphSpaceWidth((window.innerWidth / 2) - tab_width )
			.graphSpaceHeight(window.innerHeight - 100)
			.nodeColors(d3.scaleOrdinal(d3.schemeCategory20))
			.dataAttrNodeGrp("group")
			.dataAttrLinkWeight("value")
			.dataAttrNodeText("name")
			.dataAttrNodeSize("nodesize");
d3.select("#network-container").datum(graph_data).call(forceGraph);

//Adding event listeners
tabs.forEach(tab => tab.addEventListener("click", switchTabs));
logo.addEventListener("click", switchTabs);

/************************* FUNCTIONS *****************************/
function hideAllTabs() {
    tab_content.forEach(tab => tab.classList.add("hidden"));
    tabs.forEach(tab => tab.classList.remove("active"));
}
function switchTabs (_) {
    var data_key = _.target.getAttribute("data-key");
    hideAllTabs();
    this.classList.add("active");
    contents.querySelector('div[data-key=' + data_key + ']').classList.remove("hidden");
}
/* $cont = $('p');
parts = $.map($cont.text().split(''), function(v){
    return $('<span />', {text:v});
});
$cont.empty().append(parts); */