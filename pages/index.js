import Link from 'next/link'
import { Container, Card, Image, Label, Grid, Button, Segment } from 'semantic-ui-react'
import { useDispatchCart } from '../components/Cart'
import CartProduct from '../models/cartProduct'
import { addItem } from '../helpers/cartHelper'

export default function Home({products}) {

  const dispatch = useDispatchCart();

    const addToCart = (product) => {

        let addedProduct = new CartProduct(product._id, product.name, product.price, 1, product.mediaUrl);
        
        dispatch({ type: "ADD", addedProduct });

        addItem(addedProduct);
    };
    
  const productList = products.map(product=>{
    return(
      <Grid.Column>        
        <Card raised style={{ marginBottom: '15px' }} >
          <Link href={'/product/[id]'} as={`/product/${product._id}`}>
            <Image as='a' src={product.mediaUrl} wrapped ui={false} style={{ padding: '10px', backgroundColor: 'white' }}/>
          </Link>
            <Card.Content>
              <Card.Header style={{ marginTop: '3px' }}>{product.name}</Card.Header>
              <Card.Description>
                <Label color='teal' tag style={{ marginTop: '7px' }}>
                  {product.price}
                </Label>
              </Card.Description>
            </Card.Content>
            { product.quantity > 0 ?
              <Button onClick={() => { addToCart(product) }} color='green'>Add to Cart</Button> 
              : 
              <Button color='orange'>Out of Stock</Button>
            }
        </Card>    
      </Grid.Column>
    )
  })

  return (
    <Container style={{ marginTop: '70px' }}>
      <Grid>
        <Grid.Column>
          <Segment raised>
            <Label color='purple' ribbon>Smartphones</Label>
            <span>Check Our Popular Products</span>
          </Segment>
        </Grid.Column>
      </Grid>
      
      <Grid stackable columns={4}>
        {productList}
      </Grid>
    </Container>
  )
}

export async function getStaticProps(){
  const res =  await fetch(`http://localhost:3000/api/products`)
  
  const data = await res.json()
  return {
    props:{
      products:data
    }
  }
 }