const table = new Tabulator("#students-table", {
  autoColumns: false, // create columns from data field names
  pagination: "local",
  paginationSize: 30,
  layout: "fitDataTable",
  columns: [
    {
      title: "Roll No",
      field: "roll_no",
      formatter: "link",
      formatterParams: {
        label: function (cell) {
          return cell.getData().roll_no;
        },
        url: function (cell) {
          return "/student/" + cell.getData().roll_no;
        },
      },
      headerFilter: true,
    },
    { title: "Name", field: "name", headerFilter: true },
    { title: "Email", field: "email", headerFilter: true },
    { title: "Hostel", field: "hostel_name", headerFilter: true },
    {
      formatter: "buttonCross",
      align: "center",
      cellClick: function (e, cell) {
        if (confirm("Are you sure you want to delete this entry?")) {
          cell.getRow().delete();
        }
      },
    },
  ],
});
table.setData(window.location.href + "/json");

// download button
const downloadButton = document.getElementById("download_button");
downloadButton.addEventListener("click", () => {
  table.download("csv", "data.csv");
});
