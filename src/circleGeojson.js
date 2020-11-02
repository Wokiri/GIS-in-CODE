const toRadian = deg => deg * Math.PI / 180

const toDegree = rad => rad * 180 / Math.PI

const a = 6378137.00

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

    let circle = {
        type: "Polygon",
        coordinates: [
            [

            ]
        ]
    }

    let mainHolder = circle['coordinates'][0]

    for (let i = 0; i <= segments; i++) {

        let xi, yi, dx, dy, degCent, degVert

        degCent = i
        degVert = 180 - (degCent + 90)

        dx = Rm * Math.sin(toRadian(degCent))
        dy = Rm * Math.sin(toRadian(degVert))

        xi = XOrigin + dx
        yi = YOrigin + dy

        mainHolder[i] = [xi, yi]

    }

    return JSON.stringify(circle)
}

console.log(CircleGeoJson({ lng: 36, lat: 0, radius: 2000 }))