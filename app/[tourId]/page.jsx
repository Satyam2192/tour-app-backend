"use client"; 
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const TourDetailsPage = () => {
  const [tour, setTour] = useState(null);
  const { tourId } = useParams();
  console.log(tourId);

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
    <section className="w-full h-[100vh] dark:bg-gray-800 dark:text-gray-100">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
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
            {/* ... Add other details like location, price, etc. */}
          </div>
        </div>

        {/* Additional Information (if you have more) */}
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> 
          {/* Add more sections as per your data */}
        </div>
      </div>
    </section>
  );
};


export default TourDetailsPage;
