export async function getData(stream: ReadableStream<Uint8Array> | null) {
  if (stream == null) return null;
  const reader = stream.getReader();
  const rawData = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const data = decoder.decode(rawData.value);
  return data;
}
