# GIS in CODE

### By: [@JWokiri](https://twitter.com/JWokiri) || [Wokiri](https://github.com/Wokiri)
---

This repository shows various instances of automating GIS functionalities using code in any of the languages:

Amongst these are:

<br/>

1. ## Using Python to Querry a GeoJSON file

Our object in creating this script was to know all those counties in Kenya that somehow lie within the 36 degree longitude.

Accordingly, we have checked through every vertex of every county and obtained those for which any part (or parts) of the vertices are within the 36 to 37 longitude, i.e...

```python
if minLong <= 37 and maxLong > 36:
```

We have then written the names of those counties that meet the stated criteria in a csv file (**CountiesWithin36Deg.csv**); alongside their repective 'Furthest West Longitude' and 'Furthest East Longitude'

<br/>

2. ## Using Javascript to create a GEOJSON file for a circular feature

DID YOU KNOW that for any given circle, however perfect its curvature may seem it is made up of very short straight lines?

Ask, for example, surveyors who set out curves during road constructions. All they do is to work out bearings and distances for straight lines-- albeit short ones. Is it any wonder then why circles have tangents at almost any point on the surface? Now you know why a circular surfaces can have lines intersecting a point at 90 degrees.

**This JS code shows just that: a series of straight short lines that renders as a perfect circle.**

The CircleGeoJson function is called by an object of three keys: lng, lat (both a geodetic formart) and radius (in meters).

See the generated shape in the any geospatial platform capable of rendering geojson files. You may also use [GeoJson Visualizer](http://geojson.tools/).

NOTE: The further the latitude is from the equator the chances the deformation of the circle. This is because the geojson web tool refered above displays the circle considering the speherical nature of the planet.

---

## Reach Out...

<p align='center'><a href="https://twitter.com/JWokiri"><img height="30" src="https://www.flaticon.com/svg/static/icons/svg/145/145812.svg"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://github.com/Wokiri"><img height="30" src="https://www.flaticon.com/svg/static/icons/svg/2111/2111425.svg"></a></p>
