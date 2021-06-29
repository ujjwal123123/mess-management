const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", function (event) {
    const queryString = new URLSearchParams(new FormData(form)).toString();
    console.log(queryString);

    event.preventDefault();
    fetch(form.action, { method: form.method, body: new FormData(form) })
      .then((res) => {
        console.log("Data sent to the server");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
