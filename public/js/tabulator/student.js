const table = new Tabulator("#students-table", {
  autoColumns: false, // create columns from data field names
  columns:[
    {title:"Name", field:"name", sorter:"string", width:200, editor:false},
    {title:"Email", field:"email", sorter:"string", width:200, editor:false},
    {title:"Roll no", field:"roll_no", sorter:"number", width:200, editor:false},
    {title:"Hostel Name", field:"hostel_id", sorter:"string", width:200, editor:false},
  ],
});
table.setData(window.location.href + "/json");

const downloadButton = document.getElementById("download_button");
downloadButton.addEventListener("click", () => {
  table.download("csv", "data.csv");
});
