import React from 'react';
import { useQuery } from 'react-query';
import { fetchResources } from '../lib/api';
import type { Resource } from '../types/strapi';
import { FileText, Video, Music, FileSpreadsheet } from 'lucide-react';

const resourceTypeIcons = {
  article: FileText,
  video: Video,
  audio: Music,
  worksheet: FileSpreadsheet,
};

export default function Resources() {
  const { data, isLoading, error } = useQuery<Resource[]>('resources', fetchResources);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading resources</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-medium text-slate-900 mb-8">Resources</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((resource) => {
            const Icon = resourceTypeIcons[resource.attributes.type];
            return (
              <div key={resource.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={resource.attributes.thumbnail.data.attributes.url}
                    alt={resource.attributes.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                    <Icon className="w-5 h-5 text-violet-600" />
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-display font-medium text-slate-900 mb-2">
                    {resource.attributes.title}
                  </h2>
                  <p className="text-slate-600 mb-4">{resource.attributes.description}</p>
                  {resource.attributes.downloadUrl && (
                    <a
                      href={resource.attributes.downloadUrl}
                      className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium"
                    >
                      Download Resource
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}