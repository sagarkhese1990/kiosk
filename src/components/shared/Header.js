import React from 'react'
import { Form, FormControl, InputGroup, Navbar } from 'react-bootstrap'
import logo from '../../assest/images/logo.png'
import { IoIosSearch } from "react-icons/io"
function Header(props) {
    const handleSearch = (value) => {  
        props.handleSearch(value)
    }
    return (
        <Navbar className="header" variant="dark">
            <div className="brand">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        className="brand-image"
                    />{' '}
                </Navbar.Brand>
            </div>
            <div className="search-bar px-5">
                <Form>
                    {/* <Form.Control size="lg" type="text" placeholder="Search" /> */}
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend onClick={() => handleSearch()}>
                            <InputGroup.Text><IoIosSearch /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="inlineFormInputGroup" placeholder="Search" 
                        onChange={(event) => handleSearch(event.target.value)} 
                        />
                    </InputGroup>
                </Form>
            </div>
            <div className="profile-info">

            </div>
        </Navbar>
    )
}

export default Header
