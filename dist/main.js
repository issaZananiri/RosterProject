const render = new Renderer();
const getRoster = function () {
  const name = $("#team").val();
  $.get(`teams/${name}`, function (data) {
    render.render(data);
  });
};
$("#players").on("click", ".playerimage", function () {
  if ($(this).find(".stats").text() === "") {
    const name = $(this).parent().find(".name").text();
    $.get(`playerStats/${name}`, (data) => {
      render.renderStats(data, $(this)); });
  } else {
    $(this).find(".stats").toggle();
  }});
const dreamTeam = function () {
  $.get("/dreamTeam", function (data) {  
    render.renderDreamTeam(data);
  });};
$("#players").on("click", ".fa-plus-square", function () {
  const name = $(this).closest(".player").find(".name").text().split(" ");
  const data = { firstName: name[0], lastName: name[1] };
  $.post("/roster", data, response => {
    if (!response == "") {
      alert(response);
    }else{
      $(this).attr("class", "far fa-plus-square");
    }});});
$("#players").on("click", ".fa-minus-square", function(){
  const name = $(this).closest(".player").find(".name").text();
  $.ajax({
    method: "delete",
    url: "/dreamTeam/"+name,
    success: function(data){
      render.renderDreamTeam(data)
    }});});