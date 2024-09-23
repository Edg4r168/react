import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUsersActions } from "../hooks/useUsersActions";

export function CreateNewUser() {
	const { add } = useUsersActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setResult(null);

		const form = e.target as HTMLFormElement;
		const formData = new window.FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) return setResult("ko");

		add({ name, email, github });
		setResult("ok");

		form.reset();
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Crear un nuevo usuario</Title>

			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column", gap: "18px" }}
			>
				<TextInput name="name" placeholder="Nombre" />
				<TextInput name="email" placeholder="Email" />
				<TextInput name="github" placeholder="Usuario de github" />

				<div style={{ marginTop: "16px" }}>
					<Button type="submit">Crear usuario</Button>
					<span>
						{result === "ok" && (
							<Badge color="green">Guardado correctamente</Badge>
						)}
						{result === "ko" && <Badge color="red">Error con los campos</Badge>}
					</span>
				</div>
			</form>
		</Card>
	);
}
