import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface MyDatePickerProps {
  selected?: Date;
  onSelect: (date?: Date) => void;
}

export function MyDatePicker({ selected, onSelect }: MyDatePickerProps) {
  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={onSelect}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}
