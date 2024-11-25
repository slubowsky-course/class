export default function Address(props) {
  const { street, city, state, zip } = props.address;

  return (
    <>
      <div>{street}</div>
      <div>{city} {state}</div>
      <div>{zip}</div>
    </>
  )
}
