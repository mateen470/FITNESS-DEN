import { useState, useEffect, useRef } from "react";
import { Typography, Box, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const MapSection = () => {
  const mapRef = useRef();
  const searchBoxRef = useRef();
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [markers, setMarkers] = useState([]);
  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const addMarkers = (places) => {
    clearMarkers();

    const isMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      );
    };

    const newMarkers = places.map((place) => {
      const marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
      });

      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.name
      )}&query_place_id=${place.place_id}`;

      const infoWindow = new window.google.maps.InfoWindow({
        content: isMobile()
          ? `<a href=${url} target='_blank'>${place.name}</a>`
          : `<div>${place.name}</div>`,
      });

      if (isMobile()) {
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      } else {
        marker.addListener("mouseover", () => {
          infoWindow.open(map, marker);
        });

        marker.addListener("mouseout", () => {
          infoWindow.close();
        });

        marker.addListener("click", () => {
          window.open(url, "_blank");
        });
      }

      return marker;
    });

    setMarkers(newMarkers);

    setMarkers(newMarkers);
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
      return;
    }
    const existingScript = document.querySelector(
      'script[src^="https://maps.googleapis.com/maps/api/js?key="]'
    );
    if (existingScript) {
      window.initMap = initMap;
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAVH9_dhO-hUWBcQB8RORuHInVQMgNjWRs&libraries=places&callback=initMap`;
    script.defer = true;
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      delete window.initMap;
    };
  }, []);
  useEffect(() => {
    if (map && currentPlace) {
      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: currentPlace.geometry.location,
          radius: 1000,
          type: ["gym"],
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaces(results);
            addMarkers(results);
          }
        }
      );
    }
  }, [map, currentPlace]);
  const initMap = () => {
    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 31.4027, lng: 74.2126 },
        zoom: 13,
      });

      let userMarker;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(pos);
          map.setCenter(pos);

          if (userMarker) userMarker.setMap(null);

          userMarker = new window.google.maps.Marker({
            position: pos,
            map: map,
            icon: {
              url: "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685901274/usergps_rk5beg.svg",
              scaledSize: new window.google.maps.Size(50, 50),
            },
          });

          setCurrentPlace({
            geometry: { location: pos },
          });
        });
      }

      const searchBox = new window.google.maps.places.SearchBox(
        searchBoxRef.current
      );
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        setCurrentPlace(places[0]);

        const pos = places[0].geometry.location;
        map.setCenter(pos);

        if (userMarker) userMarker.setMap(null);

        userMarker = new window.google.maps.Marker({
          position: pos,
          map: map,
          icon: {
            url: "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685901274/usergps_rk5beg.svg",
            scaledSize: new window.google.maps.Size(50, 50),
          },
        });
      });

      setMap(map);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        color={"white"}
        variant={
          windowWidth < 900 && windowWidth > 500
            ? "h3"
            : windowWidth < 500
            ? "h4"
            : "h2"
        }
        textAlign={"center"}
        sx={{
          textShadow: "3px 0px 0px purple",
          fontWeight: 800,
          mt: windowWidth < 600 ? 10 : "",
        }}
      >
        Find Gyms Nearby
      </Typography>
      <Box>
        <Box
          sx={{
            my: 5,
            px: 1,
            minWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "2px solid white",
          }}
        >
          <input
            type="text"
            placeholder="Enter a Place"
            ref={searchBoxRef}
            style={{
              minWidth: "100%",
              padding: windowWidth < 400 ? "10px 0px" : "10px",
              color: "black",
              backgroundColor: "none",
              outline: "none",
              border: "none",
              fontSize:
                windowWidth < 1100 && windowHeight > 1000
                  ? "3vw"
                  : windowWidth < 1000
                  ? "1.2rem"
                  : "2vw",
            }}
          />
          <SearchIcon
            sx={{
              color: "white !important",
              fontSize:
                windowWidth < 1100 && windowHeight > 1000
                  ? "3vw"
                  : windowWidth < 1000
                  ? "1.2rem"
                  : "2vw",
            }}
          />
        </Box>
      </Box>
      <Container>
        <Box ref={mapRef} sx={{ minHeight: "70vh", borderRadius: 5, mb: 4 }} />
        {places.length > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pl: 1,
              pr: 3,
            }}
          >
            <table
              style={{
                marginBottom: "5rem",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      fontFamily: "Comme, sans-serif",
                      fontSize: windowWidth < 600 ? "1.2rem" : "1.8rem",
                      color: "white",
                      fontWeight: "bold",
                      borderBottom: "3px solid black",
                      paddingBottom: "5px",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      fontFamily: "Comme, sans-serif",
                      fontSize: windowWidth < 600 ? "1.2rem" : "1.8rem",
                      color: "white",
                      fontWeight: "bold",
                      borderBottom: "3px solid black",
                      paddingBottom: "5px",
                    }}
                  >
                    Address
                  </th>
                  <th
                    style={{
                      fontFamily: "Comme, sans-serif",
                      fontSize: windowWidth < 600 ? "1.2rem" : "1.8rem",
                      color: "white",
                      fontWeight: "bold",
                      borderBottom: "3px solid black",
                      paddingBottom: "5px",
                    }}
                  >
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {places.map((place) => (
                  <tr
                    key={place.id}
                    style={{ borderBottom: "1px solid white" }}
                  >
                    <td
                      style={{
                        padding: "0.5rem",
                        fontFamily: "Comme, sans-serif",
                        fontSize: windowWidth < 600 ? "1rem" : "1.3rem",
                        color: "white",
                      }}
                    >
                      {place.name}
                    </td>
                    <td
                      style={{
                        padding: windowWidth < 600 ? "1rem" : "0.5rem 2rem",
                        fontFamily: "Comme, sans-serif",
                        fontSize: windowWidth < 600 ? "1rem" : "1.3rem",
                        color: "white",
                      }}
                    >
                      {place.vicinity}
                    </td>
                    <td
                      style={{
                        padding: windowWidth < 600 ? "1rem" : "0.5rem 2rem",
                        fontFamily: "Comme, sans-serif",
                        fontSize: windowWidth < 600 ? "1rem" : "1.3rem",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {place.rating || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}
      </Container>
    </Container>
  );
};

export default MapSection;
