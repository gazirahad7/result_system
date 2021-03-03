/*=================================================*/
/***************** Get old sub Name  ***************/
/*==================================================*/
const getUseSub = (event) => {
  console.log(event.target.value);
  const useSubName = event.target.value;

  fetch(`http://localhost:8070/get-use-sub-name?useSubName=${useSubName}`)
    .then((res) => res.json())
    .then((data) => {
      const showUseSub = document.getElementById("use-subjects");

      showUseSub.innerHTML = data
        .map(
          (sub, index) =>
            `<p>${index + 1}.${
              sub.subject_name
            }<span class="has-text-danger">(Already exist!)</span></p>`
        )
        .join("");
    });
};
