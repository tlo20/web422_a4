
import { useRouter } from 'next/router'
import { Container, Nav, Navbar, NavLink, Form } from "react-bootstrap"

export default function MainNav() {
    const router = useRouter()

    function formsubmit(e) {
        e.preventDefault()
        router.push("/artwork?title=true&q=" + document.querySelector("#searchField").value)
    }

    return (
        <>
            <Navbar className="fixed-top navbar navbar-expand navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand >TSZ KIT LO</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink legacybehavior="true" passhref="true" href="/">Home</NavLink>
                        <NavLink legacybehavior="true" passhref="true" href="/search">Advanced Search</NavLink>
                    </Nav>

                    <Form className="d-flex" onSubmit={formsubmit}>
                        <input id="searchField" type="text" name="searchField" />
                        <input type="submit" value="Submit" variant="primary" />
                    </Form>
                </Container>
            </Navbar>
            <br />
            <br />    
        </>
    
        )
}