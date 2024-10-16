import "./Logo.css"
import { Link } from "react-router-dom"


const Logo = () => {
  return (
    <Link to={'/'}>
        <div className="logo">
            CodeSync
        </div>
    </Link>
  )
}

export default Logo