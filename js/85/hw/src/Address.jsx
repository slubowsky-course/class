import './Address.css';

export default function Address(props) {
  //console.log(props);

  const { street, city, state, zip } = props;
  const myStyle = { fontFamily: 'cursive', color: 'green' };

  return (
    <>
      <div className="address">{street}</div>
      <span style={{ fontFamily: 'cursive' }}>{city}</span>  <span>{state}</span>
      <div style={myStyle}>{zip}</div>
    </>
  );
}


export function Address2(props) {
  const { street, city, state, zip } = props.address;

  return (
    <>
      <div>{street}</div>
      <span>{city}</span>  <span>{state}</span>
      <div>{zip}</div>
    </>
  );
}
