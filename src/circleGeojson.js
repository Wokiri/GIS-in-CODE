const toDegree = rad => rad * 180 / Math.PI

const toRadian = deg => deg * Math.PI / 180

const a = 6378137.00

const roundoff = (num, dp) => Number(Math.round(num + 'e' + dp) + 'e-' + dp)

// The formulas used to derive the Spherical Web Mercator coordinates from ellipsoid Latitude and Longitude:
const geo_webMercator = (long, lat) => {

    const longRads = toRadian(long)
    const latRads = toRadian(lat)

    const easting = a * longRads
    const northing = a * Math.atanh(Math.sin(latRads))

    return [easting, northing]
}

// The formulas used to derive ellipsoid Latitude and Longitude from the Spherical Web Mercator coordinates:
const weMercator_geo = (easting, northing) => {

    const longRads = easting / a
    const latRads = Math.tanh(Math.asin((northing / a)))

    return [toDegree(longRads), toDegree(latRads)]
}


// This formula gives you the distance in meters for the radius
const Radial_Distance = (cent, angle) => {

    const pointA = geo_webMercator(cent.long, cent.lat)
    const pointB = geo_webMercator(cent.long + angle, cent.lat + angle)

    const dx = Math.abs(pointA[0] - pointB[0])
    const dy = Math.abs(pointA[1] - pointB[1])

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}


const CircleGeoJson = cent => {

    const segments = 360

    const XOrigin = cent['lng']
    const YOrigin = cent['lat']
    const R = cent['radius']

    const linear_Polar = () => {
        const center = geo_webMercator(XOrigin, YOrigin)
        const Ecent = center[0]
        const Ncent = center[1]
        const dxy = R * Math.sin(toRadian(45))
        const Evertex = Ecent + dxy
        const Nvertex = Ncent + dxy
        const coordinates2 = weMercator_geo(Evertex, Nvertex)
        const long2 = coordinates2[0]
        const lat2 = coordinates2[1]
        const dlong = Math.abs(XOrigin - long2)
        const dlat = Math.abs(YOrigin - lat2)
        return Math.sqrt(Math.pow(dlong, 2) + Math.pow(dlat, 2))
    }

    const Rm = linear_Polar()

    let circularArea = {
        type: "FeatureCollection",
        name: 'CircularArea',
        crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        features: [{
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    []
                ]
            }
        }]
    }

    let theCoordinates = circularArea['features'][0]['geometry']['coordinates'][0]

    for (let i = 0; i <= segments; i++) {

        let xi, yi, dx, dy, degCent, degVert

        degCent = i
        degVert = 180 - (degCent + 90)

        dx = Rm * Math.sin(toRadian(degCent))
        dy = Rm * Math.sin(toRadian(degVert))

        xi = XOrigin + dx
        yi = YOrigin + dy

        // Rounded off to 5 dp
        theCoordinates[i] = [roundoff(xi, 5), roundoff(yi, 5)]

    }

    return JSON.stringify(circularArea)
}


console.log(CircleGeoJson({ lng: 36.8, lat: -1.3, radius: 2000 }))