export const getBase64 = async (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
    }

    reader.onload = () =>
      resolve(reader.result as string)
    reader.onerror = reject
  })
