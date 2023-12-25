import Slot from "../models/slot.js";

export const getAllSlots = async (req, res) => {
  try {
    const { doc_id, date } = req.query;

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    const currentSlots = await Slot.find({
      doc_id: doc_id,
      date: { $gte: startDate, $lte: endDate },
    });

    res.status(200).json(currentSlots);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
export const reserveSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    await Slot.updateOne({ _id: slotId }, { $set: { available: false } });
    res.status(200).json({ msg: "slot booked successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const slot = await Slot.findOne({ _id: slotId });
    res.status(200).json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
