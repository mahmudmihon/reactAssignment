import { Container, Grid, Button, Card, Header, Form } from 'semantic-ui-react'
import { useState } from 'react'
import { useCart, useDispatchCart } from '../components/Cart'
import { useRouter } from 'next/router'

export default function Checkout(){

    const items = useCart()
    const dispatch = useDispatchCart()
    const router = useRouter()

    const [information, setInformation] = useState({
        fullName: '',
        phone: '',
        address: '',
    })

    const handleChange = e => setInformation({...information, [e.target.name]: e.target.value})

    const handleInformation = () => {

        const res = fetch(`http://localhost:3000/api/checkout`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name: information.fullName,
                phone: information.phone,
                address: information.address,
                products: items,
                orderDate: new Date().toDateString()
            })
        })

        items.forEach(product => {
            fetch(`http://localhost:3000/api/product/${product.id}`,{
                method:"PUT",
                headers:{
                   "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    id: product.id,
                    quantity: product.quantity
                })
            })
        })

        dispatch({ type: "CLEAR" });
        localStorage.clear();
        router.push('/confirmation')
    }

    const orderList = items.map((product, index) => {
        return(
            <Grid style={{ marginTop: '30px', marginBottom: '30px' }}>
                <img src={product.mediaUrl} style={{ height: '70px' }}/>
                <Header as='h3'>{product.pName}</Header>
                <Header as='h3'>Quantity: {product.quantity}</Header>
                <Header as='h3'>Price: {product.price.split('.')[1] * product.quantity}</Header>
            </Grid>
        )
    })

    return(
        <Container style={{ marginTop: '70px' }}>
            <Grid stackable columns='equal'>
                <Grid.Column></Grid.Column>
                <Grid.Column width={10}>
                    <Card raised style={{width: '100%'}} >
                        <Card.Content >
                            <Form onSubmit={ handleInformation }>
                                <Form.Field required>
                                    <label>Full Name</label>
                                    <input type="text" name='fullName' onChange={ handleChange } placeholder='Your Full Name(First_Name Last_Name)' pattern="[A-Za-z]{2,} [A-Za-z]{2,}" title="Ex. Zahir Mahmud" />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Phone Number</label>
                                    <input type="tel" name='phone' onChange={ handleChange } placeholder="01XXXXXXXXX" pattern="01[0-9]{9}" title="Ex. 01972308755" />
                                </Form.Field>
                                <Form.TextArea name='address' onChange={ handleChange } label='Address' placeholder='Your detailed address...' required />
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                   <Button color="green" type='submit' style={{borderRadius: '30px', padding: '10px 50px'}}>Confirm</Button>
                                </div>
                            </Form>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column></Grid.Column>
            </Grid>

            <Grid stackable columns='equal' style={{ marginTop: '70px'}}>
                <Grid.Column></Grid.Column>
                <Grid.Column width={10}>
                    <Header as='h1' color='green'>Ordered items</Header>
                    <hr />
                    {orderList}
                </Grid.Column>
                <Grid.Column></Grid.Column>
            </Grid>
        </Container>
    )
}