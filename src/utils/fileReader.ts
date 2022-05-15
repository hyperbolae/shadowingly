export function ReadFile(inputFile: File) : Promise<ArrayBuffer | undefined> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    reader.onload = () => {
      const isArrayBuffer = (result: any): result is ArrayBuffer => !!result
      const result = isArrayBuffer(reader.result) ? reader.result : undefined;

      resolve(result);
    }

    reader.readAsArrayBuffer(inputFile);
  });
}
