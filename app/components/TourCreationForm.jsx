import React, { useState, useEffect } from 'react';
import { TextField, DatePicker, Button, FormControlLabel, Checkbox } from '@mui/material';

function TourCreationForm() {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [recurrence, setRecurrence] = useState('Daily'); // Default recurrence
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDays, setSelectedDays] = useState([]);

  // Handle form submission & API call to create tour
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tour/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          startDate,
          endDate,
          recurrence,
          selectedDays,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error creating tour: ${await response.text()}`);
      }

      // Handle successful tour creation (e.g., redirect or display confirmation)
    } catch (error) {
      console.error('Error creating tour:', error);
      // Display error message to the user
    }
  };

  // Update selected days based on checkbox changes
  const handleDayChange = (event) => {
    const { checked, name } = event.target;
    setSelectedDays(checked ? [...selectedDays, name] : selectedDays.filter((day) => day !== name));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(newValue) => setStartDate(newValue)}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(newValue) => setEndDate(newValue)}
      />
      <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
      </select>
      {recurrence === 'Weekly' && (
        <div>
          {daysOfWeek.map((day) => (
            <FormControlLabel
              key={day}
              control={<Checkbox checked={selectedDays.includes(day)} onChange={handleDayChange} name={day} />}
              label={day}
            />
          ))}
        </div>
      )}
      <Button type="submit" variant="contained">
        Create Tour
      </Button>
    </form>
  );
}

export default TourCreationForm;
