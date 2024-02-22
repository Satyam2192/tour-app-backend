"use client"
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'; // Keep using Material-UI
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const TourListingPage = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch('https://sk-home-backend-1.onrender.com/api/tour/get');
      const data = await response.json();
      setTours(data);
    };

    fetchTours();
  }, []);

  return (
    <section className="flex flex-col justify-center antialiased bg-gray-900 text-gray-200 min-h-screen">
      <div className="max-w-6xl mx-auto p-4 sm:px-6 h-full">
        <Grid container spacing={9}>
          {tours.map((tour) => (
            <Grid item xs={12} key={tour._id}>
              <Link href={`/${tour._id}`}>
                <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                  <div className="relative block group">
                    <div className="absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none" aria-hidden="true"></div>
                    <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                      <img
                        className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
                        src={tour.imageUrls[0]}
                        width="540"
                        height="303"
                        alt={tour.title}
                      />
                    </figure>
                  </div>
                  <div>
                    <header>
                      <div className="mb-3">
                        <ul class="flex flex-wrap text-xs font-medium -m-1">
                          <li class="m-1">
                            <p class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out" >{tour.selectedDays.join(' | ')}</p>
                          </li>
                        </ul>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                        <a className="hover:text-gray-100 transition duration-150 ease-in-out">
                          {tour.title}
                        </a>
                      </h3>
                    </header>
                    <Typography variant="body2" color="text.secondary" className="text-lg text-gray-400 flex-grow">
                      {new Date(tour.startDate).toLocaleDateString()} - {new Date(tour.endDate).toLocaleDateString()}
                      <br />
                      Recurrence: {tour.recurrence}
                    </Typography>
                    
                    <Link href={`/book/${tour._id}`}>  
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </article>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default TourListingPage;