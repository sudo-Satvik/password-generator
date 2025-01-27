import PasswordGenerator from "./PasswordGenerator"

function App() {

  return (
    <div className="bg-black w-full h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-3xl lg:text-5xl font-semibold my-10">Password Generator</h1>
      <PasswordGenerator />
      <footer>
        <p className="text-md my-10 text-gray-500">Code and Developed by <span className="text-white font-bold">Satvik Sharma</span></p>
      </footer>
    </div>
  )
}

export default App
