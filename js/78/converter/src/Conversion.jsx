import React from 'react'

export default function Conversion({to, from, amount, rate}) {
  return (
    <>
    <div>{amount} {from} = {rate*amount} {to}</div>

    <h5>1 {from} = {rate} {to}</h5>
    </>
  )
}
