const table = new Tabulator("#students-table", {
  autoColumns: false, // create columns from data field names
  columns: [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Roll no", field: "roll_no" },
    { title: "Hostel", field: "hostel_name" },
  ],
});
table.setData(window.location.href + "/json");

const downloadButton = document.getElementById("download_button");
downloadButton.addEventListener("click", () => {
  table.download("csv", "data.csv");
});
