const deleteButtons = document.querySelectorAll("button[title='Delete']");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    let request_url;
    if (button.getAttribute("target")) {
      request_url = window.location.origin + button.getAttribute("target");
    } else {
      request_url = window.location.href;
    }
    await fetch(request_url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: button.getAttribute("value"),
      }),
    }).then(() => location.reload());
  });
});
