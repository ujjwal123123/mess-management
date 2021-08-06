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
      title: "Delete",
      formatter: "link",
      formatterParams: {
        label: function (cell) {
          return "Del";
        },
        url: function (cell) {
          return "/student/delete/" + cell.getData().roll_no;
        },
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
