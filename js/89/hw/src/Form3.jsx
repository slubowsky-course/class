import React, { useState } from 'react'
import useFormLocalStorage from './useFormLocalStorage'

export default function Form3() {
  const [state, setState] = useFormLocalStorage('stuff', {
    email: 'dtrump@whitehouse.gov',
    password: 'sleepyjoe'
  });

  return (
    <>
      <label>
        email: <input name="email" type="email" value={state.email} onChange={/*handleChange*/ setState} />
      </label>
      <label>
        password: <input name="password" type="password" value={state.password} onChange={/*handleChange*/ setState} />
      </label>
    </>
  )
}
