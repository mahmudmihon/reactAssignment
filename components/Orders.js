import { Container, Grid, Button, Card, Header } from 'semantic-ui-react'

export default function OrderList(orders) {
    const orderList = orders.map(order=>{
        return(
          <Card fluid color='green' style={{ marginBottom: '15px' }}>
                <Header as='h2'>Order Id: {order._id}</Header>
                <Header as='h2'>Ordered Items: {order.products.length}</Header>
                <Header as='h2'>Ordered Date: {order.orderDate}</Header>
                <Button color='green' style={{ borderRadius: '30px' }}>View Details</Button>
          </Card>  
        )
    })
    
    return (
        <Container style={{ marginTop: '70px' }}>
          <Grid stackable columns='equal'>
            <Grid.Column></Grid.Column>
            <Grid.Column width={10}>
              <Header as='h1' color='green'>Order Lists</Header>
              <hr />
              { orderList }
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </Container>
    )
}
