// HandlerEndpoint.js
import data from "../data";

export default function HandlerEndpoint(req, res) {
  const { Huruf } = data;
  if (Huruf) return res.status(200).json(Huruf);

  return res.status(404).json({ error: "data tidak ditemukan" });
}
