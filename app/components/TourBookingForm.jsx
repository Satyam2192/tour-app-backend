import React, { useState, useEffect } from 'react';
import {
  DatePicker,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material';

function TourBookingForm({ tour }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [isBookingValid, setIsBookingValid] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    // Reset form state when tour changes
    setSelectedDate(null);
    setNumberOfTickets(1);
    setIsBookingValid(false);
    setBookingError(null);
  }, [tour]);

  const handleDateChange = (newValue) => {
    // Validate date based on recurrence and selected days
    const isValidDate = validateDate(tour, newValue);
    setSelectedDate(isValidDate ? newValue : null);
    setIsBookingValid(isValidDate);
    setBookingError(isValidDate ? null : 'Invalid date selection');
  };

  const handleTicketChange = (e) => {
    const value = parseInt(e.target.value);
    setNumberOfTickets(isNaN(value) ? 1 : value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isBookingValid) {
      return;
    }

    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour._id,
          date: selectedDate.toISOString(),
          numberOfTickets,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error booking tour: ${await response.text()}`);
      }

      // Handle successful booking (e.g., redirect or display confirmation)
    } catch (error) {
      console.error('Error booking tour:', error);
      // Display error message to the user
    }
  };

  // Update code for validateDate function based on feedback:

  function validateDate(tour, selectedDate) {
    if (tour.recurrence === 'Daily') {
      return true; // Any date is valid for daily tours
    }

    // Validate for weekly tours
    const selectedDay = selectedDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    return tour.selectedDays.includes(selectedDay.toString());

  }

  return (
    <form onSubmit={handleSubmit}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} error={bookingError !== null} />}
        helperText={bookingError}
      />

      <TextField
        label="Number of Tickets"
        type="number"
        value={numberOfTickets}
        onChange={handleTicketChange}
        inputProps={{ min: 1 }}
      />

      {tour.userType && (
        <Select label="User Type" value={userType} onChange={(e) => setUserType(e.target.value)}>
          {tour.userTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      )}

      <Button type="submit" variant="contained" disabled={!isBookingValid}>
        Book Tour
      </Button>
    </form>
  );
}

export default TourBookingForm;
