import { Children } from "react";

export default function Show(props: any) {
	let when: any = null;
	let otherwise: any = null;

	Children.forEach(props.children, (children) => {
		if (!children.props.isTrue) {
			otherwise = children;
		} else if (!when && children.props.isTrue) {
			when = children;
		}
	});

	return when || otherwise;
}

Show.When = ({ isTrue, children }: any) => isTrue && children;
Show.Else = ({ render, children }: any) => render || children;
