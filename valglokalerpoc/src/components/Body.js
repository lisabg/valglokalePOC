import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Body(props) {
  const classes = useStyles();
  const handleCountyChange = (event, durp) => {
    console.log({ event, durp });
  };

  const handleMunicipalityChange = (event, durp) => {
    console.log({ event, durp });
  };

  console.log(props.locations);

  return (
    <div className={classes.content}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Fylke</InputLabel>
        <Select id="county-select" onChange={handleCountyChange}>
          {props.counties.map(function (county, index) {
            return (
              <MenuItem key={county.fylkesnummer} value={county.fylkesnummer}>
                {county.fylkesnavn}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Kommune</InputLabel>
        <Select id="municipality-select" onChange={handleMunicipalityChange}>
          {props.municipalities.map(function (municipality, index) {
            return (
              <MenuItem
                key={municipality.kommunenummer}
                value={municipality.kommunenummer}
              >
                {municipality.kommunenavn}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {props.locations.map((location, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {location.polling_place_name}
                  </Typography>
                  <Typography variant="subtitle1">
                    {location.address_line},
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {location.postal_code} {location.area}
                  </Typography>
                  {location.election_day_voting==1 ? (
                    <div>
                      <Accordion disabled>
                        <AccordionSummary>
                          <Typography className={classes.heading}>
                            Åpent på valgdagen: Ja
                          </Typography>
                        </AccordionSummary>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className={classes.heading}>
                            Åpningstider
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography gutterBottom>
                            {location.opening_hours
                              .split(",")
                              .map(function (time, index) {
                                return (
                                  <Typography key={index}>{time}</Typography>
                                );
                              })}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ) : (
                    <Accordion disabled>
                      <AccordionSummary>
                        <Typography className={classes.heading}>
                          Åpent på valgdagen: Nei
                        </Typography>
                      </AccordionSummary>
                    </Accordion>
                  )}
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Mer info
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography align="left">{location.info_text}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
