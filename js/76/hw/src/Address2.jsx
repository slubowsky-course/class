
export default function Address2({ address: { street, city, state, zip } }) {
  // const { address: { street, city, state, zip } } = props;

  return (
    <>
      <div>{street}</div>
      <span>{city}</span> <span>{state}</span>
      <div>{zip}</div>
    </>
  )
}
