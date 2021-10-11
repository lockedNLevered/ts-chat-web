import styled from "styled-components";

interface Props {
	placeholder: string;
}

const InputField = styled.input`
	border-radius: 10px;
`;

export default function Input({ placeholder }: Props) {
	return <InputField placeholder={placeholder} />;
}
