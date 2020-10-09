import json
import random
import os
import csv

# Create output dir, set relative path to dir, write csv to the dir
os.makedirs('../Result', exist_ok=True)
pathToResult = os.path.join('../Result', 'CountiesWithin36Deg.csv')
resultsInCsv = open(pathToResult, 'w', newline='')
writeToCounties = csv.writer(resultsInCsv)
writeToCounties.writerow(['County Name', 'Furthest West Longitude', 'Furthest East Longitude'])

countyName = ''
maxLong = 0
minLong = 0
maxLat = 0
minLat = 0


with open('./KenyanCountiesData.json') as KenyanCountiesJson:

    # Parsing JSON data
    kenyanCounties = json.loads(KenyanCountiesJson.read())

    # Accessing the features
    countiesFeatures = kenyanCounties['features']

    for itemsNumber in range(len(countiesFeatures)): # For every of the 47 counties

        countyName = countiesFeatures[itemsNumber]['properties']['NAME']

        randomCoordinatesFromList2 = countiesFeatures[itemsNumber]['geometry']['coordinates']
        
        for itemsNumber2 in range(len(randomCoordinatesFromList2)):
            polygonCordinates2 = randomCoordinatesFromList2[itemsNumber2]

            for itemsNumber3 in range(len(polygonCordinates2)):
                polygonCoordinatesFromList2 = polygonCordinates2[itemsNumber3]

                maxLong = polygonCoordinatesFromList2[random.randint(0, len(polygonCordinates2) - 1)][0]
                minLong = polygonCoordinatesFromList2[random.randint(0, len(polygonCordinates2) - 1)][0]

                maxLat = polygonCoordinatesFromList2[random.randint(0, len(polygonCordinates2) - 1)][1]
                minLat = polygonCoordinatesFromList2[random.randint(0, len(polygonCordinates2) - 1)][1]

                for itemsNumber4 in range(len(polygonCoordinatesFromList2)):
                    polyCoords2 = polygonCoordinatesFromList2[itemsNumber4]

                    longFromPolyCoords2 = polyCoords2[0]
                    latFromPolyCoords2 = polyCoords2[1]

                    if longFromPolyCoords2 >= maxLong:
                        maxLong = longFromPolyCoords2

                    if longFromPolyCoords2 <= minLong:
                        minLong = longFromPolyCoords2

                    if latFromPolyCoords2 >= maxLat:
                        maxLat = latFromPolyCoords2

                    if latFromPolyCoords2 <= minLat:
                        minLat = latFromPolyCoords2

                    # print(f" {countyName} => Coords {latFromPolyCoords2}")
        if minLong <= 37 and maxLong > 36:
            print(f" {countyName} => from {minLong} to {maxLong}")

            
            writeToCounties.writerow([countyName, minLong, maxLong])
resultsInCsv.close()



                    