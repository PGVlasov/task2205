import Card from 'react-bootstrap/Card';

export const PersonCard = ({ person }) => {
  return (
    <Card className='d-flex justify-content-between ms-2 mt-2 me-2'>
      <Card.Img
        style={{ maxHeight: '12rem' }}
        variant="top" src={"http://localhost:3010/uploads/" + person.avatarUrl}
        alt='Person has no photo' />
      <Card.Body>
        <Card.Title>
          Name: {person.name}
        </Card.Title>
        <Card.Text>
          Birthday: {person.birthday}
        </Card.Text>
      </Card.Body>
    </Card >
  );
}
