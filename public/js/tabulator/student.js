// const database = require("../database");

const table = new Tabulator("#students-table", {
  //  layout:"fitColumns",
  layout: "fitData",
  autoColumns: false, // create columns from data field names
  pagination: "local",
  paginationSize: 30,
  resizableColumns: false,
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
    },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Hostel", field: "hostel_name" },
    {
      // title: "Delete",
      formatter: "buttonCross",
      width: 80,
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

const downloadButton = document.getElementById("download_button");
downloadButton.addEventListener("click", () => {
  table.download("csv", "data.csv");
});
