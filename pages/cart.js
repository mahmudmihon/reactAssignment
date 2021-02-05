import { Container, Label, Grid, Button, Card, Header } from 'semantic-ui-react'
import { useCart, useDispatchCart } from '../components/Cart'
import Link from 'next/link'
import { removeItem } from '../helpers/cartHelper'

export default function Cart(){
    const items = useCart();
    const dispatch = useDispatchCart();
    let subTotal = 0;

    items.forEach(x => subTotal += (parseInt(x.price.split('.')[1] * x.quantity)));


   const handleRemove = (index, id) => {
    dispatch({ type: "REMOVE", index });
    removeItem(id);
  };

    const cartList = items.map((product, index) => {
        console.log(product)
        return(
            <Grid stackable columns={3} style={{ marginTop: '50px' }}>
                <Grid.Column textAlign='right'>
                    <img src={product.mediaUrl} style={{ height: '150px' }}/>
                </Grid.Column>
                <Grid.Column>
                    <h2>{product.pName}</h2>
                    <h3>Quantity: {product.quantity}</h3>
                    <Label color='teal' tag>{product.price.split('.')[1] * product.quantity}</Label>
                </Grid.Column>
                <Grid.Column style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button color='red' onClick={() => { handleRemove(index, product.id) }} style={{ borderRadius: '30px' }}>Remove</Button>
                </Grid.Column>
            </Grid>
        )
    })

    return(
        <Container style={{ marginTop: '70px' }}>
            <Grid stackable columns='equal'>
                <Grid.Column width={11}>
                <Header as='h1' color='green'>Your cart has {`${items.length}`} items</Header>
                <hr />
                {items.length === 0 && 
                    <Link href={'/'}>
                        <Button color='orange' style={{ borderRadius: '30px', marginTop: '20px' }}>Continue Shopping</Button>
                    </Link>
                }
                {cartList}
                </Grid.Column>

                {items.length > 0 && 
                    <Grid.Column>
                        <Header as='h1' color='green'>Cart Summary</Header>
                        <hr />
                        <Card raised>
                            <Card.Content>
                                <p style={{ fontSize: '20px', margin: '10px 5px' }}>Subtotal: <Label color='teal' tag>BDT. {subTotal}</Label></p>
                                <p style={{ fontSize: '20px', margin: '15px 5px' }}>Delivery Charge: <Label color='teal' tag>BDT. 50</Label></p>
                                <hr />
                                <p style={{ fontSize: '20px', margin: '10px 5px' }}>Total: <Label color='teal' tag>{subTotal + 50}</Label></p>
                            </Card.Content>
                            <Link href={'/checkout'}>
                                <Button color='green'>Checkout</Button>
                            </Link>
                        </Card>
                    </Grid.Column>
                }               
            </Grid>          
        </Container>
    );
}