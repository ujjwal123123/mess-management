const table = new Tabulator("#students_individual-table", {
  autoColumns: false, // create columns from data field names
  pagination: "local",
  paginationSize: 30,
  layout: "fitDataTable",
  columns: [
    { title: "#", field: "serialNo" },
    { title: "From", field: "from", headerFilter: true },
    { title: "To", field: "to", headerFilter: true },
    { title: "No. of days", field: "noOfDays", headerFilter: true },
    { title: "Current Rate", field: "rate", headerFilter: true },
    { title: "Amount", field: "amount", headerFilter: true },
    { title: "Remark", field: "remark", headerFilter: true },
  ],
});
const url = window.location.href;
const index = url.indexOf("student");
const roll_no = url.substr(index + 8, 7);
table.setData("/student/amount/" + roll_no);

// download button
const downloadButton = document.getElementById("download_button");
downloadButton.addEventListener("click", () => {
  table.download("csv", "data.csv");
});
