import React from "react";
import { TimeSlot } from "../types";

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  onSlotClick: (timeSlot: TimeSlot) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  timeSlots,
  onSlotClick,
}) => {
  return (
    <div className="space-y-2">
      {timeSlots.map((slot) => (
        <button
          key={slot.startTime}
          onClick={() => onSlotClick(slot)}
          disabled={!slot.isAvailable}
          className={`
            w-full py-2 px-4 rounded-md text-sm border
            ${
              slot.isAvailable
                ? "border-blue-300 text-blue-600 hover:bg-blue-50"
                : "border-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}>
          {slot.startTime}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
