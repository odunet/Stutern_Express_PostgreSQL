//Declare DOM objects
let file = document.getElementById('file');
let avatar = document.getElementById('avatar');

// Event listener for upload of file
file.addEventListener('change', (e) => {
  avatar.src = URL.createObjectURL(e.target.files[0]);
});

//Update avatar
if (document.getElementById('form_')) {
  let inp = document.getElementById('inp');
  let form_ = document.getElementById('form_');
  form_.addEventListener('submit', async (e) => {
    e.preventDefault();
    let response = await fetch(`/player/${inp.value || 0}`, {
      method: 'PUT',
      body: new FormData(form_),
    });

    let result = await response.json();
    console.log(result);
  });
}
