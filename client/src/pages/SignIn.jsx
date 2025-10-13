import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

  const [formData, setFormData] = useState({})

  //take care of error
  const [error, setError] = useState(null)

  //take care of loading state
  const [loading, setLoading] = useState(false)

  //to navigate to another page authomatically
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      //now we fetch our res from the api
      // we use a proxy in other not to use http://localhost:5173 all the time
      // we go to the vite.config.js to set the proxy
      // after we come back here and set the response to JSON i.e the formData
      const res = await fetch("/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }


  }


  // console.log(data) 
  // console.log(formData)

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          placeholder='email'
          className='border p-3 rounded-lg'
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='password'
          className='border p-3 rounded-lg'
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:bg-opacity-80'>
          {/* loading effect */}
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>
          Dont have an account ?
        </p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'> Sign up</span>
        </Link>
      </div>
      {error && <div className='text-red-500 p-3 mt-5'>{error}</div>}
    </div>
  )
}

// onChange: handleChange
// setFormData: spread data ...formData
// submit form: use an event listener onSubmit
// e.preventDefault(): prevents refreshing of the page when we submit the form
