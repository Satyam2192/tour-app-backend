"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'

export default function CreateTour() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://sk-home-backend-1.onrender.com/api/tour/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Tour created successfully!');
        router.push("/tour");
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      setError(error.message);

    } finally {
      setIsLoading(false);
    }
  };


  return (

    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Tour Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="title" className="font-medium">
                        Title*
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("title")}
                      />
                      {errors.title && (
                        <p className="text-red-500">{errors.title.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="description" className="font-medium">
                        Description*
                      </label>
                      <textarea
                        id="description"
                        rows="3"
                        className="h-24 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("description")}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="imageUrls" className="font-medium">
                        Image Link*
                      </label>
                      <input
                        type="link"
                        id="imageUrls"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("imageUrls")}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="price" className="font-medium">
                        Price*
                      </label>
                      <input
                        type="number"
                        id="price"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("price")}
                      />
                      {errors.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="location" className="font-medium">
                        Location*
                      </label>
                      <input
                        type="text"
                        id="location"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("location")}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="price" className="font-medium">
                        Capacity*
                      </label>
                      <input
                        type="number"
                        id="capacity"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("capacity")}
                      />
                      {errors.capacity && (
                        <p className="text-red-500">{errors.capacity.message}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="startDate" className="font-medium">
                        Start Date*
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register('startDate')}
                      />
                      {errors.startDate && (
                        <p className="text-red-500">{errors.startDate.message}</p>
                      )}
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="recurrence" className="font-medium">
                        Recurrence*
                      </label>
                      <select
                        id="recurrence"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register('recurrence')}
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                      </select>
                      {errors.recurrence && (
                        <p className="text-red-500">{errors.recurrence.message}</p>
                      )}
                    </div>


                    <div className="md:col-span-2">
                      <label htmlFor="endDate" className="font-medium">
                        End Date*
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register('endDate')}
                      />
                      {errors.endDate && (
                        <p className="text-red-500">{errors.endDate.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-3">
                      <label className="font-medium block mb-2">Selected Days</label>
                      <div className="flex items-center flex-wrap"> 
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="mr-3 mb-2">
                            <input
                              type="checkbox"
                              id={day}
                              value={day}
                              className="hidden peer 
                     focus:ring-blue-500 h-4 w-4 
                     border border-gray-300 rounded-sm
                     checked:bg-blue-600 checked:border-transparent"
                              {...register('selectedDays')}
                            />
                            <label htmlFor={day}
                              className="inline-flex items-center
                          peer-checked:bg-blue-600 peer-checked:text-white
                          peer-focus:ring peer-focus:ring-blue-200
                          rounded-md px-2 py-1 text-sm font-medium">
                              {day}
                            </label>
                          </div>
                        ))}
                      </div>
                      {errors.selectedDays && (
                        <p className="text-red-500 text-sm mt-1">{errors.selectedDays.message}</p>
                      )}
                    </div>


                  </div>
                </div>
              </div>
              <div className="md:col-span-5 text-right mt-4">
                <div className="inline-flex items-end">
                  <button type="submit" disabled={isLoading}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
