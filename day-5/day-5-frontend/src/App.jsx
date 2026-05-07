import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const App = () => {

  let handleFormSubmit = async(e)=>{
    e.preventDefault()
    try {
      let res = await axios.post("http://localhost:3000/create-product", data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const[data, setData] = useState({})
  return (
    <div>
      <h1>Product Creation Form</h1>
<form onSubmit={handleFormSubmit}>
        <fieldset>

        <legend>Product Information</legend>

        <label htmlFor="name">Name:</label>
        <input onChange={(e)=>setData({...data, name: e.target.value})} type="text" id="name" name="name" />
        <br />
        <br />
        
        <label htmlFor="description">Description:</label>
        <input onChange={(e)=>setData({...data, description: e.target.value})} type="text" id="description" name="description" />

        <br />
        <br />
        
        <label htmlFor="category">Category:</label>
        <select onChange={(e)=>setData({...data, category: e.target.value})} id="category" name="category">
          <option default value="MEN">MEN</option>
          <option value="WOMEN">WOMEN</option>
          <option value="KIDS">KIDS</option>
        </select>
      </fieldset>
      <br />
      <fieldset>
        <legend>Price Information</legend>

        <label htmlFor="amount">Amount:</label>
        <input onChange={(e)=>setData({...data, amount: e.target.value})} type="number" id="amount" name="amount" />
        <br />
        <br />
        
        <label htmlFor="currency">Currency:</label>
        <select onChange={(e)=>setData({...data, currency: e.target.value})} id="currency" name="currency">
          <option default value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
      </fieldset>
      <br />
      <fieldset>
        <legend>Stock Information</legend>

        <label htmlFor="stock">Stock:</label>
        <input onChange={(e)=>setData({...data, stock: e.target.value})} type="number" id="stock" name="stock" />
      </fieldset>
      <br />
      <button type="submit">Create Product</button>
</form>
    </div>
  )
}

export default App
