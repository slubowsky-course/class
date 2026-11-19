export default function Weather({ weather }) {
  return (
    <>
      <div>The weather in <span>{weather?.location}</span></div>
      <img src={weather?.icon} />
      <div><span>{weather?.temperature}</span> and <span>{weather?.description}</span></div>
    </>
  )
}
