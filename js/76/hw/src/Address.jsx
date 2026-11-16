import './Address.css';

export default function Address({ street, city, state, zip }) {
  //const { street, city, state, zip } = props;

  const style = {
    backgroundColor: 'red'
  };

  return (
    <div className="address">
      <div style={style}>{street}</div>
      <span>{city}</span> <span>{state}</span>
      <div style={{backgroundColor: 'red'}}>{zip}</div>
    </div>
  )
}
