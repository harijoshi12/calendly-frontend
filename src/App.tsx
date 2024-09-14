import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Calendar from "./components/Calendar";
import TimeSlotPicker from "./components/TimeSlotPicker";
import ConfirmationModal from "./components/ConfirmationModal";
import Login from "./components/Login";
import { apiService, clearAuthToken } from "./services/api";
import { AvailableDate, TimeSlot, User } from "./types";

const App: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      fetchAvailableDates(currentMonth);
    }
  }, [currentMonth, user]);

  const fetchAvailableDates = async (date: Date) => {
    try {
      const data = await apiService.getAvailableDates(
        date.getFullYear(),
        date.getMonth() + 1
      );
      setAvailableDates(data);
    } catch (error) {
      console.error("Failed to fetch available dates:", error);
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBooking = async () => {
    if (selectedDate && selectedTimeSlot) {
      try {
        const availableDate = availableDates.find(
          (d) => d.date === format(selectedDate, "yyyy-MM-dd")
        );
        if (!availableDate) throw new Error("Date not found");

        await apiService.createBooking(
          availableDate._id,
          selectedTimeSlot,
          format(selectedDate, "yyyy-MM-dd")
        );
        setConfirmationMessage(
          `Booking confirmed for ${format(selectedDate, "MMMM d, yyyy")} at ${
            selectedTimeSlot.startTime
          }`
        );
        setIsModalOpen(true);
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        fetchAvailableDates(currentMonth);
      } catch (error) {
        console.error("Booking failed:", error);
        setConfirmationMessage("Booking failed. Please try again.");
        setIsModalOpen(true);
      }
    }
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    clearAuthToken();
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Select a Date & Time</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-2/3">
          <Calendar
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            availableDates={availableDates}
            onDateClick={handleDateClick}
            onMonthChange={setCurrentMonth}
          />
        </div>
        <div className="w-full md:w-1/3 mt-4 md:mt-0">
          {selectedDate && (
            <>
              <h2 className="text-lg font-semibold mb-2">
                {format(selectedDate, "EEEE, MMMM d")}
              </h2>
              <TimeSlotPicker
                timeSlots={
                  availableDates.find(
                    (d) => d.date === format(selectedDate, "yyyy-MM-dd")
                  )?.timeSlots || []
                }
                onSlotClick={handleTimeSlotClick}
              />
            </>
          )}
        </div>
      </div>
      {selectedTimeSlot && (
        <button
          onClick={handleBooking}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Confirm Booking
        </button>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={confirmationMessage}
      />
    </div>
  );
};

export default App;
