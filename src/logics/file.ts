export function readFileAsync (file) {
  return new Promise((resolve) => {
    let reader = new FileReader();

    reader.onload = (e) => {
      let dataURI = e.target.result

      if (dataURI) {
        resolve({name: file.name, url: dataURI});
      }

      resolve()
    };

    reader.readAsDataURL(file);
  })
}