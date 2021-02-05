import { Container, Label, Grid, Card, Header } from 'semantic-ui-react'


const Order = ({order})=>{
    const items = order.products
    let total = 0

    items.forEach(x => {
        total += parseInt((x.price.split('.')[1] * x.quantity))
    })

    const orderedItems = items.map(item => {
        return(
            <Grid style={{ marginTop: '30px', marginBottom: '30px' }}>
                <img src={item.mediaUrl} style={{ height: '70px' }}/>
                <Header as='h3'>{item.pName}</Header>
                <Header as='h3'>Quantity: {item.quantity}</Header>
                <Header as='h3'>Price: {item.price.split('.')[1] * item.quantity}</Header>
            </Grid>
        )
    })

    return(
        <Container style={{ marginTop: '70px' }}>
            <Grid stackable columns='equal'>
                <Grid.Column></Grid.Column>
                <Grid.Column width={10}>
                    <Grid>
                        <Card raised fluid color='green'>
                            <Card.Content>
                                <Header as='h2'>Order Id: <Label size='big'>{order._id}</Label></Header>
                                <Header as='h3'>Name: {order.name}</Header>
                                <Header as='h3'>Phone: {order.phone}</Header>
                                <Header as='h3'>Delivery Address: {order.address}</Header>
                                <Header as='h3'>Total Amount: {total + 50}</Header>
                                <Header as='h3'>Ordered Date: {order.orderDate}</Header>
                            </Card.Content>
                        </Card>
                    </Grid>
                    <Header as='h1' color='green' style={{ marginTop: '70px' }}>Ordered Items</Header>
                    <hr />
                    { orderedItems }
                </Grid.Column>
                <Grid.Column></Grid.Column>
            </Grid>
        </Container>
    )
}

export async function getServerSideProps({params:{id}}) {
    const res = await fetch(`http://localhost:3000/api/order/${id}`)
    const data = await res.json()
    return {
      props: {order:data}
    }
}

export default Order