'use strict';

exports.formatListItinerary = ({ moment, formatDate }) => data => data.map(itinerary => ({
  id: itinerary._id,
  isPrivate: itinerary.isPrivate,
  isActive: itinerary.isActive,
  name: itinerary.name,
  description: itinerary.description,
  duration: itinerary.duration,
  user: itinerary.user,
  places: itinerary.places.map(place => ({
    sequel: place.sequel,
    zone: place.zone,
    country: place.country,
    city: place.city,
    name: place.name,
  })),
  createdAt: moment(itinerary.createdAt).format(formatDate),
}));

exports.formatItinerary = ({ moment, formatDate }) => itinerary => ({
  id: itinerary._id,
  isPrivate: itinerary.isPrivate,
  isActive: itinerary.isActive,
  name: itinerary.name,
  description: itinerary.description,
  duration: itinerary.duration,
  user: itinerary.user,
  places: itinerary.places.map(place => ({
    sequel: place.sequel,
    zone: place.zone,
    country: place.country,
    city: place.city,
    name: place.name,
  })),
  createdAt: moment(itinerary.createdAt).format(formatDate),
})
