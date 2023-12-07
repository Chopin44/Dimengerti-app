import data from "../data";

export default function HandlerEndpoint(req, res) {
  const { id } = req.query;
  const { Huruf } = data;

  if (id) {
    const huruf = Huruf.find((value) => value.id == id);
    return res.status(200).json(huruf);
  }

  return res.status(404).json({ error: "data tidak ditemukan" });
}
