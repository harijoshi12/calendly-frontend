export interface User {
  _id: string;
  username: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface AvailableDate {
  _id: string;
  date: string;
  timeSlots: TimeSlot[];
}

export interface Booking {
  _id: string;
  userId: string;
  availabilityId: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  date: string;
}