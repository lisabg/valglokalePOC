import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Body from "./components/Body";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

//Docs: https://ws.geonorge.no/kommuneinfo/v1/
const API_ENDPOINT = "https://ws.geonorge.no/kommuneinfo/v1";
const VOTING_LOCATTION_ENDPOINT =
  "https://hotell.difi.no/api/json/valg/valglokaler/2017?";

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      counties: [],
      municipalities: [],
      pages: 0,
      total: 0,
      locations: [],
      view: "all",
    };
  }

  componentDidMount() {
    axios
      .get(`${API_ENDPOINT}/fylker`)
      .then((response) => {
        //console.log(response.data);
        this.setState({
          isLoaded: true,
          counties: response.data,
        });
      })
      .catch(function (error) {
        //console.log(error);
        this.setState({
          isLoaded: true,
          error: error,
        });
      });

    axios
      .get(`${API_ENDPOINT}/kommuner`)
      .then((response) => {
        //console.log(response.data);
        this.setState({
          isLoaded: true,
          municipalities: response.data,
        });
      })
      .catch(function (error) {
        //console.log(error);
        this.setState({
          isLoaded: true,
          error: error,
        });
      });

    axios
      .get(`${VOTING_LOCATTION_ENDPOINT}page=1`)
      .then((response) => {
        //console.log(response.data.entries);
        this.setState({
          isLoaded: true,
          locations: response.data.entries,
        });
      })
      .catch(function (error) {
        //console.log(error);
        this.setState({
          isLoaded: true,
          error: error,
        });
      });

    if (this.state.view === "closest") {
/*       if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              console.log(result.state);
              //If granted then you can directly call your function here
            } else if (result.state === "prompt") {
              console.log(result.state);
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
            result.onchange = function () {
              console.log(result.state);
            };
          });
      } else {
        alert("Sorry Not available!");
      } */
    }
  }

  render() {
    //console.log(this.state.pages)
    //console.log(this.state.total)

    const handleAllClick = (event) => {
      this.setState({
        view: "all",
      });
    };

    const handleClosestClick = (event) => {
      this.setState({
        view: "closest",
      });
    };

    const handleChooseClick = (event) => {
      this.setState({
        view: "choose",
      });
    };

    return (
      <div className="App">
        <div className="Header" class="App-header">
          <h1>Finn Ditt Valglokale</h1>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleAllClick}>Alle</Button>
            <Button onClick={handleClosestClick}>Nærmeste</Button>
            <Button onClick={handleChooseClick}>Velg selv</Button>
          </ButtonGroup>
        </div>
        <Body
          counties={this.state.counties}
          municipalities={this.state.municipalities}
          locations={this.state.locations}
          view={this.state.view}
        />
      </div>
    );
  }
}

export default App;
