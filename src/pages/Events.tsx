import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Filter, 
  Search,
  MoreVertical,
  Star,
  Video,
  CalendarDays,
  CreditCard,
  Award,
  GraduationCap
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const events = [
  {
    id: 1,
    title: 'Real Estate Law & Ethics Workshop',
    description: 'Understanding legal requirements and ethical practices in real estate - CPD Accredited',
    date: '2024-02-15',
    time: '6:00 PM',
    endTime: '9:00 PM',
    location: 'Downtown Conference Center',
    type: 'workshop',
    format: 'in-person',
    cpdHours: 4,
    cpdAccredited: true,
    capacity: 60,
    registered: 45,
    price: 25,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Property Valuation Techniques Seminar',
    description: 'Advanced methods for accurate property valuation - CPD Accredited',
    date: '2024-02-18',
    time: '2:00 PM',
    endTime: '5:00 PM',
    location: 'Virtual',
    type: 'seminar',
    format: 'virtual',
    cpdHours: 3,
    cpdAccredited: true,
    capacity: 40,
    registered: 28,
    price: 0,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Annual Real Estate Awards Gala',
    description: 'Celebrating excellence in the real estate industry',
    date: '2024-03-05',
    time: '7:00 PM',
    endTime: '11:00 PM',
    location: 'Grand Ballroom, Marriott Hotel',
    type: 'event',
    format: 'in-person',
    cpdHours: 0,
    cpdAccredited: false,
    capacity: 150,
    registered: 120,
    price: 85,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Real Estate Investment Strategies Workshop',
    description: 'Comprehensive guide to real estate investment and portfolio management - CPD Accredited',
    date: '2024-02-28',
    time: '9:00 AM',
    endTime: '5:00 PM',
    location: 'Tech Hub Downtown',
    type: 'workshop',
    format: 'in-person',
    cpdHours: 6,
    cpdAccredited: true,
    capacity: 200,
    registered: 165,
    price: 120,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    title: 'Real Estate Professionals Networking Mixer',
    description: 'Connect with fellow real estate professionals over cocktails and conversation',
    date: '2024-03-12',
    time: '6:00 PM',
    endTime: '9:00 PM',
    location: 'Rooftop Lounge',
    type: 'event',
    format: 'in-person',
    cpdHours: 0,
    cpdAccredited: false,
    capacity: 80,
    registered: 35,
    price: 15,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    title: 'Professional Ethics in Real Estate Seminar',
    description: 'Understanding ethical practices and professional standards in real estate - CPD Accredited',
    date: '2024-03-20',
    time: '10:00 AM',
    endTime: '1:00 PM',
    location: 'Virtual',
    type: 'seminar',
    format: 'virtual',
    cpdHours: 3,
    cpdAccredited: true,
    capacity: 100,
    registered: 67,
    price: 45,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesFormat = selectedFormat === 'all' || event.format === selectedFormat;
    
    return matchesSearch && matchesType && matchesFormat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">
            {isAdmin ? 'Manage and organize community events' : 'Discover and register for community events'}
          </p>
        </div>
        {isAdmin && (
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} className="mr-2" />
            Create Event
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="seminar">Seminars</option>
              <option value="workshop">Workshops</option>
              <option value="event">Events</option>
            </select>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Formats</option>
              <option value="in-person">In-Person</option>
              <option value="virtual">Virtual</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.type === 'seminar' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'workshop' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {event.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                  event.format === 'virtual' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.format === 'virtual' ? <Video size={10} className="mr-1" /> : <MapPin size={10} className="mr-1" />}
                  {event.format}
                </span>
                {event.cpdHours > 0 && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 flex items-center">
                    <GraduationCap size={10} className="mr-1" />
                    {event.cpdHours} CPD Hours
                  </span>
                )}
                {event.cpdAccredited && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    CPD Accredited
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                {isAdmin && (
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 flex-1">{event.title}</h3>
                {event.price === 0 ? (
                  <span className="text-green-600 font-medium text-sm">Free</span>
                ) : (
                  <span className="text-gray-900 font-medium text-sm">${event.price}</span>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarDays size={16} className="mr-2 text-gray-400" />
                  {format(new Date(event.date), 'EEEE, MMM d, yyyy')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  {event.time} - {event.endTime}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={16} className="mr-2 text-gray-400" />
                  {event.registered}/{event.capacity} registered
                </div>
                {event.cpdHours > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Award size={16} className="mr-2 text-gray-400" />
                    Earn {event.cpdHours} CPD hours
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        (event.registered / event.capacity) > 0.8 ? 'bg-red-500' :
                        (event.registered / event.capacity) > 0.6 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {Math.round((event.registered / event.capacity) * 100)}% full
                  </span>
                </div>
              </div>

              <div className="mt-4 flex space-x-3">
                {isAdmin ? (
                  <>
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                      Edit
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      Register Now
                    </button>
                    {event.price > 0 && (
                      <button className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        <CreditCard size={14} />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or create a new event.</p>
        </div>
      )}
    </div>
  );
}