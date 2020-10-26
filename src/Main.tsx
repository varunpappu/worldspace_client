import React from "react";
import { App } from "./App";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import Control from "react-leaflet-control";
import { SearchBox } from "./components/SearchBox";
import { NavBar } from "./components/NavBar";
import { HttpProxy } from "./proxies/http-proxy";
import { URLS } from "./constants/web-routes";

export class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    this.state = {
      search: "",
      countryInfo: [],
    };
  }

  setSearch = async (search: string) => {
    this.setState({
      search,
    });

    await this.fetchCountryList(search);
  };

  updateCountryInfo = (
    newCountryInfo: Country[],
    existingCountryInfo: Country[]
  ) => {
    return newCountryInfo
      .filter((newCountry) => {
        if (
          !existingCountryInfo.some(
            (existingCountry) => newCountry.name === existingCountry.name
          )
        ) {
          return newCountry;
        }
      })
      .concat(existingCountryInfo);
  };

  fetchCountryList = async (countryName: string): Promise<void> => {
    if (!countryName) {
      return;
    }

    const url = `${URLS.getCountry}${countryName}`;
    const response: any = await HttpProxy.get(url, {});
    if (response.status === 200) {
      const updatedCountryInfo = this.updateCountryInfo(
        response.data,
        this.state.countryInfo
      );
      this.setState({
        search: countryName,
        countryInfo: updatedCountryInfo,
      });
    }
  };

  buildMarker = () => {
    const position = [51.505, -0.09] as LatLngExpression;
    return (
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  };

  render() {
    const position =
      this.state.countryInfo.length > 0
        ? this.state.countryInfo[0].latlng
        : ([51.505, -0.09] as LatLngExpression);
    return (
      <Map
        center={position}
        zoom={5}
        style={{ height: "100vh", width: "100wh" }}
        zoomControl={false}
      >
        <Control position="topleft">
          <SearchBox setSearch={this.setSearch} />
        </Control>
        <Control position="topright">
          <NavBar countryInfo={this.state.countryInfo} />
        </Control>

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.countryInfo.map((country: Country, index: number) => (
          <Marker key={index} position={country.latlng}>
            <Popup>
              {country.name} <br />
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export interface IMainProps {
  app: App;
}

interface IMainState {
  search: string;
  countryInfo: Array<Country>;
}

export interface Country {
  name: string;
  flag: string;
  latlng: any;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  demonym: string;
  area: number;
  nativeName: string;
  alpha2Code: string;
  alpha3Code: string;
  currencies: Array<object>;
}
