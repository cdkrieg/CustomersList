const axios = require("axios");

const geocodeURL =
  "https://eec19846-geocoder-us-census-bureau-v1.p.rapidapi.com/geographies/onelineaddress";
  const distanceURL = 'https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix'

const getGeocode = async (address) => {
  try {
    let response = await axios.get(geocodeURL, {
      params: {
        benchmark: "Public_AR_Current",
        address: address,
        format: "json",
        vintage: "Current_Current",
      },
      headers: {
        "X-RapidAPI-Host":
          "eec19846-geocoder-us-census-bureau-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "5585e4c1e6msh9233b0e8cf0a333p1fc8b6jsn2386335b6964",
      },
    });
    if (response) 
    console.log(response)
    return [response.data.result.addressMatches[0].coordinates.x,response.data.result.addressMatches[0].coordinates.y];
  } catch (error) {
      console.log(`Error getting coordinates from Geocoder: ${error}`)
  }
};

const getDistance = async (origin, destination) => {
    try {
        let response = await axios.get(geocodeURL, {
          params: {
            origins: origin,
            destinations: destination
          },
          headers: {
            'X-RapidAPI-Host': 'trueway-matrix.p.rapidapi.com',
    'X-RapidAPI-Key': '5585e4c1e6msh9233b0e8cf0a333p1fc8b6jsn2386335b6964'
          },
        });
        if (response) return (response.data.distances[0][0] * 0.0006214 );
      } catch (error) {
          console.log(`Error getting coordinates from Geocoder: ${error}`)
      }
      // 1 meter = 0.0006214 miles
}

const AxiosAPI = {getGeocode, getDistance}
export default AxiosAPI
