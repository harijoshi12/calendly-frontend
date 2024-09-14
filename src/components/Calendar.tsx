import React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AvailableDate } from "../types";

interface CalendarProps {
  currentMonth: Date;
  selectedDate: Date | null;
  availableDates: AvailableDate[];
  onDateClick: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  selectedDate,
  availableDates,
  onDateClick,
  onMonthChange,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (availableDate) => availableDate.date === format(date, "yyyy-MM-dd")
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onMonthChange(subMonths(currentMonth, 1))}
            className="p-1 rounded-full hover:bg-gray-200">
            <FaChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onMonthChange(addMonths(currentMonth, 1))}
            className="p-1 rounded-full hover:bg-gray-200">
            <FaChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {monthDays.map((day, index) => {
          const isAvailable = isDateAvailable(day);
          const isSelected = selectedDate && isSameDay(selectedDate, day);
          return (
            <button
              key={day.toString()}
              onClick={() => isAvailable && onDateClick(day)}
              disabled={!isAvailable}
              className={`
                p-2 rounded-full text-sm
                ${isSelected ? "bg-blue-500 text-white" : ""}
                ${
                  isAvailable && !isSelected
                    ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    : ""
                }
                ${!isAvailable ? "text-gray-300 cursor-not-allowed" : ""}
              `}>
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
