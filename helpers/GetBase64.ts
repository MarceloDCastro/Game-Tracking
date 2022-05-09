export const getBase64 = async (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
    }

    reader.onload = () =>
      resolve({
        fileName: file.name,
        base64: reader.result
      })
    reader.onerror = reject
  })
