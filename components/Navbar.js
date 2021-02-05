import Link from 'next/link'
import { Container, Menu, Icon, Label } from 'semantic-ui-react'
import { itemTotal } from '../helpers/cartHelper'
import { useCart } from './Cart'

export default function NavBar() {
    const items = useCart();
  return (
    <Container>
        <Menu secondary>
            <Link href={'/'}>
                <Menu.Item>
                    <img style={{ width: '50px' }} src='https://i.ibb.co/jWT7JrN/online.png' />
                </Menu.Item>
            </Link>
                           
            <Menu.Menu position='right'>
                <Link href={'/cart'}>
                    <Menu.Item>
                        <Icon name='opencart' size='big' />
                        <Label floating circular color='green' style={{ top: '5px', left: '90%'}}>{ items.length }</Label>
                    </Menu.Item>
                </Link>
                
                <Link href={'/orders'}>
                    <Menu.Item>
                        <Icon name='list ul' size='big' />
                    </Menu.Item>
                </Link>
            </Menu.Menu>
        </Menu>
    </Container>
  )
}