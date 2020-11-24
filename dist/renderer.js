class Renderer {
  constructor() {}
  render(data) {
    const source = $("#players-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({ players: data });
    $("#players").empty();
    $("#team").val("")
    $("#players").append(newHTML);
  }
  renderStats(stat, $playerimage){
    const entries = Object.entries(stat);
    const source = $("#stats-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({ stats: entries });
    $playerimage.children(".stats").empty();
    $playerimage.children(".stats").append(newHTML);
  }
  renderDreamTeam(data){
    data.map((t) => {
      t.dreamTeam = true;
      return t;
    });
    this.render(data)
  }
}
