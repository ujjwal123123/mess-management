const table = new Tabulator("#students-table", {
  autoColumns: false, // create columns from data field names
  columns: [
    { title: "Name", field: "name", headerFilter: true },
    { title: "Email", field: "email", headerFilter: true },
    { title: "Roll no", field: "roll_no", headerFilter: true },
    { title: "Hostel", field: "hostel_name", headerFilter: true },
  ],
  layout: "fitDataTable",
});
table.setData(window.location.href + "/json");

// download button
const downloadButton = document.getElementById("download_button");
downloadButton.addEventListener("click", () => {
  table.download("csv", "data.csv");
});
