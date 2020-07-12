export function readFileAsync (file): Promise<IFile> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.addEventListener('load', (e) => {
      const dataURI = e.target.result

      if (dataURI) {
        resolve({ name: file.name, url: String(dataURI) })
      }

      resolve()
    })

    reader.readAsDataURL(file)
  })
}

interface IFile {
  name: string
  url: string
}
