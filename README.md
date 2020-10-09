## Using Python to Querry a GeoJSON file

Our object in creating this script was to know all those counties in Kenya that somehow lie within the 36 degree longitude.

Accordingly, we have checked through every vertex of every county and obtained those for which any part (or parts) of the vertices are within the 36 to 37 longitude, i.e...

```python
if minLong <= 37 and maxLong > 36:
```

We have then written the names of those counties that meet the stated criteria in a csv file (**CountiesWithin36Deg.csv**); alongside their repective 'Furthest West Longitude' and 'Furthest East Longitude'