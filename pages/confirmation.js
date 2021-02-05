import {
  Container,
  Grid,
  Icon,
} from "semantic-ui-react";

export default function Confirmation() {

  return (
    <Container style={{ marginTop: "70px" }}>
      <Grid stackable columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={5}>
          <Grid textAlign="center">
            <Icon name="check circle" size="massive" color="green" />
          </Grid>
          <Grid textAlign="justified">
            <p style={{ fontSize: '20px', marginTop: '15px' }}>
              We have received your order! Thank you for being with us! Hope to
              see you soon.
            </p>
          </Grid>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  );
}
