const toRadian = deg => deg * Math.PI / 180
const CircleGeoJson = params => {

    const segments = 360

    const XOrigin = params['lng']
    const YOrigin = params['lat']
    const R = params['radius']

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

        dx = R * Math.sin(toRadian(degCent))
        dy = R * Math.sin(toRadian(degVert))

        xi = XOrigin + dx
        yi = YOrigin + dy

        mainHolder[i] = [xi, yi]

    }

    return JSON.stringify(circle)
}

console.log(CircleGeoJson({ lng: 36, lat: 0, radius: 0.25 }))