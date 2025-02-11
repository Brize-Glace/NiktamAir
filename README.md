# NiktamAir
**WEBSITE**
https://niktam.hair 
NiktamAir is a web application that allows users to search for flight routes between different destinations, display the best fares, and suggest alternatives in case of errors in city name input.

## Main Features

### Trip Search
- **Search System v1 (NKM Search Engine Algorithm):**
  - Search for flight routes by city of origin and destination.
  - Automatic city suggestions based on Levenshtein distance to correct input errors.
  - Display available trips with details (origin, destination, date and time, price).

### Display of Featured Destinations
- Grid display of cards showcasing popular destinations with images, descriptions, and starting prices.

### User Interface
- **Search Form:**
  - Input fields for origin and destination cities.
- **Search Results:**
  - Display available trips in detailed card format.
  - Correction suggestions in case of typos in city names.

### Other Features
- **Navigation:**
  - Navigation bar with the airline's name.
- **Footer:**
  - Copyright information.
  - Links to the author's social media and projects.

## Next Features:
- Implementation of dynamic suggestions: Improve the user experience by providing real-time suggestions as the user types in the search fields.
- Enhanced result suggestions: Improve the algorithm to better handle complex airport names, including those with multiple words or special characters, ensuring more accurate matches.
- Save and display the history of recent searches for quick access.

## Technologies Used
- **HTML5**: Page structure.
- **CSS3**: Styles and layout.
- **JavaScript**: Dynamic functionalities and user interactions.
  - Levenshtein algorithm for city suggestions.
  - Fetch API to retrieve flight data from a JSON file.

## Author:
Romain - [Brize Glace](https://github.com/Brize-Glace/)

## Copyright Notice
&copy; 2024 NiktamAir Project. All Rights Reserved. This project is owned and maintained by Romain (Brize-Glace). Unauthorized use, distribution, or modification of this code is strictly prohibited.

