const table = new Tabulator("#students-table", {
  autoColumns: true, // create columns from data field names
});
table.setData(window.location.href + "/json");

const downloadButton = document.getElementById("download_button");
downloadButton.addEventListener("click", () => {
  table.download("csv", "data.csv");
});
