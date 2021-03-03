const getStID = (event) => {
  //const inputID = document.getElementById("stID").value;
  //console.log("In id", inputID);
  console.log(event.target.value);
  const studentID = event.target.value;
  fetch(`http://localhost:8070/get-student-id?studentID=${studentID}`)
    .then((res) => res.json())
    .then((data) => {
      const onInput = document.getElementById("on-input");
      onInput.innerHTML = data
        .map(
          (id, index) =>
            `<p><span>${index + 1}.</span> ${
              id.st_ID
            }(<span class="has-text-danger">Already exist!</span>)</p>`
        )
        .join("");
    });
};
