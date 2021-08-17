const table = new Tabulator("#students-amount-list", {
  autoColumns: true, // create columns from data field names
  pagination: "local",
  paginationSize: 30,
  layout: "fitDataTable",
});
table.setData("/api/amount_list_data");

// download button
const downloadButton = document.getElementById("amount_list_download_button");
downloadButton.addEventListener("click", () => {
  table.download("csv", "data.csv");
});
