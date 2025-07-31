import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  Search, 
  Filter,
  FileText,
  Video,
  Link,
  Calendar,
  Star,
  Eye
} from 'lucide-react';

const resources = [
  {
    id: 1,
    title: 'Member Handbook 2024',
    description: 'Complete guide to membership benefits, policies, and procedures',
    type: 'document',
    category: 'handbook',
    format: 'PDF',
    size: '2.4 MB',
    downloads: 1247,
    rating: 4.8,
    date: '2024-01-15',
    url: '#'
  },
  {
    id: 2,
    title: 'Professional Development Webinar Series',
    description: 'Monthly webinars covering industry trends and career advancement',
    type: 'video',
    category: 'training',
    format: 'Video',
    duration: '45 min',
    views: 892,
    rating: 4.9,
    date: '2024-02-01',
    url: '#'
  },
  {
    id: 3,
    title: 'Industry Best Practices Guide',
    description: 'Comprehensive guide to industry standards and best practices',
    type: 'document',
    category: 'guide',
    format: 'PDF',
    size: '5.1 MB',
    downloads: 634,
    rating: 4.7,
    date: '2024-01-28',
    url: '#'
  },
  {
    id: 4,
    title: 'Networking Event Templates',
    description: 'Templates and checklists for organizing successful networking events',
    type: 'template',
    category: 'events',
    format: 'ZIP',
    size: '1.8 MB',
    downloads: 423,
    rating: 4.6,
    date: '2024-02-05',
    url: '#'
  },
  {
    id: 5,
    title: 'Member Directory API Documentation',
    description: 'Technical documentation for accessing member directory programmatically',
    type: 'link',
    category: 'technical',
    format: 'Web',
    views: 156,
    rating: 4.5,
    date: '2024-02-10',
    url: '#'
  },
  {
    id: 6,
    title: 'Leadership Workshop Recording',
    description: 'Recording from our recent leadership development workshop',
    type: 'video',
    category: 'training',
    format: 'Video',
    duration: '2h 15min',
    views: 567,
    rating: 4.8,
    date: '2024-01-20',
    url: '#'
  }
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'video':
        return Video;
      case 'link':
        return Link;
      case 'template':
        return Download;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'blue';
      case 'video':
        return 'purple';
      case 'link':
        return 'green';
      case 'template':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
          <p className="text-gray-600">Access member resources, guides, and training materials</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="handbook">Handbook</option>
              <option value="training">Training</option>
              <option value="guide">Guides</option>
              <option value="events">Events</option>
              <option value="technical">Technical</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
              <option value="link">Links</option>
              <option value="template">Templates</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          const typeColor = getTypeColor(resource.type);
          
          return (
            <div key={resource.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${typeColor}-100`}>
                  <TypeIcon className={`h-6 w-6 text-${typeColor}-600`} />
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{resource.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resource.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Format: {resource.format}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${typeColor}-100 text-${typeColor}-800`}>
                    {resource.type}
                  </span>
                </div>
                
                {resource.size && (
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Size: {resource.size}</span>
                  </div>
                )}
                
                {resource.duration && (
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Duration: {resource.duration}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    {resource.downloads && (
                      <div className="flex items-center">
                        <Download size={14} className="mr-1" />
                        {resource.downloads}
                      </div>
                    )}
                    {resource.views && (
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {resource.views}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {new Date(resource.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  {resource.type === 'link' ? (
                    <>
                      <ExternalLink size={14} className="mr-2" />
                      Open
                    </>
                  ) : (
                    <>
                      <Download size={14} className="mr-2" />
                      Download
                    </>
                  )}
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <BookOpen size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}