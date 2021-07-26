const table = new Tabulator("#students_individual-table", {
  layout: "fitDataTable",
  autoColumns: false, // create columns from data field names
  pagination: "local",
  paginationSize: 30,
  layout: "fitDataTable",
  columns: [
    { title: "#", field: "serialNo" },
    { title: "From", field: "from", headerFilter: true },
    { title: "To", field: "to", headerFilter: true },
    { title: "No. of days", field: "noOfDays", headerFilter: true },
    { title: "Amount", field: "amount", headerFilter: true },
    { title: "Remark", field: "remark", headerFilter: true },
  ],
});
table.setData(
  "/student/amount/" +
    function (cell) {
      return cell.getData().roll_no;
    }
);

// download button
const downloadButton = document.getElementById("download_button");
downloadButton.addEventListener("click", () => {
  table.download("csv", "data.csv");
});
