import { Container, Label, Grid, Button, Form } from 'semantic-ui-react'
import { useDispatchCart } from '../../components/Cart'
import CartProduct from '../../models/cartProduct'
import { useState } from 'react'
import { addItem } from '../../helpers/cartHelper'
import { useToasts } from "react-toast-notifications";

const Product = ({product})=>{

    const {addToast} = useToasts();
    const dispatch = useDispatchCart();
    
    const [quan, setQuantity] = useState({
        pQuantity: 1
    })

    const addToCart = () => {

        if(quan.pQuantity < 1 || quan.pQuantity > product.quantity){
            addToast("QUANTITY MUST BE BETWEEN 1 & AVAILABLE QUANTITY!", { appearance: "warning", placement: "bottom-center" })
        }
        else{

            let addedProduct = new CartProduct(product._id, product.name, product.price, quan.pQuantity, product.mediaUrl);
        
            dispatch({ type: "ADD", addedProduct });

            addItem(addedProduct)
        }
    };

    const handleChange = e => setQuantity({[e.target.name]: e.target.value})

    return(
        <Container style={{ marginTop: '70px' }}>
            <Grid stackable columns={2}>
            <Grid.Column textAlign="right">
                <img src={product.mediaUrl} style={{ width: '300px', height: '270px' }} />
            </Grid.Column>
            <Grid.Column>
                <h1>{product.name}</h1>
                <Label>By {product.manufacturer}</Label>
                <h3>Price: <Label color='teal' tag>{product.price}</Label></h3>
                <h3>Available Quantity: <Label circular color='orange' size='large'>{product.quantity}</Label></h3>
                <Form>
                    <input type="number" name='pQuantity' onChange={ handleChange } min={1} max={ product.quantity } style={{ width: '40%' }} placeholder="Quantity" /> <br /><br />
                </Form>
                { product.quantity > 0 ? 
                    <Button onClick={ addToCart } color='green' style={{ borderRadius: '30px', marginTop: '10px', padding: '15px 50px' }}>Add to Cart</Button>
                    :
                    <Button color='orange' style={{ borderRadius: '30px', marginTop: '10px', padding: '15px 50px' }}>Out of Stock</Button>
                }
                
            </Grid.Column>
            </Grid>

            <Grid style={{ marginTop: '70px', padding: '0px 20px'}}>
                <Grid.Column>
                    <h2>Description</h2>
                    <hr />
                    <p style={{ textAlign: 'justify', fontSize: '20px'}}>{product.description}</p>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export async function getServerSideProps({params:{id}}) {
    const res = await fetch(`http://localhost:3000/api/product/${id}`)
    const data = await res.json()
    return {
      props: {product:data}
    }
}

export default Product