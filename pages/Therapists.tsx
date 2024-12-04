import React from 'react';
import { useQuery } from 'react-query';
import { fetchTherapists } from '../lib/api';
import type { Therapist } from '../types/strapi';
import { Calendar, Award, GraduationCap } from 'lucide-react';

export default function Therapists() {
  const { data, isLoading, error } = useQuery<Therapist[]>('therapists', fetchTherapists);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading therapists</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-medium text-slate-900 mb-8">Our Therapists</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((therapist) => (
            <div key={therapist.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={therapist.attributes.avatar.data.attributes.url}
                  alt={therapist.attributes.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-display font-medium text-slate-900 mb-1">
                  {therapist.attributes.name}
                </h2>
                <p className="text-violet-600 mb-4">{therapist.attributes.title}</p>
                <p className="text-slate-600 mb-6">{therapist.attributes.bio}</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-violet-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Education</h3>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {therapist.attributes.education.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-violet-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Certifications</h3>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {therapist.attributes.certifications.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-violet-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Availability</h3>
                      <p className="text-sm text-slate-600">
                        {therapist.attributes.availability.days.join(', ')}
                        <br />
                        {therapist.attributes.availability.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}