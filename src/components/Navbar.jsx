import '../styles/Navbar.css'
function Navbar() {
  return (
    <nav>
    <div className="wrapper">
        <div className="logo"><a href=''>Eye Care.</a></div>
        <div className="menu">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#Service">Service</a></li>
                <li><a href="#About">About</a></li>
                
                <li><a href="" className="tbl-biru">Sign Up</a></li>
            </ul>
        </div>
    </div>
</nav>
  )
}

export default Navbar
