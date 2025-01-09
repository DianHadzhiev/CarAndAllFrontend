import { ConfirmEmail } from "../components/ConfirmEmail";

export default async function ConfirmEmailPage({ searchParams }) {
  let {email} = await searchParams;
  email = decodeURIComponent(email);

  return <ConfirmEmail initialEmail={email}/>;
}
