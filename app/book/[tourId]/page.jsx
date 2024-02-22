"use client";
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useParams } from 'next/navigation';

const BookingForm = () => {
  const [recurrenceType, setRecurrenceType] = useState('Daily');
  const [selectedDate, setSelectedDate] = useState(null);
  const [allowedDays, setAllowedDays] = useState([]);
  const [bookingFeedback, setBookingFeedback] = useState('');
  const [tour, setTour] = useState(null);

  const { tourId } = useParams();
  console.log(tourId);

  useEffect(() => {
    setAllowedDays([]);
  }, [recurrenceType]);

  const handleDateChange = (date) => {
    if (recurrenceType === 'Weekly' && !allowedDays.includes(date.getDay())) {
      alert('Please select a valid day based on your weekly selection.');
      return;
    }
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tourId) {
      try {
        const response = await axios.post('https://sk-home-backend-1.onrender.com/api/booking/create', {
          // user: userId,
          tour: tourId,
          bookingDate: selectedDate,
        });

        setBookingFeedback('Booking successful!');
      } catch (error) {
        setBookingFeedback('Booking failed. Please try again.');
      }
    }
  };

  const handleDaySelectionChange = (dayIndex) => {
    setAllowedDays((prevDays) =>
      prevDays.includes(dayIndex)
        ? prevDays.filter((d) => d !== dayIndex)
        : [...prevDays, dayIndex]
    );
  };

  useEffect(() => {
    const fetchTour = async () => {
      if (tourId) {
        try {
          const response = await fetch(`https://sk-home-backend-1.onrender.com/api/tour/get/${tourId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch tour data');
          }
          const data = await response.json();
          setTour(data);
        } catch (error) {
          console.error('Error fetching tour:', error);
        }
      }
    };

    fetchTour();
  }, [tourId]);



  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full dark:bg-gray-800 dark:text-gray-100">
      <div className="container max-w-6xl p-6 mx-auto pt-10 sm:pt-12">
        <div className="max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
          <img
            src={tour.imageUrls[0]}
            alt={tour.title}
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
          />
          <div className="p-6 space-y-2 lg:col-span-5">
            <h3 className="text-2xl font-semibold sm:text-4xl">{tour.title}</h3>
            <span className="text-xs dark:text-gray-400">
              {new Date(tour.startDate).toLocaleDateString()} - {new Date(tour.endDate).toLocaleDateString()}
            </span>
            <p>{tour.description}</p>
          </div>
        </div>

        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        </div>
      </div>

      <div class="p-6 dark:bg-gray-800 bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto ">
          <div class="dark:bg-gray-900 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <h2 class="font-semibold text-xl text-gray-200 mb-4">Book Your Tour</h2>

            <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
              <div>
                <p class="font-medium text-lg">Tour Options</p>
              </div>
              <div class="md:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm md:grid-cols-2">
                  <div>
                    <label htmlFor="recurrenceType" className="block font-medium text-gray-200 mb-2">Recurrence Type:</label>
                    <select
                      id="recurrenceType"
                      value={recurrenceType}
                      onChange={(e) => setRecurrenceType(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                    </select>
                  </div>

                  {recurrenceType === "Weekly" && (
                    <div className="md:col-span-3">
                      <label className="font-medium block  mb-2">Selected Days</label>
                      <div className="flex items-center flex-wrap">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                          <div key={index} className="mr-3 mb-2">
                            <input
                              className="hidden peer focus:ring-blue-500 h-4 w-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent"
                              type="checkbox"
                              id={day}
                              value={day}
                              checked={allowedDays.includes(index)}
                              onChange={() => handleDaySelectionChange(index)}
                            />
                            <label htmlFor={day}
                              className="inline-flex items-center peer-checked:bg-blue-600 peer-checked:text-white  peer-focus:ring peer-focus:ring-blue-200 rounded-md px-2 py-1 text-sm font-medium">
                              {day}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="bookingDate" className="block font-medium  mb-2">Booking Date:</label>
                    <DatePicker
                      id="bookingDate"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-black"

                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 text-right">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Tour</button>
                {bookingFeedback && <p className="text-green-500 mt-2">{bookingFeedback}</p>}
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>



  );
};

export default BookingForm;
