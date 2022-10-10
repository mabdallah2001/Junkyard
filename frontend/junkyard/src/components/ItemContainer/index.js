import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ItemCard({ item }) {

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => navigate(`/dashboard/item/${item.id}`)}>
      <CardActionArea>
        <CardMedia
        component="img"
        height="140"
        image={ item.image_url}
        alt="item image"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          { item.name }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { item.description }
        </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ItemCard;