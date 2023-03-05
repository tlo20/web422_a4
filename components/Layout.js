import Container from "../node_modules/react-bootstrap/esm/Container";
import MainNav from "./MainNav";

export default function Layout(props) {
	return (
		<>
			<MainNav />
			<br />
			<Container>
				{props.children}
			</Container>
			<br />

		</>
		)
}