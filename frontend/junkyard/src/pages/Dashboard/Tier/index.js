import {Fragment, useState} from 'react'

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// Context
import {useAuthController, setTier} from "../../../context";

// Toast
import {toast} from "react-toastify";

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '1 Garage included',
      '50 Items per garage',
      'Email support',
    ],
    buttonText: 'Select',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '3 Garages included',
      '100 Items per garage',
      'Email support',
    ],
    buttonText: 'Select',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '5 Garages included',
      '150 items per garage',
      'Priority Email support',
    ],
    buttonText: 'Select',
    buttonVariant: 'outlined',
  },
];

function Tier() {

  const [authController, authDispatch] = useAuthController();
  const { user, currentTier } = authController;

  const [processing, setProcessing] = useState(false);

  function getTierName(value) {
    switch (value) {
      case 0:
        return "Free"
      case 1:
        return "Pro"
      case 2:
        return "Enterprise"
      default:
        return "Free"
    }
  }

  async function updateTier(email, uid, type) {
    return await fetch("http://localhost:8080/api/users/update", {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        uid,
        type
      })
    })
      .then((response) => response.json())
      .then(() => {
        setTier(authDispatch, getTierName(type));
        toast.success("Successfully changed tier");
        setProcessing(false);
      })
      .catch(error => {
        toast.error("Unable to process request");
        setProcessing(false);
      })
  }

  function handleUpgrade(value) {
    // TODO: API to set tier
    setProcessing(true);
    let type;
    switch (value) {
      case "Free":
        type = 0;
        break;
      case "Pro":
        type = 1;
        break;
      case "Enterprise":
        type = 2;
        break;
      default:
        type = 0;
    }

    updateTier(user.email, user.uid, type);
  }



  return (
    <Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Account Tier
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Upgrade your account for additional benefits and higher limits!
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={currentTier === tier.title ? "contained" : tier.buttonVariant}
                    onClick={() => {
                      handleUpgrade(tier.title);
                    }}
                    disabled={currentTier === tier.title || processing}
                  >
                    {currentTier === tier.title ? "Selected" : tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Tier;