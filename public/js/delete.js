const deleteButtons = document.querySelectorAll("button[title='Delete']");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    console.log(button.getAttribute("value"));
    await fetch(window.location.href, {
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
