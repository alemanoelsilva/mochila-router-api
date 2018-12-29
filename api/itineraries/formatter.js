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
    name: place.name,
    attraction: place.attraction,
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
    name: place.name,
    attraction: place.attraction,
  })),
  createdAt: moment(itinerary.createdAt).format(formatDate),
})
