---
title: Glossary
---

## <a name="general"/>General

| Term                   | Explanation                     |
|------------------------|---------------------------------|
| Feed                   | Feeds provide routing data (e.g. stops and timetables) from one or more public transport agencies to the API. List of available feeds can be queried by using **[feeds](https://api.digitransit.fi/graphiql/finland?query=%7B%0A%20%20feeds%20%7B%0A%20%20%20%20feedId%0A%20%20%20%20agencies%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)** query. |
| Agency                 | Some public transport provider, e.g. HSL. |
| Disruption (Alert)     | A temporary change in public transport. For example, a stop out-of-use or diversion on a route. |
| Transportation Mode    | A means of transport, for example: walking, cycling, driving a car, bus, train, subway, tram, ferry, airplane. |
| City bike              | A shared-use bicycle that can be borrowed for a fee by anyone. |

## <a name="routes"/>Routes

| Term                   | Explanation                     |
|------------------------|---------------------------------|
| Route                  | A public transport service shown to customers under a single name, usually from point A to B and back. For example: trams 1 and 1A, buses 18 and 102T, or train A.<br/>Commonly used synonym: line |
| Pattern		 | A sequence of stops as used by a specific direction and variant of a route. For example a tram entering/departing service from/to the depot usually joins at the middle of the route, or a route might have a short term diversion (poikkeusreitti) without changing the route name (longer diversions are usually marked as different routes). |
| Trip                   | A specific occurance of a route, usually identified by the route and exact departure time from the first stop. For example bus 102 leaving from Otaniemi on 2017-11-21 10:00, or more generally leaving from Otaniemi at 10:00 on specified days. |
| Headsign               | A description of a route usually written on the front of the vehicle. For example: Helsinki (for just the destination) or Helsinki - Tampere (for both the origin and destination). |

## <a name="stops"/>Stops

| Term                   | Explanation                     |
|------------------------|---------------------------------|
| Station                | A location, which contains stops. For example, a train station is a station and its platforms are stops. | 
| Stop                   | A public transport stop, from which passengers can board vehicles. |
| Cluster                | A list of stops, grouped by name and proximity. |
| Stoptime               | Arrival or departure time at a stop. |
| Departure row          | A special location type, which lists departures of a certain pattern from a stop. Departures rows are identified with pattern id, so querying departure rows will return departures only from one stop per pattern. |

## <a name="itinerary-planning"/>Itinerary planning

| Term                   | Explanation                     |
|------------------------|---------------------------------|
| Itinerary              | A combination of different transportation modes at certain times to reach from origin to destination. For example, walking to a bus stop, taking a bus for two stops and then walking to the final destination.<br/>Commonly used synonym: journey |
| Leg                    | One part of an itinerary, e.g. walking to a bus stop or a bus ride between two stops. |
| Origin                 | A geographical point where an itinerary begins. |
| Destination            | A geographical point where an itinerary ends. |