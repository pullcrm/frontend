export function readFileAsync(file: any): Promise<IFile> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.addEventListener('load', (e) => {
      const dataURI = (e as any).target.result

      if (dataURI)
        resolve({ name: file.name, url: String(dataURI) })

      // @ts-expect-error
      resolve(null)
    })

    reader.readAsDataURL(file)
  })
}

interface IFile {
  name: string
  url: string
}
