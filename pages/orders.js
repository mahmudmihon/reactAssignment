import { Container, Grid, Button, Card, Header, Label } from 'semantic-ui-react'
import Link from 'next/link'

export default function Orders({orders}) {

    const orderList = orders.map(order=>{
        return(
          <Card raised fluid style={{ margin: '20px 0px' }}>
            <Card.Content>
                <Header as='h2'>Order Id: <Label size='big'>{order._id}</Label></Header>
                <Header as='h3'>Ordered Items: {order.products.length}</Header>
                <Header as='h3'>Ordered Date: {order.orderDate}</Header>
            </Card.Content>
            <Link href={'/order/[id]'} as={`/order/${order._id}`}>
                <Button color='green' style={{ borderRadius: '30px' }}>View Details</Button>
            </Link>
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

export async function getStaticProps(){
    const res =  await fetch(`http://localhost:3000/api/orders`)
    const data = await res.json()

    return {
      props:{
        orders:data
      }
    }
}